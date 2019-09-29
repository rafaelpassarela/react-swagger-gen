import { 
	SwaggerFile, 
	BaseSwaggerValues,
	SwaggerDefinition,
	SwaggerDefField,
	SwaggerProxyFile,
	SwaggerPath,
	SwaggerPathAction,
	SwaggerPathActionParam
} from './swagger.model';

const newLine: string = '\r\n';

class SwaggerFileRepo {

	private fileHeader: string;

	private doMakeFile(name: string, data: string[]) : SwaggerFile  {
		let file = new SwaggerFile();
		file.name = name;
		file.fileData = this.fileHeader;

		data.map( (line: string) => { 
			file.fileData += line + newLine;
		});

		return file;
	}

	public setFileHeader(header: string) {
		this.fileHeader = header;
	}

	public makeTypesFile() : SwaggerFile {
		let file: string[] = [];

		file.push('export type ApiDataCallback = (data: any) => any;');
		file.push('export type ApiErrorCallback = (error: Error) => any;');
		file.push('');
		file.push('export enum ApiMethod {');
		file.push('	GET = "GET",');
		file.push('	POST = "POST",');
		file.push('	PUT = "PUT",');
		file.push('	DELETE = "DELETE",');
		file.push('	PATCH = "PATCH",');
		file.push('	HEAD = "HEAD",');
		file.push('	OPTIONS = "OPTIONS"');
		file.push('};');
		file.push('');
		file.push('export enum ApiMode {');
		file.push('	SAME_ORIGIN = "same-origin",');
		file.push('	NO_CORS = "no-cors",');
		file.push('	CORS = "cors",');
		file.push('	NAVIGATE = "navigate"');
		file.push('};');
		file.push('');
		file.push('export enum ApiCache {');
		file.push('	DEFAULT = "default",');
		file.push('	NO_CACHE = "no-cache",');
		file.push('	RELOAD = "reload",');
		file.push('	FORCE_CACHE = "force-cache",');
		file.push('	ONLY_IF_CACHED = "only-if-cached",');
		file.push('	NO_STORE = "no-store"');
		file.push('};');
		file.push('');
		file.push('export enum ApiCredentials {');
		file.push('	SAME_ORIGIN = "same-origin",');
		file.push('	INCLUDE = "include",');
		file.push('	OMIT = "omit"');
		file.push('};');
		file.push('');
		file.push('export enum ApiRedirect {');
		file.push('	FOLLOW = "follow",');
		file.push('	MANUAL = "manual",');
		file.push('	ERROR = "error"');
		file.push('};');

		return this.doMakeFile('api-types.tsx', file);
	}

