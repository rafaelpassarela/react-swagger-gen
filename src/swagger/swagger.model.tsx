export class FormItem {
	type: 'file' | 'text' | 'textarea';
	name : string;
	caption: string;
	required: boolean;
	placeholder: string;
	extra: string | number;
}

export class BaseSwaggerValues {
	devURL: string = '';
	prodURL: string = '';
	baseApi: string = '';	
}

export class SwaggerValues extends BaseSwaggerValues {
	data: string = '';
}

export class SwaggerFile {
	name: string;
	fileData: string;
}

export class SwaggerDefField {
	name: string;
	type: string;
	subType: string; // for array or object type
	required: boolean;

	public isIdField() : boolean {
		return this.name.toUpperCase() === 'ID' 
			&& this.type.toUpperCase() === 'INTEGER';
	}

	public getType() : string {
		switch (this.type.toLowerCase()) {
			case "integer":
				return "number";
			case "array":
				return "Array<" + this.subType + ">";
			default:
				return this.type;
		}
	}
}

export class SwaggerDefinition {
	name: string;
	fields: Array<SwaggerDefField> = new Array<SwaggerDefField>();
	extendsBase: boolean;
}

export class SwaggerPathActionParam {
	name: string;
	type: string;
	location: string;
	inOut: "IN" | "OUT";
	required: boolean;

	public getType() : string {
		switch (this.type.toLowerCase()) {
			case "integer":
				return "number";
			case "object":
				return "Object";
			default:
				return this.type;
		}
	}

	public isNatural() : boolean {
		return [
			'integer',
			'object',
			'boolean',
			'string'
		].indexOf(this.type) > -1;
	}	
}

export class SwaggerPathAction {
	type: string;
	actionName: string;
	fullName: string;
	cmdName: string;
	produces: string[];
	consumes: string[];
	params: Array<SwaggerPathActionParam> = new Array<SwaggerPathActionParam>();

	public getDeclarationName(pathName: string): string {
		if (this.cmdName !== undefined) {
			return pathName.concat('_', this.cmdName);
		}

		return pathName.concat('_', this.type.charAt(0).toUpperCase() + this.type.slice(1) );
	}
}

export class SwaggerPath {
	name: string;
	actions: Array<SwaggerPathAction> = new Array<SwaggerPathAction>();

	public getNameFormatted(mode: "UpperCase" | "LowerCase") : string {
		if (mode === "UpperCase")
			return this.name.charAt(0).toUpperCase() + this.name.slice(1);

		return this.name.charAt(0).toLowerCase() + this.name.slice(1);
	}

	public getProxyName() : string {
		return "Api" + this.getNameFormatted("UpperCase") + "Proxy";
	}

	public getProxyFileName(extension: boolean) : string {
		return 'api-'.concat(this.getNameFormatted("LowerCase"), '-proxy', ((extension) ? '.tsx' : ''));
	}
}

export class SwaggerPathList extends Array<SwaggerPath> {
}

export class SwaggerInfo {
	swagger: string;
	host: string;
	title: string;
	version: string;
	config: BaseSwaggerValues = new BaseSwaggerValues();
	definitions: Array<SwaggerDefinition> = new Array<SwaggerDefinition>();
	paths: SwaggerPathList = new SwaggerPathList();

	public resetLists() {
		this.definitions.splice(0, this.definitions.length);
		this.paths.splice(0, this.paths.length);
	}
}

export class SwaggerProxyFile {
	proxyFile: string;
	proxyClass: string;
	proxyVarName: string;
	proxyPathName: string;
}

// ---------- Origin Param Model
export class OrigParamItem {
	in: string;
	description: string;
	name: string;
	required: boolean;
	schema: any;
	type: string;
}