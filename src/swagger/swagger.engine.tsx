import { SwaggerValues } from '../swagger/swagger.model';

class SwaggerEngine {

	public generateObjects(data: SwaggerValues) : Promise<string> {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < 10; ++i) {
				console.log(i);
			}
			try {
				let objData = JSON.parse(data.data);
				return resolve(objData['swagger']);
			} catch {
				return reject("Error convertiong JSON data");
			}
		});
	}
}

export default SwaggerEngine;