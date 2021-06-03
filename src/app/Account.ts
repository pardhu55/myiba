import { ɵLocaleDataIndex } from "@angular/core";
import { IBeneficiary } from "./Beneficiary";
import { ICustomer } from "./Customer";
import { INominee } from "./Nominee";

export interface IAccount{

    accountId: number,
    interestRate: number,
    balance: number,
    dateOfOpening: ɵLocaleDataIndex,
    customer: ICustomer,
    nominees: INominee[],
    beneficiaries: IBeneficiary


    // private long accountId;
	// private double interestRate;
	// private double balance;
	// private LocalDate dateOfOpening;
	// @OneToOne
	// private Customer customer;
	// @OneToMany
	// private List<Nominee> nominees;
	// @OneToMany
	// private List<Beneficiary> beneficiaries;

}