	public makeApiBaseFile() : SwaggerFile {
		let file: string[] = [];

		file.push('import { ApiConfig } from \'./api-config\';');
		file.push('import { ');
		file.push('	ApiMode,');
		file.push('	ApiCache,');
		file.push('	ApiCredentials,');
		file.push('	ApiMethod,');
		file.push('	ApiRedirect,');
		file.push('	ApiDataCallback,');
		file.push('	ApiErrorCallback ');
		file.push('} from \'./api-types\';');
		file.push('');
		file.push('// More about the Fetch default API');
		file.push('// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch');
		file.push('// https://developer.mozilla.org/en-US/docs/Web/API/Request/mode');
		file.push('// https://www.robinwieruch.de/react-fetching-data/');
		file.push('');
		file.push('class ApiBase { //implements IApi<Values>{');
		file.push('');
		file.push('	private desenvMode : number = -1;');
		file.push('	private authToken: string;');
		file.push('');
		file.push('	private translatePath(cmdName?: string, endPath?: string): string {');
		file.push('		return ApiConfig.URL + this.getPath()');
		file.push('			+ ((cmdName !== undefined) ? "/" + cmdName : "")');
		file.push('			+ ((endPath !== undefined) ? endPath : "");');
		file.push('	}');
		file.push('');
		file.push('	protected isDesenvMode() : boolean {');
		file.push('		if (this.desenvMode === -1) {');
		file.push('			this.desenvMode = ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? 1 : 0);');
		file.push('		}');
		file.push('');
		file.push('		return this.desenvMode == 1;');
		file.push('	}');
		file.push('');
		file.push('	protected getPath(): string {');
		file.push('		throw new Error("getPath is not implemented!");');
		file.push('	}');
		file.push('');
		file.push('	protected getMode(): ApiMode {');
		file.push('		return ApiMode.CORS;');
		file.push('	}');
		file.push('');
		file.push('	protected getCache(): ApiCache {');
		file.push('		return ApiCache.NO_CACHE;');
		file.push('	}');
		file.push('');
		file.push('	protected getCredentials(): ApiCredentials {');
		file.push('		return ApiCredentials.SAME_ORIGIN;');
		file.push('	}');
		file.push('');
		file.push('	protected getRedirect(): ApiRedirect {');
		file.push('		return ApiRedirect.FOLLOW;');
		file.push('	}');
		file.push('');
		file.push('	protected encodeParams(value: string | number | boolean | object) : string {');
		file.push('		let strVal : string;');
		file.push('		switch (typeof value) {');
		file.push('			case "boolean":');
		file.push('				strVal = (value === true) ? "true" : "false";');
		file.push('				break;');
		file.push('			case "number":');
		file.push('				strVal = value.toString();');
		file.push('				break;');
		file.push('			case "object":');
		file.push('				strVal = JSON.stringify(value as Object);');
		file.push('			default:');
		file.push('				strVal = value as string;');
		file.push('				break;');
		file.push('		}');
		file.push('		return encodeURIComponent(strVal);');
		file.push('	}');
		file.push('');
		file.push('	public setToken(value: string) {');
		file.push('		this.authToken = value;');
		file.push('	}');
		file.push('');	
		file.push('	protected get(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, endPath?: string) {');
		file.push('		this.doFetch(ApiMethod.GET, this.translatePath(cmdName, endPath), dataCallback, errorCallback);');
		file.push('	}');
		file.push('');
		file.push('	protected delete(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, endPath?: string) {');
		file.push('		this.doFetch(ApiMethod.DELETE, this.translatePath(cmdName, endPath), dataCallback, errorCallback);');
		file.push('	}');
		file.push('');
		file.push('	protected post(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, bodyData?: any) {');
		file.push('		this.doFetch(ApiMethod.POST, this.translatePath(cmdName, \'\'), dataCallback, errorCallback, bodyData);');
		file.push('	}');
		file.push('');
		file.push('	protected put(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, bodyData?: any) {');
		file.push('		this.doFetch(ApiMethod.PUT, this.translatePath(cmdName, \'\'), dataCallback, errorCallback, bodyData);');
		file.push('	}');
		file.push('');
		file.push('	private doFetch(');
		file.push('		requestMethod: ApiMethod, url: string,');
		file.push('		dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, bodyData?: any) {');
		file.push('');
		file.push('		if (this.isDesenvMode()) {');
		file.push('			console.log(requestMethod + " -> " + url);');
		file.push('		}');
		file.push('');
		file.push('		let data: string | undefined = undefined;');
		file.push('		if (data !== undefined) {');
		file.push('			if ((typeof bodyData === "string" && bodyData.charAt(0) === "{")');
		file.push('			 || (typeof bodyData !== "string")) {');
		file.push('				data = JSON.stringify(bodyData);');
		file.push('			} else {');
		file.push('				data = bodyData;');
		file.push('			}');
		file.push('		}');
		file.push('');
		file.push('		return fetch(url, {');
		file.push('			method: requestMethod,');
		file.push('			mode: this.getMode(),');
		file.push('			cache: this.getCache(),');
		file.push('			credentials: this.getCredentials(),');
		file.push('			headers: {');
		file.push('				Accept: "application/json",');
		file.push('				"Content-Type": \'application/json; charset=utf-8\',');
		file.push('				"Access-Control-Allow-Origin": \'*\',');
		file.push('				"Authorization": "bearer " + (this.authToken || \'\')');
		file.push('			},');
		file.push('			redirect: this.getRedirect(),');
		file.push('			body: data');
		file.push('		})');
		file.push('			.then(response => {');
		file.push('				if (response.ok) {');
		file.push('					const contentType = response.headers.get("content-type");');
		file.push('					if (contentType && contentType.indexOf("application/json") !== -1) {');
		file.push('						return response.json();');
		file.push('					} else {');
		file.push('						return response.text();');
		file.push('					}');
		file.push('				} else {');
		file.push('					throw new Error(response.status + " - " + response.statusText);');
		file.push('				}');
		file.push('			})');
		file.push('			.then(data => dataCallback(data))');
		file.push('			.catch(error => errorCallback(error));');
		file.push('	}');
		file.push('');
		file.push('}');
		file.push('');
		file.push('export default ApiBase;');

		return this.doMakeFile('api-base.tsx', file);
	}

