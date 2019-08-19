import * as React from 'react';
import BaseViewComponent, { IBaseViewProps, IBaseViewState } from '../components/base.view.component';
import { fileUtils, IFileModel } from '../helpers/file.utils.helper';
import { FormItem, SwaggerValues } from '../swagger/swagger.model';
import { formItemList } from '../swagger/swagger.form.config';
import Loading from '../components/loading.component';
import LoadingSmall from '../components/loading.small.component';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { cookieStorage } from '../helpers/cookie.helper';
import '../inc/pageframe.css';

interface IHomeState extends IBaseViewState {
	disabled: boolean;
	loadMessage: string,
	swagger: SwaggerValues;
}

class HomePage extends BaseViewComponent<IBaseViewProps, IHomeState> {

	constructor(props: any) {
		super(props);

		this.state = {
			disabled: false,
			loadMessage: 'Getting values...',
			swagger: {
				data: '',
				devURL: cookieStorage.getValue('devURL', ''),
				prodURL: cookieStorage.getValue('prodURL', ''),
				baseApi: cookieStorage.getValue('baseApi', ''),
			} as SwaggerValues
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getForm = this.getForm.bind(this);
	}

	private imgSwagger : string = require('../img/swagger-logo.png');
	private canChangeObjectValues : boolean = true;

	protected getPageTitle(): string {
		return 'React for Swagger';
	}

	componentDidMount() {
		this.setState({
			loadMessage: ''
		});
	}

	handleClick = () => {
		this.setState({
			disabled: true
		})
	}

	handleSubmit(event: any) {
		const canSubmit = false;

		if (!canSubmit || event.currentTarget.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	handleChange(event: any) {
		if (this.canChangeObjectValues === true) {
			const prop = event.target.name;
			let updateObj = true;
			let value = undefined;
			let obj = null;

			switch (event.target.type) {
				case "file":
					updateObj = false;
					if (event.target.files.length > 0) {
						obj = this.state.swagger;
						obj['data'] = '';					
						this.setState({
							loadMessage: 'Please wait...',
							swagger: obj
						});
						fileUtils.asString(event.target.files[0], (val: IFileModel) => {
							obj = this.state.swagger;
							obj['data'] = val.data as string
							this.setState({
								swagger: obj,
								loadMessage: ''
							});
						});
					}
					break;

				default:
					value = event.target.value;
					break;
			}

			if (updateObj) {
				if (event.target.type !== "textarea") {
					cookieStorage.setValue(prop, value);
				}				
				obj = this.state.swagger;
				obj[prop] = value;
				this.setState({
					swagger: obj
				} as IHomeState);
			}
		} else {
			this.canChangeObjectValues = true;
		}
	}

	getItem = (item: FormItem, idx: number): any => {
		
		switch (item.type) {
			case 'file':
				return (
					<Form.Group key={idx} as={Row} controlId={"form_" + item.name}>
				        <Form.Label column>{item.caption}</Form.Label>
						<Col sm={10}>
							<Form.Control 
								name={item.name}
								type={item.type}
								disabled={this.state.disabled}
								onChange={this.handleChange}
								accept={item.extra as string}
							/>
						</Col>
					</Form.Group>);
				break;
			case 'textarea':
				return (
					<Form.Group key={idx} as={Row} controlId={"form_" + item.name}>
						<Form.Label column>{item.caption}</Form.Label>
						<Col sm={10}>
							<Form.Control
								name={item.name}
								as="textarea"
								disabled={this.state.disabled}
								required={item.required}
								placeholder={item.placeholder}
								value={this.state.swagger[item.name]}
								onChange={this.handleChange}
								rows={item.extra}
								style={{fontFamily: 'monospace'}}
							/>
						</Col>
					</Form.Group>);
				break;
			default:
				return (
					<Form.Group key={idx} as={Row} controlId={"form_" + item.name}>
						<Form.Label column>{item.caption}</Form.Label>
						<Col sm={10}>
							<Form.Control
								name={item.name}
								type={item.type}
								disabled={this.state.disabled}
								required={item.required}
								placeholder={item.placeholder}
								value={this.state.swagger[item.name]}
								onChange={this.handleChange}
							/>
						</Col>
					</Form.Group>);
				break;
		}
	}

	getForm = (): any => {
		return (
			<Form noValidate validated={true} onSubmit={this.handleSubmit}>
				{
					formItemList.map( (item: FormItem, idx: number) => {
						return this.getItem(item, idx);
					})
				}
				<div className="modal-footer" style={{padding: 0, paddingTop: 10}}>
					<Button variant="success" style={{backgroundColor: '#87BE3F'}} onClick={this.handleClick} disabled={this.state.disabled}>
						<LoadingSmall active={this.state.disabled} />
						{(this.state.disabled) ? "Generating..." : "Generate" }
					</Button>
				</div>
			</Form>
		);
	}

	protected doRender() : any {
		const loading = (this.state.loadMessage == "") ? null : 
			<Loading active={true} message={this.state.loadMessage} caption={"Loading..."}/>;

		return (
			<div>
				{loading}
				<div className="pf-center" style={{marginBottom: 10}} >
					<Image src={this.imgSwagger} style={{borderRadius: 10}} fluid />
				</div>

				{this.getForm()} 				
			</div>
		);
	}
}

export default HomePage;