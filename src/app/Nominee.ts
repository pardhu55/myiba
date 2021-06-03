import { IRelation } from "./Relation";

export interface INominee{

    nomineeId: number,
    name: string,
    govtId: string,
    phoneNo: string,
    relation: IRelation

}