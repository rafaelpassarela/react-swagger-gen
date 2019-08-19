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
