import { IRelation } from "./Relation";

export interface INominee{

    nomineeId: number,
    name: string,
    govtId: string,
    govtIdType: string,
    phoneNo: string,
    relation: IRelation

}