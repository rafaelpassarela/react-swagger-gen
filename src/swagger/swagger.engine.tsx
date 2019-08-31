import { swaggerHelper } from './swagger.helper';
import { swaggerFileMaker } from './swagger.file.maker';
import { 
	SwaggerValues,
	SwaggerInfo,
	SwaggerDefField,
	SwaggerDefinition
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
		this.info.host = swaggerHelper.getValue(objData, 'host');
		this.info.swagger = swaggerHelper.getValue(objData, 'swagger');
		this.info.title = swaggerHelper.getValue(objData, ['info', 'title']);
		this.info.version = swaggerHelper.getValue(objData, ['info', 'version']);

		this.getDefinitionList(objData);
		// getPaths

		swaggerFileMaker.generateFiles(this.info);
	}

	private getDefinitionList(objData: Object) {
		let list = Object.getOwnPropertyNames(objData['definitions']);
		let tmpObject : Object;
		let propList: string[];
		let requireList: string[];

		// clear the definition list
		this.info.definitions.splice(0, this.info.definitions.length);

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