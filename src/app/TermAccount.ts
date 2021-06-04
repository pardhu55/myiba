import { IAccount } from "./Account";

export interface ITermAccount extends IAccount{

    amount: number,
    months: number,
    penaltyAmount: number
    
}