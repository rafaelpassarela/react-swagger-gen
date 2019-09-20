import { 
	SwaggerInfo,
	SwaggerFile,
	SwaggerPath
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
		date = date.concat(" ".repeat(67 - date.length), ' *\r\n');

		title = '* '.concat(title.concat(" ".repeat(66 - title.length), '*\r\n'));

		let header = '/********************************************************************\r\n'
					+ '*            MrRafael.ca - Swagger Generator for React              *\r\n'
					+ title + date  
					+ '*                                          Do not change this file! *\r\n'
					+ '*                                                                   *\r\n'
					+ '* Optimized for use as part of the project                          *\r\n'
					+ '* https://github.com/rafaelpassarela/empty_project_mysql_migrations *\r\n'
					+ '********************************************************************/\r\n'
					+ '\r\n';

		swaggerFileRepo.setFileHeader(header);
	}

	public generateFiles(data: SwaggerInfo) {
		// reset the file array
		this.files.splice(0, this.files.length);
		this.generateFileHeader(data.title.concat(" - ").concat(data.version));

		this.apiName = data.title;
		// generate the Api Files
		this.files.push( swaggerFileRepo.makeApiBaseFile() );
		this.files.push( swaggerFileRepo.makeTypesFile() );
		this.files.push( swaggerFileRepo.makeConfigFile(data.config) );
		this.files.push( swaggerFileRepo.makeModelsFile(data.definitions) );

		data.paths.map( (value: SwaggerPath) => {
			this.files.push( swaggerFileRepo.makePathFile(value) );
		});

		// generate the Zip file
		this.doMakeZip();
		//console.error('this.doMakeZip(); is commented on swagger.file.maker(60)');
	}

	public doMakeZip() {
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