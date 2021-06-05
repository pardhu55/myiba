import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from '../Account';
import { AccountService } from '../account.service';
import { IBeneficiary } from '../Beneficiary';
import { CustomerService } from '../customer.service';
import { INominee } from '../Nominee';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account!: IAccount;
  beneficiaryForm: any;
  nomineeForm: any;

  constructor(private route: ActivatedRoute, private _customerService: CustomerService, private _accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {

    const accId = Number(this.route.snapshot.paramMap.get('id'));

    this._accountService.getAccountByAccountId(accId).subscribe({
      next: data => this.account = data,
      error: err => console.log('error', err)
    });


    // console.log(this.account.beneficiaries);

    // nomineeId: number,
    // name: string,
    // govtId: string,
    // phoneNo: string,
    // relation: IRelation

    this.nomineeForm = this.fb.group({

      nomineeId: [4, Validators.required],
      name: ['Judy Geller', Validators.required],
      govtId: ["Adhaar Card", Validators.required],
      govtIdType: ["e-Document", Validators.required],
      phoneNo: ["8743485643", Validators.required],
      relation: ['MOTHER', Validators.required]


    });




    this.beneficiaryForm = this.fb.group({

      beneficiaryId: [2, Validators.required],
      beneficiaryName: ['fsdfsdf', Validators.required],
      beneficiaryAccNo: [23435345, Validators.required],
      accountType: ["CURRENT", Validators.required],
      ifsc: ['dfgdsfg', Validators.required]


    });






  }





  addNominee() {

    console.log(this.nomineeForm.value);

    for (const n of this.account.nominees) {

      if (this.nomineeForm.value.nomineeId === n.nomineeId) {

        const index = this.account.nominees.indexOf(n);
        this.account.nominees.splice(index, 1);
      }

    }

    this.account.nominees.push(this.nomineeForm.value);

    console.log(this.account.nominees);

    this._accountService.addNominee(this.nomineeForm.value).subscribe({
      next: data => console.log('added nominee', data),
      error: err => console.log('error', err)
    });


    this._accountService.updateAccount(this.account).subscribe({
      next: data => console.log('updated account', data),
      error: err => console.log('error', err)
    });


  }

  updateNominee(nominee: INominee) {

    this.nomineeForm.patchValue(nominee);

  }


  removeNominee(nominee: INominee) {

    let status!: boolean;

    console.log(nominee);

    const index = this.account.nominees.indexOf(nominee);

    console.log(index);

    this.account.nominees.splice(index, 1);

    console.log(this.account.nominees);

    // this._accountService.updateAccount(this.account).subscribe({
    //   next: data => console.log('updated account', status = true),
    //   error: err => console.log('error', err)
    // });

    this.updateAccount(this.account);
     this.removNominee(nominee);


      // this._accountService.removeNominee(nominee.nomineeId).subscribe({
      //   next: data => console.log('deleted and updated account', data),
      //   error: err => console.log('error', err)
      // });




  }




  addBeneficiary() {

    console.log(this.beneficiaryForm.value);



    for (const b of this.account.beneficiaries) {

      if (this.beneficiaryForm.value.beneficiaryId === b.beneficiaryId) {

        const index = this.account.beneficiaries.indexOf(b);
        this.account.beneficiaries.splice(index, 1);
      }

    }

    this.account.beneficiaries.push(this.beneficiaryForm.value);

    console.log(this.account.beneficiaries);

    this._accountService.addBeneficiary(this.beneficiaryForm.value).subscribe({
      next: data => console.log('added beneficiary', data),
      error: err => console.log('error', err)
    });

    this._accountService.updateAccount(this.account).subscribe({
      next: data => console.log('updated account', data),
      error: err => console.log('error', err)
    });

  }


  updateBeneficiary(beneficiary: IBeneficiary) {

    this.beneficiaryForm.patchValue(beneficiary);

  }

  removeBeneficiary(beneficiary: IBeneficiary) {

    console.log(beneficiary);

    const index = this.account.beneficiaries.indexOf(beneficiary);

    console.log(index);

    this.account.beneficiaries.splice(index, 1);

    console.log(this.account.beneficiaries);

    this.updateAccount(this.account);

    this._accountService.removeBeneficiary(beneficiary.beneficiaryId).subscribe({
      next: data => console.log('deleted and updated account', data),
      error: err => console.log('error', err)
    });



  }


  updateAccount(account: IAccount){
    this._accountService.updateAccount(account).subscribe({
      next: data => console.log('updated Account', data),
      error: err => console.log('error', err)
    });
    
  }

  removNominee(nominee: INominee){
    this._accountService.removeNominee(nominee.nomineeId).subscribe({
      next: data => console.log('deleted and updated account', data),
      error: err => console.log('error', err)
    });

  }




  // getApiData(){

  //   this.beneficiaryForm.setValue(this.account.beneficiaries[0]);
  // }






}