	public makeConfigFile(config: BaseSwaggerValues) : SwaggerFile {
		let file: string[] = [];

		file.push('const DEV_URL = "' + config.devURL + '"');
		file.push('const PROD_URL= "' + config.prodURL + '"');
		file.push('const BASE_API = "' + config.baseApi + '"');
		file.push('');
		file.push('export const ApiConfig = {');
		file.push('	BasePath: BASE_API,');
		file.push('	URL: ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL) + BASE_API');
		file.push('}');

		return this.doMakeFile('api-config.tsx', file);
	}

	public makeModelsFile(definitions: Array<SwaggerDefinition>) : SwaggerFile {
		let file: string[] = [];
		// check for the base model
		if (definitions.filter( (item: SwaggerDefinition) => {return item.extendsBase === true}).length > 0) {
			file.push('export class BaseModel {');
			file.push('	Id: number;');
			file.push('}');
			file.push('');
		}

		definitions.map( (item: SwaggerDefinition) => {
			if (item.extendsBase === true) {
				file.push('export class ' + item.name + ' extends BaseModel {');
			} else {
				file.push('export class ' + item.name + ' {');
			}

			let line: string;
			item.fields.map( (field: SwaggerDefField) => {
				if (item.extendsBase != true || (item.extendsBase === true && field.name.toUpperCase() !== 'ID')) {
					line = '	' + field.name + ': ' + field.getType() + ';';

					file.push(line);
				}
			});

			file.push('}');
			file.push('');
		});

		return this.doMakeFile('api-models.tsx', file);
	}

	public makePathFile(pathDefinition: SwaggerPath) : SwaggerFile {
		let file: string[] = [];
		let models: string[] = [];

		// generate the file header (import of classes)
		file.push("import ApiBase from './api-base';");
		file.push("import { ApiDataCallback, ApiErrorCallback } from './api-types';");
		// list of all models 
		pathDefinition.actions.map( (action: SwaggerPathAction) => {
			action.params.map( (param: SwaggerPathActionParam) => {
				if (!models.includes(param.type) && !param.isNatural() && param.inOut === "IN") {
					if (param.type.includes('Array<')) {
						models.push(param.type.substring('Array<'.length, param.type.indexOf('>')));
					} else {
						models.push(param.type);
					}
				}
			});
		});
		// sort the path models
		models.sort( (a: string, b: string): number => {
			return (a > b) ? 1 : ((b > a) ? -1 : 0);
		});
		// generate imports
		if (models.length === 1) {
			file.push("import { " + models[0] + " } from './api-models';");			
		} else if (models.length > 1) {
			file.push("import { ");
			models.map( (model: string) => {
				file.push("	".concat(model, ',') );
			});
			file.push("} from './api-models';");
		}
		file.push('');
		// class ApiValuesProxy extends ApiBase {
		let proxyName: string = pathDefinition.getProxyName();
		file.push("class " + proxyName + " extends ApiBase {")
		file.push('');
		// Override of getPath() function
		file.push('	protected getPath(): string {');
		file.push("		return '" + pathDefinition.name + "';");
		file.push('	}');
		file.push('');

		pathDefinition.actions.map( (action: SwaggerPathAction) => {
			file = file.concat(this.generateMethod(pathDefinition.getNameFormatted("UpperCase"), action));
		});

		// close class definition
		file.push('}');
		file.push('');
		file.push('export default ' + proxyName + ';');

		return this.doMakeFile(pathDefinition.getProxyFileName(true), file);
	}

	public makeApiFile(paths: Array<SwaggerPath>) : SwaggerFile {
		let file: string[] = [];
		let proxyList: SwaggerProxyFile[] = [];

		paths.map( (value: SwaggerPath) => {
			let item = {
				proxyFile: value.getProxyFileName(false),
				proxyClass: value.getProxyName(),
				proxyPathName: value.name,
				proxyVarName: '',
			} as SwaggerProxyFile;
			item.proxyVarName = item.proxyClass.substring(0, item.proxyClass.length - 'Proxy'.length);
			item.proxyVarName = item.proxyClass.charAt(0).toLowerCase() + item.proxyClass.slice(1);

			proxyList.push(item);
			file.push("import " + item.proxyClass + " from './" + item.proxyFile + "';");
		});
		file.push('');
		file.push('class ApiHelper {');
		file.push('');
		// apiValues = new ApiValuesProxy();
		proxyList.map( (value: SwaggerProxyFile) => {
			file.push("	private " + value.proxyVarName + " = new " + value.proxyClass + "();");
		});

		file.push('');

		proxyList.map( (value: SwaggerProxyFile) => {
			// public Values() : ApiValuesProxy{
			file.push("	public " + value.proxyPathName + "() : " + value.proxyClass + "{");
			file.push("		return this." + value.proxyVarName + ";");
			file.push("	}");
		});

		file.push('}');
		file.push('');
		file.push('const Api = new ApiHelper();');
		file.push('');
		file.push('export default Api;');

		return this.doMakeFile('api.tsx', file);
	}

