class SwaggerHelper {

	public getValue(object: Object, name: string | string[]) : any {
		
		if (typeof name === 'string') {
			return object[name]
		}

		let idx: string;
		let newObj: Object = object;
		for (let i = 0; i < name.length; i++) {

			idx = name[i];			
			if (i + 1 == name.length) {
				return newObj[idx];
			} else {
				newObj = newObj[idx];
			}

		}		
	}

}

export const swaggerHelper = new SwaggerHelper();