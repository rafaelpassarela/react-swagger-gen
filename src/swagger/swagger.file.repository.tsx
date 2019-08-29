import { 
	SwaggerFile, 
	BaseSwaggerValues 
} from './swagger.model';

const newLine: string = '\n';

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
		let file = new Array<string>();

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
		let file = new Array<string>();

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
		file.push('class ApiBase<T> { //implements IApi<Values>{');
		file.push('');
		file.push('	desenvMode : number = -1;');
		file.push('');
		file.push('	private translatePath(endPath?: string): string {');
		file.push('		return ApiConfig.URL + this.getPath() + ((endPath != undefined) ? endPath : "");');
		file.push('	}');
		file.push('');
		file.push('	protected isDesenvMode() : boolean {');
		file.push('		if (this.desenvMode == -1) {');
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
		file.push('	public get(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, endPath?: string) {');
		file.push('		this.doFetch(ApiMethod.GET, this.translatePath(endPath), dataCallback, errorCallback);');
		file.push('	}');
		file.push('');
		file.push('	public delete(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, endPath?: string) {');
		file.push('		this.doFetch(ApiMethod.DELETE, this.translatePath(endPath), dataCallback, errorCallback);');
		file.push('	}');
		file.push('');
		file.push('	public post(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, bodyData?: T) {');
		file.push('		this.doFetch(ApiMethod.POST, this.translatePath(\'\'), dataCallback, errorCallback, bodyData);');
		file.push('	}');
		file.push('');
		file.push('	doFetch(');
		file.push('		requestMethod: ApiMethod, url: string,');
		file.push('		dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, bodyData?: T) {');
		file.push('');
		file.push('		if (this.isDesenvMode()) {');
		file.push('			console.log(requestMethod + " -> " + url);');
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
		file.push('				"Access-Control-Allow-Origin": \'*\'');
		file.push('			},');
		file.push('			redirect: this.getRedirect(),');
		file.push('			body: ((bodyData != undefined) ? JSON.stringify(bodyData) : undefined)');
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
		let file = new Array<string>();

		file.push('const DEV_URL = "http://localhost:57431"');
		file.push('const PROD_URL= "http://mrrafael.ca:1234"');
		file.push('const BASE_API = "/api/"');
		file.push('');
		file.push('export const ApiConfig = {');
		file.push('	BasePath: BASE_API,');
		file.push('	URL: ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL) + BASE_API');
		file.push('}');

		return this.doMakeFile('api-config.tsx', file);
	}

}

export const swaggerFileRepo = new SwaggerFileRepo();