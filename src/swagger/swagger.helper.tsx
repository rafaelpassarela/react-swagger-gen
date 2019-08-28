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

	public strReplaceAll(value: string, search: string, replacement: string) : string {
    	// var newVal = value.replace(new RegExp(search, 'g'), replacement);
    	var newVal = value.split(search).join(replacement);
    	return newVal;
	};

	public strRemoveAll(value: string, delValues: string) : string {
		var newValue = value;
		for (var i = 0; i < delValues.length; i++) {
			newValue = this.strReplaceAll(newValue, delValues[i], '');
		}

		return newValue;
	}

}

export const swaggerHelper = new SwaggerHelper();