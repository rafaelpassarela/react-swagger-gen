import { swaggerHelper } from './swagger.helper';
import { swaggerFileMaker } from './swagger.file.maker';
import { 
	SwaggerValues,
	SwaggerInfo,
	SwaggerDefField,
	SwaggerDefinition,
	SwaggerPath,
	SwaggerPathAction,
	SwaggerPathActionParam,
	OrigParamItem
} from './swagger.model';

class SwaggerEngine {

	private info : SwaggerInfo = new SwaggerInfo();

	public generateObjects(data: SwaggerValues) : Promise<string> {
		return new Promise((resolve, reject) => {

			this.info.config.baseApi = data.baseApi;
			this.info.config.devURL = data.devURL;
			this.info.config.prodURL = data.prodURL;

			try {
				let objData = JSON.parse(data.data);
				this.parseSwaggerObject(objData);

				console.log(this.info);

				return resolve('The files were successfully generated. Download should start soon.');
			} catch(e) {
				return reject(e.message);
			}

		});
	}

	private parseSwaggerObject(objData: Object) {

		this.info.resetLists();

		this.info.host = swaggerHelper.getValue(objData, 'host');
		this.info.swagger = swaggerHelper.getValue(objData, 'swagger');
		this.info.title = swaggerHelper.getValue(objData, ['info', 'title']);
		this.info.version = swaggerHelper.getValue(objData, ['info', 'version']);

		this.getDefinitionList(objData);
		this.getPathList(objData);

		swaggerFileMaker.generateFiles(this.info);
	}

	private getPathIndexByName(name: string) {
		for (var i = 0; i < this.info.paths.length; i++) {
			if (this.info.paths[i].name == name) {
				return i;
			}
		}
		return -1;
	}

	private getPathList(objData: Object) {
		let list = Object.getOwnPropertyNames(objData['paths']);
		let tmpObject : Object;
		let endPoints: string[];
		let pathIdx: number;
		let pathObj: SwaggerPath;
		let fullName: string;

		list.map( (item: string) => {
			
			tmpObject = swaggerHelper.getValue(objData, ['paths', item]);

			// /api/Values/{id} -> Values
			fullName = item;
			console.log("Full Name: " + fullName);

			item = item.replace(this.info.config.baseApi, '');
			if (item.indexOf('/') >= 0) {
				item = item.substring(0, item.indexOf('/'));
			}

			// locate or create a new path
			pathIdx = this.getPathIndexByName(item);
			if (pathIdx == -1) {
				pathObj = new SwaggerPath();
				pathObj.name = item;
			} else {
				pathObj = this.info.paths[pathIdx];
			}

			/* to do: each action have a list of endpoints:
				Values
					Values/
						get
						post
						put
					Values/{id}
						get(id)
						delete(id)
			*/

			// for each path, try to find all the relative endpoints actions
			endPoints = Object.getOwnPropertyNames(tmpObject); // "/api/Values/{id}"
			console.log(endPoints);

			endPoints.map( (epName: string) => {
				console.log("EP Name: " + epName);
				pathObj.actions.push(
					this.generateEndPoint(swaggerHelper.getValue(tmpObject, [epName]), fullName, epName)
				);
				
			});

			// update or add a new path
			if (pathIdx == -1) {
				this.info.paths.push(pathObj);
			} else {
				this.info.paths[pathIdx] = pathObj;
			}
		});
	}

	private generateEndPoint(data: Object, fullName: string, endPointName: string) : SwaggerPathAction {
		let pathAction = new SwaggerPathAction();
		pathAction.fullName = fullName;
		pathAction.type = endPointName;
		pathAction.actionName = swaggerHelper.getValue(data, ['operationId']);
		pathAction.produces = swaggerHelper.getValue(data, ['produces']);
		pathAction.consumes = swaggerHelper.getValue(data, ['consumes']);

		let params = swaggerHelper.getValue(data, ['parameters']) as Array<OrigParamItem>;
		params.map( (paramData: OrigParamItem) => {
			// the header always have the auth. param
			if (paramData.name != 'Authorization' && paramData.in != 'header') {
				let param = new SwaggerPathActionParam();
				param.inOut = "IN";
				param.name = paramData.name;
				param.location = paramData.in;

				pathAction.params.push(param);
			}
		});

		return pathAction;
	}

	private getDefinitionList(objData: Object) {
		let list = Object.getOwnPropertyNames(objData['definitions']);
		let tmpObject : Object;
		let propList: string[];
		let requireList: string[];

		list.map( (item: string) => {
			let fieldDefs = new Array<SwaggerDefField>();
			let extendBase: boolean = false;
			let subItem: Object;

			tmpObject = swaggerHelper.getValue(objData, ['definitions', item]);
			requireList = swaggerHelper.getValue(tmpObject, 'required');
			propList = Object.getOwnPropertyNames(tmpObject['properties']);

			propList.map( (propName: string) => {
				let field = new SwaggerDefField();
				field.name = propName;
				field.type = swaggerHelper.getValue(tmpObject, ['properties', propName, 'type']);
				field.required = (requireList == undefined) ? false : requireList.indexOf(propName) > -1;

				subItem = swaggerHelper.getValue(tmpObject, ['properties', propName, 'items']);
				if (subItem != undefined) {
					field.subType = swaggerHelper.getValue(subItem, ['type']);
					// if no subType was found, search for class reference
					if (field.subType === undefined) {
						field.subType = swaggerHelper.getValue(subItem, ['$ref']);
						if (field.subType.indexOf("#/definitions/") >= 0) {
							field.subType = field.subType.substr(field.subType.lastIndexOf('/') + 1);
						}
					}
				}

				fieldDefs.push(field);
				extendBase = (extendBase || field.isIdField())
			});

			this.info.definitions.push({
					name: item,
					fields: fieldDefs,
					extendsBase: extendBase
				} as SwaggerDefinition);
		});
		// order the definitions list
		this.info.definitions.sort( (a: SwaggerDefinition, b: SwaggerDefinition): number => {
			return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
		});
	}
}

export default SwaggerEngine;