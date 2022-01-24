import { IInputs, IOutputs } from "./generated/ManifestTypes";

import ViewFormTableViewer from "./Controls/ViewFormTableViewer";
import { IViewsFormsItem, IiewsFormsProperties } from "./Controls/ViewFormTableViewer";


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";
import { stringify } from "querystring";
import { AppInsightHelper } from './Helpers/ApplicationInsight'






export class PortalFormViewShortcut implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _entityId: any;
	private _entityTypeName: string;



	//Parameters
	private _EntityName: string;
	private _SystemFormName: string;
	private _EnumValueEntityForm: number = 0;
	private _EnumValueEntityList: number = 1;
	private _powerAppsEnvironmentId: string | null;


	private container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;

	private _clientUrl: string | null;


	private isEntityForm: boolean;
	private isEntityList: boolean;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {


		this.container = container;
		this._context = context;

		//Setting values from Context
		this._entityId = (context.mode as any).contextInfo.entityId;
		this._entityTypeName = (context.mode as any).contextInfo.entityTypeName;
		this._clientUrl = (context as any).page.getClientUrl();

		//Set up Entity ID and Entity Name
		this._powerAppsEnvironmentId = context.parameters.powerAppsEnvironmentId.raw;
		this.isEntityForm = (Number(context.parameters.controlType.raw) === this._EnumValueEntityForm);
		this.isEntityList = (Number(context.parameters.controlType.raw) === this._EnumValueEntityList);

		const mode = this.isEntityForm ? "Form" : "View";

		AppInsightHelper.getAppInsightHelper().trackEvent({ name: "Component initialized", properties: { mode: mode } });


	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {

		if (!!this._powerAppsEnvironmentId) {
			this._SystemFormName = String(this._context.parameters.entityFormViewField.raw);
			this._EntityName = String(context.parameters.entityName.raw);

			if (this.isEntityForm) {
				this.getInfoEntityForm();
			}

			if (this.isEntityList) {
				this.getInfoEntityList();
			}
		} else {
			this.showErrorMessage("Please insert a valid PowerApps Environment id");
		}
	}

	private getInfoEntityList() {
		const isEntitySelected = this._EntityName && this._EntityName.trim() && this._EntityName != "null";
		
		if (isEntitySelected) {

			const filter = `?$select=name,querytype,savedqueryid,returnedtypecode,solutionid&$filter=returnedtypecode eq '${this._EntityName}' and (querytype eq 0 or querytype eq 2 or querytype eq 2048)`;

			const successCallback = (results: any) => {
				const views: string[] = this._SystemFormName.split(",");

				AppInsightHelper.getAppInsightHelper().trackEvent({ name: "Views Retrieved", properties: { count: results.entities.length } });

				let items = results.entities.map((x: { savedqueryid: any; name: string; solutionid: any, querytype: any }) => {
					let eObj: IViewsFormsItem = {
						id: x.savedqueryid,
						name: x.name,
						isUsed: views.find(function find(elem: string) { return elem == x.savedqueryid; }) !== undefined, //  (x.name === this._SystemFormName),
						linkPowerApps: `https://make.powerapps.com/e/${this._powerAppsEnvironmentId}/s/${x.solutionid}/view/${x.savedqueryid}`,
						linkClassic: `${this._clientUrl}/tools/vieweditor/viewManager.aspx?appSolutionId=%7B${x.solutionid}%7D&id=%7B${x.savedqueryid}%7D`,
						usedFormViews: undefined
					};
					return eObj;
				});

				this.renderControl(this._context, items);
			}

			const errorCallBack = (result: any) => {
				AppInsightHelper.getAppInsightHelper().trackEvent({ name: "Failure retrieve views", properties: { error: result } });
			}

			this._context.webAPI.retrieveMultipleRecords("savedquery", filter, 5000).then(successCallback, errorCallBack);

		} else {
			this.showErrorMessage("Please select the Table name");
		}

	}



	private getInfoEntityForm() {

		const isEntitySelected = this._EntityName && this._EntityName.trim() && this._EntityName != "null";
		console.log("Is Entity Selected ?", isEntitySelected);
		if (isEntitySelected) {

			const filter = `?$select=formid,type,name,solutionid,objecttypecode&$filter=objecttypecode eq '${this._EntityName}' and type eq 2`;
			let _items: IViewsFormsItem[];

			let successCallback = (results: any) => {

				AppInsightHelper.getAppInsightHelper().trackEvent({ name: "Forms Retrieved", properties: { count: results.entities.length } });

				let usedFormViews: string[] = [this._SystemFormName]

				let items = results.entities.map((x: { formid: any; name: any; solutionid: any, type: any }) => {
					let eObj: IViewsFormsItem = {
						id: x.formid,
						name: x.name,
						isUsed: (x.name === this._SystemFormName),
						linkPowerApps: `https://make.powerapps.com/e/${this._powerAppsEnvironmentId}/s/${x.solutionid}/entity/${this._EntityName}/form/edit/${x.formid}`,
						linkClassic: `${this._clientUrl}/main.aspx?appSolutionId=%7B${x.solutionid}%7D&etc=${x.type}&extraqs=formtype%3dmain%26formId=${x.formid}&pagetype=formeditor`,
						usedFormViews: usedFormViews
					};
					return eObj;
				});

				this.renderControl(this._context, items);
			}

			let errorCallBack = (result: any) => {
				AppInsightHelper.getAppInsightHelper().trackEvent({ name: "Failure retrieve Forms", properties: { error: result } });
			}

			this._context.webAPI.retrieveMultipleRecords("systemform", filter, 5000).then(successCallback, errorCallBack);

		} else {
			this.showErrorMessage("Please select the Table name");
		}
	}

	showErrorMessage(errorMessage: string) {
		ReactDOM.render(React.createElement("div", null, errorMessage), this.container);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}


	public renderControl(context: ComponentFramework.Context<IInputs>, _items: IViewsFormsItem[]) {
		const listProperties: IiewsFormsProperties = {
			items: _items
		};
		ReactDOM.render(React.createElement(ViewFormTableViewer, listProperties), this.container);
	}
}