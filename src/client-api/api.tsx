/********************************************************************
*            MrRafael.ca - Swagger Generator for React              *
* Sample Api by MrRafael.ca - v1                                    *
* This client Api was generated on 27/09/2019 12:15:23              *
*                                          Do not change this file! *
*                                                                   *
* Optimized for use as part of the project                          *
* https://github.com/rafaelpassarela/empty_project_mysql_migrations *
********************************************************************/

import ApiAccountProxy from './api-account-proxy';
import ApiRolesProxy from './api-roles-proxy';
import ApiValuesProxy from './api-values-proxy';
import ApiTokenProxy from './api-token-proxy';

class ApiHelper {

	apiAccountProxy = new ApiAccountProxy();
	apiRolesProxy = new ApiRolesProxy();
	apiValuesProxy = new ApiValuesProxy();
	apiTokenProxy = new ApiTokenProxy();

	public Account() : ApiAccountProxy{
		return this.apiAccountProxy;
	}
	public Roles() : ApiRolesProxy{
		return this.apiRolesProxy;
	}
	public Values() : ApiValuesProxy{
		return this.apiValuesProxy;
	}
	public token() : ApiTokenProxy{
		return this.apiTokenProxy;
	}
}

const Api = new ApiHelper();

export default Api;
