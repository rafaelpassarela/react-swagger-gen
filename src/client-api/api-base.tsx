/********************************************************************
*            MrRafael.ca - Swagger Generator for React              *
* Sample Api by MrRafael.ca - v1                                    *
* This client Api was generated on 22/09/2019 22:24:04              *
*                                          Do not change this file! *
*                                                                   *
* Optimized for use as part of the project                          *
* https://github.com/rafaelpassarela/empty_project_mysql_migrations *
********************************************************************/

import { ApiConfig } from './api-config';
import { 
	ApiMode,
	ApiCache,
	ApiCredentials,
	ApiMethod,
	ApiRedirect,
	ApiDataCallback,
	ApiErrorCallback 
} from './api-types';

// More about the Fetch default API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
// https://www.robinwieruch.de/react-fetching-data/

class ApiBase { //implements IApi<Values>{

	desenvMode : number = -1;

	private translatePath(cmdName?: string, endPath?: string): string {
		return ApiConfig.URL + this.getPath()
			+ ((cmdName !== undefined) ? "/" + cmdName : "")
			+ ((endPath !== undefined) ? endPath : "");
	}

	protected isDesenvMode() : boolean {
		if (this.desenvMode === -1) {
			this.desenvMode = ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? 1 : 0);
		}

		return this.desenvMode == 1;
	}

	protected getPath(): string {
		throw new Error("getPath is not implemented!");
	}

	protected getMode(): ApiMode {
		return ApiMode.CORS;
	}

	protected getCache(): ApiCache {
		return ApiCache.NO_CACHE;
	}

	protected getCredentials(): ApiCredentials {
		return ApiCredentials.SAME_ORIGIN;
	}

	protected getRedirect(): ApiRedirect {
		return ApiRedirect.FOLLOW;
	}

	public get(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, endPath?: string) {
		this.doFetch(ApiMethod.GET, this.translatePath(cmdName, endPath), dataCallback, errorCallback);
	}

	public delete(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, endPath?: string) {
		this.doFetch(ApiMethod.DELETE, this.translatePath(cmdName, endPath), dataCallback, errorCallback);
	}

	public post(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, bodyData?: any) {
		this.doFetch(ApiMethod.POST, this.translatePath(cmdName, ''), dataCallback, errorCallback, bodyData);
	}

	public put(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, cmdName?: string, bodyData?: any) {
		this.doFetch(ApiMethod.PUT, this.translatePath(cmdName, ''), dataCallback, errorCallback, bodyData);
	}

	doFetch(
		requestMethod: ApiMethod, url: string,
		dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, bodyData?: any) {

		if (this.isDesenvMode()) {
			console.log(requestMethod + " -> " + url);
		}

		return fetch(url, {
			method: requestMethod,
			mode: this.getMode(),
			cache: this.getCache(),
			credentials: this.getCredentials(),
			headers: {
				Accept: "application/json",
				"Content-Type": 'application/json; charset=utf-8',
				"Access-Control-Allow-Origin": '*'
			},
			redirect: this.getRedirect(),
			body: ((bodyData != undefined) ? JSON.stringify(bodyData) : undefined)
		})
			.then(response => {
				if (response.ok) {
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") !== -1) {
						return response.json();
					} else {
						return response.text();
					}
				} else {
					throw new Error(response.status + " - " + response.statusText);
				}
			})
			.then(data => dataCallback(data))
			.catch(error => errorCallback(error));
	}

}

export default ApiBase;
