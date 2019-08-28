export class FormItem {
	type: 'file' | 'text' | 'textarea';
	name : string;
	caption: string;
	required: boolean;
	placeholder: string;
	extra: string | number;
}

export class SwaggerValues {
	data: string = '';
	devURL: string = '';
	prodURL: string = '';
	baseApi: string = '';
}

export class SwaggerFile {
	name: string;
	fileData: string;
}

export class SwaggerDefField {
	name: string;
	type: string;
	required: boolean;
}

export class SwaggerDefinition {
	name: string;
	fields: Array<SwaggerDefField> = new Array<SwaggerDefField>();
}

export class SwaggerInfo {
	swagger: string;
	host: string;
	title: string;
	version: string;
	definitions: Array<SwaggerDefinition> = new Array<SwaggerDefinition>();
}