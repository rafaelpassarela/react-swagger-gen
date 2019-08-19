import { FormItem } from './swagger.model';

export const formItemList: Array<FormItem> = [
	{
		name: "jsonFile",
		caption: "Load the Swagger.json",
		type: "file",
		extra: ".json,.txt",
		required: false,
		placeholder: ""
	}, {
		name: "data",
		caption: "Or paste the content here",
		type: "textarea",
		required: true,
		placeholder: "Swagger File Content Here",
		extra: 10
	}, {
		name: "devURL",
		type: "text",
		caption: "Dev. URL",
		required: true,
		placeholder: "http://localhost:57431",
		extra: ""
	}, {
		name: "prodURL",
		type: "text",
		caption: "Prod. URL",
		required: true,
		placeholder: "http://myrealsite.com:1234",
		extra: ""
	}, {
		name: "baseApi",
		type: "text",
		caption: "Base Api",
		required: true,
		placeholder: "/api/",
		extra: ""
	}

];