	private generateMethod(pathName: string, action: SwaggerPathAction) : string[] {
		let proc: string[] = [];

		proc.push('	/**');
		// full path name
		proc.push('	* Path Name: ' + action.fullName);
		// Consumes
		if (action.consumes !== undefined) {
			proc.push('	* Consumes:');
			action.consumes.map((item: string) => {
				proc.push('	*	- ' + item);
			});
		}
		// produces
		if (action.produces !== undefined) {
			proc.push('	* Produces:');
			action.produces.map((item: string) => {
				proc.push('	*	- ' + item);
			});
		}
		// param list
		let paramList: string = 'dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback';
		if (action.params !== undefined) {
			action.params.map( (item: SwaggerPathActionParam) => {
				if (item.inOut === "IN") {
					paramList += ', '.concat(item.name, ': ', item.getType());
				}
			});
		}

		proc.push('	*/');
		proc.push('	public ' + action.getDeclarationName(pathName) + '(' + paramList + ') {');

		let cmd: string = '		this.' + action.type + '(dataCallback, errorCallback, ' 
			+ ((action.cmdName === undefined) ? 'undefined' : "'" + action.cmdName + "'") + ', '; // body(JSON Object) or endPath {1}
		// endPath, Values/4?name=Test
		if (action.type === 'get' || action.type === 'delete') {
			let urlParam: string = '';
			// 1) path
			let tmpParam = action.params.filter( (value: SwaggerPathActionParam) => {
				return (value.inOut == "IN" && value.location === "path");
			});
			tmpParam.map( (item: SwaggerPathActionParam, idx: number) => {
				urlParam += ((idx > 0) ? ' + ' : '') + "'/' + " + item.name;
			});

			// 2) query
			tmpParam = action.params.filter( (value: SwaggerPathActionParam) => {
				return (value.inOut == "IN" && value.location === "query");
			});
			tmpParam.map( (item: SwaggerPathActionParam, idx: number) => {
				// '?provider=' + encodeURIComponent(provider) + '&error=' + encodeURIComponent(error)
				urlParam += ((idx === 0) ? "'?" : "\n\t\t\t+ '&" ) 
					+ item.name.concat('=', "'")
					+ " + this.encodeParams(" + item.name + ")";
			});

			if (urlParam !== '') {
				cmd += urlParam;
			} else {
				cmd += 'undefined';
			}
			cmd += ');';

		} else {
		// body, find a body param
			let bodyParam = action.params.filter( (value: SwaggerPathActionParam) => {
				return (value.inOut === "IN") && (value.location === "body");
			});
			if (bodyParam.length > 0) {
				cmd += bodyParam[0].name.concat(');');
			} else {
				let formData = this.formDataObjectAsString(action.params);
				if (formData === undefined || formData.trim() === '') {
					cmd += 'undefined);';
					proc.push('		console.warn(\'No body param for method "' + action.getDeclarationName(pathName) + '"\');');
				} else {
					cmd += formData.concat(');');
				}
			}
		}
		proc.push(cmd);
		proc.push('	}');
		proc.push('');
		return proc;
	}

	private formDataObjectAsString(actionParams: Array<SwaggerPathActionParam>) : string {
		let dataObject: string = '';
		// {"Foo":"Value 1","Bar":"Value 2"} => {"Foo": Foo,"Bar": Bar} ==> ERROR
		// actionParams.map( (value: SwaggerPathActionParam) => {
		// 	if (value.inOut === "IN" && value.location === "formData") {
		// 		dataObject += '"' + value.name + '":' + value.name + ',';
		// 	}
		// });
		// if (dataObject.trim() !== '') {
		// 	dataObject = '{' + dataObject.substring(0, dataObject.length - 1) + '}';
		// }

		// 'Foo=Value%201&Bar=Value%202"' => Ok
		actionParams.map( (value: SwaggerPathActionParam) => {
			if (value.inOut === "IN" && value.location === "formData") {
				dataObject += ((dataObject === '') ? '"' : '\n\t\t\t+ "&') + value.name + '=" + this.encodeParams(' + value.name + ')';
			}
		});

		return dataObject;
	}

}

export const swaggerFileRepo = new SwaggerFileRepo();