import { IAccount } from "./Account";

export interface ISavingsAccount extends IAccount{

    minBalance: number,
    fine: number
    
}