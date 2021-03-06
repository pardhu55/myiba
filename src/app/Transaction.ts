import { ╔ÁLocaleDataIndex } from "@angular/core";
import { IAccount } from "./Account";
import { ITransactionStatus } from "./TransactionStatus";
import { ITransactionType } from "./TransactionType";

export interface ITransaction{

    transactionId: number,
    amount: number,
    transactionType:ITransactionType,
    dateTime: ╔ÁLocaleDataIndex,
    bankAccount: IAccount,
    transactionStatus: ITransactionStatus,
    transactionRemarks: string

}