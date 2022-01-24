
import { IInputs, IOutputs } from "../generated/ManifestTypes";
import { PrimaryEntity } from "./EntityHelper";


export class WebApiHelper {

    private context: ComponentFramework.Context<IInputs>;
    constructor(context: ComponentFramework.Context<IInputs>) {
        this.context = context;
    }

    GetRecordByIdEntityAndSelectFields(guid: string, entityType: string,
        successCallback: (result: any) => any,
        errorCallBack: (result: string) => any,
        ...selectFields: string[]): ComponentFramework.WebApi.Entity {

        console.log("GetRecordByIdEntityAndSelectFields");
        let stringSelect = "";
        if (selectFields.length > 0) {
            stringSelect = "?$select=" + selectFields.join(",");
        }
        const record = this.context.webAPI.retrieveRecord(entityType, guid, stringSelect).then(successCallback, errorCallBack);

        return record;
    }


    GetRecordByPrimaryEntityAndSelectFields(entity: PrimaryEntity, successCallback: (result: any) => any, errorCallBack: (result: string) => any, ...selectFields: string[]): ComponentFramework.WebApi.Entity {
        console.log("GetRecordByPrimaryEntityAndSelectFields");
        return this.GetRecordByIdEntityAndSelectFields(entity.Entity.id, entity.Entity.typeName, successCallback, errorCallBack, ...selectFields);
    }




}