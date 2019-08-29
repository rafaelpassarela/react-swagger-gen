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
	required: boolean;

	public isIdField() : boolean {
		return this.name.toUpperCase() === 'ID' 
			&& this.type.toUpperCase() === 'INTEGER';
	}
}

export class SwaggerDefinition {
	name: string;
	fields: Array<SwaggerDefField> = new Array<SwaggerDefField>();
	extendsBase: boolean;
}

export class SwaggerInfo {
	swagger: string;
	host: string;
	title: string;
	version: string;
	config: BaseSwaggerValues = new BaseSwaggerValues();
	definitions: Array<SwaggerDefinition> = new Array<SwaggerDefinition>();
}