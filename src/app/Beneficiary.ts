import { IAccountType } from "./AccountType";

export interface IBeneficiary{

    beneficiaryId: number,
    beneficiaryName: string,
    beneficiaryAccNo: number,
    IFSC: string,
    accountType:IAccountType
}