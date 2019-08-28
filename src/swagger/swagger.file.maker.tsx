// import * as React from 'react';

import { 
	SwaggerInfo,
	SwaggerFile
} from './swagger.model';
import { swaggerHelper } from './swagger.helper';
import { swaggerFileRepo } from './swagger.file.repository';
import * as ReactZip from 'jszip';

const apiDir: string = 'client-api/';
const zipComment: string = 'Generated With MrRafael.ca - Swagger Generator for React';

class SwaggerFileMaker {

	constructor() {
		this.files = new Array<SwaggerFile>();
	}

	private files: Array<SwaggerFile>;
	private apiName: string;

	private generateFileHeader(title: string) {
		let date = new Date().toLocaleString();
		date = '* This client Api was generated on '.concat(date);
		date = date.concat(" ".repeat(67 - date.length), ' *\n');

		title = '* '.concat(title.concat(" ".repeat(66 - title.length), '*\n'));

		let header = '/********************************************************************\n'
					+ '*            MrRafael.ca - Swagger Generator for React              *\n'
					+ title + date  
					+ '*                                          Do not change this file! *\n'
					+ '*                                                                   *\n'
					+ '* Optimized for use as part of the project                          *\n'
					+ '* https://github.com/rafaelpassarela/empty_project_mysql_migrations *\n'
					+ '********************************************************************/\n'
					+ ' \n';

		swaggerFileRepo.setFileHeader(header);
	}

	public generateFiles(data: SwaggerInfo) {
		// reset the file array
		this.files.splice(0, this.files.length);
		this.generateFileHeader(data.title.concat(" - ").concat(data.version));

		this.apiName = data.title;
		// generate the Api Files
		this.files.push( swaggerFileRepo.makeApiBase() );
		this.files.push( swaggerFileRepo.makeTypes() );

		// generate the Zip file
		this.doMakeZip();
	}

	private doMakeZip() {
		let zip = new ReactZip();

		this.files.map( (file: SwaggerFile) => {
			zip.file(apiDir + file.name, file.fileData);
		});

		var promise = null;
		promise = zip.generateAsync({
			type: "blob",
			comment: zipComment,
			compression: "DEFLATE",
			compressionOptions: {
				level: 5
			}
		});
		promise.then( (value: Blob) => {			
			var zipFileName: string = 'client-api_' + this.apiName + '.zip';
			zipFileName = swaggerHelper.strReplaceAll(zipFileName, ' ', '_');
			zipFileName = swaggerHelper.strRemoveAll(zipFileName, "\"#@,;:<>*^|?\\/");

			var fileDownload = require('js-file-download');
			fileDownload(value, zipFileName);

		}).catch( (error: any) => {
			console.error(error);
		});
	}

}

export const swaggerFileMaker = new SwaggerFileMaker();