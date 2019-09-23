/********************************************************************
*            MrRafael.ca - Swagger Generator for React              *
* Sample Api by MrRafael.ca - v1                                    *
* This client Api was generated on 22/09/2019 22:24:04              *
*                                          Do not change this file! *
*                                                                   *
* Optimized for use as part of the project                          *
* https://github.com/rafaelpassarela/empty_project_mysql_migrations *
********************************************************************/

import ApiBase from './api-base';
import { ApiDataCallback, ApiErrorCallback } from './api-types';
import { 
	AddExternalLoginBindingModel,
	ChangePasswordBindingModel,
	RegisterBindingModel,
	RegisterExternalBindingModel,
	RemoveLoginBindingModel,
	SetPasswordBindingModel,
} from './api-models';

class ApiAccountProxy extends ApiBase {

	protected getPath(): string {
		return 'Account';
	}

	/**
	* Path Name: /api/Account/AddExternalLogin
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_AddExternalLogin(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, model: AddExternalLoginBindingModel) {
		this.post(dataCallback, errorCallback, 'AddExternalLogin', model);
	}

	/**
	* Path Name: /api/Account/ChangePassword
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_ChangePassword(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, model: ChangePasswordBindingModel) {
		this.post(dataCallback, errorCallback, 'ChangePassword', model);
	}

	/**
	* Path Name: /api/Account/ExternalLogin
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_ExternalLogin(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, provider: string, error: string) {
		this.get(dataCallback, errorCallback, 'ExternalLogin', '?provider=' + encodeURIComponent(provider)
			+ '&error=' + encodeURIComponent(error));
	}

	/**
	* Path Name: /api/Account/ExternalLogins
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_ExternalLogins(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, returnUrl: string, generateState: boolean) {
		this.get(dataCallback, errorCallback, 'ExternalLogins', '?returnUrl=' + encodeURIComponent(returnUrl)
			+ '&generateState=' + encodeURIComponent(generateState));
	}

	/**
	* Path Name: /api/Account/ManageInfo
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_ManageInfo(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, returnUrl: string, generateState: boolean) {
		this.get(dataCallback, errorCallback, 'ManageInfo', '?returnUrl=' + encodeURIComponent(returnUrl)
			+ '&generateState=' + encodeURIComponent(generateState));
	}

	/**
	* Path Name: /api/Account/UserInfo
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_UserInfo(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback) {
		this.get(dataCallback, errorCallback, 'UserInfo', undefined);
	}

	/**
	* Path Name: /api/Account/Logout
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_Logout(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback) {
		console.warn('No body param for method "Account_Logout"');
		this.post(dataCallback, errorCallback, 'Logout', undefined);
	}

	/**
	* Path Name: /api/Account/Register
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_Register(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, model: RegisterBindingModel) {
		this.post(dataCallback, errorCallback, 'Register', model);
	}

	/**
	* Path Name: /api/Account/RegisterExternal
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_RegisterExternal(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, model: RegisterExternalBindingModel) {
		this.post(dataCallback, errorCallback, 'RegisterExternal', model);
	}

	/**
	* Path Name: /api/Account/RemoveLogin
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_RemoveLogin(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, model: RemoveLoginBindingModel) {
		this.post(dataCallback, errorCallback, 'RemoveLogin', model);
	}

	/**
	* Path Name: /api/Account/SetPassword
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Account_SetPassword(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, model: SetPasswordBindingModel) {
		this.post(dataCallback, errorCallback, 'SetPassword', model);
	}

}

export default ApiAccountProxy;
