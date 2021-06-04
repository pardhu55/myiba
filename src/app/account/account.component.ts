import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from '../Account';
import { AccountService } from '../account.service';
import { IBeneficiary } from '../Beneficiary';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account!: IAccount;
  beneficiaryForm: any;

  constructor(private route: ActivatedRoute, private _customerService: CustomerService, private _accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {

    const accId = Number(this.route.snapshot.paramMap.get('id'));

    this._accountService.getAccountByAccountId(accId).subscribe({
      next: data => this.account = data,
      error: err => console.log('error', err)
    });


    // console.log(this.account.beneficiaries);



    this.beneficiaryForm = this.fb.group({

      beneficiaryId: [2, Validators.required],
      beneficiaryName: ['fsdfsdf', Validators.required],
      beneficiaryAccNo: [23435345, Validators.required],
      accountType: ["CURRENT", Validators.required],
      ifsc: ['dfgdsfg', Validators.required]


    });






  }


  addBeneficiary() {

    console.log(this.beneficiaryForm.value);

    

    for (const b of this.account.beneficiaries) {

      if(this.beneficiaryForm.value.beneficiaryId === b.beneficiaryId){

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
    });;

  }


  updateBeneficiary(beneficiary: IBeneficiary){

    this.beneficiaryForm.patchValue(beneficiary);

  }

  removeBeneficiary(beneficiary: IBeneficiary) {

    console.log(beneficiary);

    const index = this.account.beneficiaries.indexOf(beneficiary);

    console.log(index);

    this.account.beneficiaries.splice(index, 1);

    console.log(this.account.beneficiaries);

    this._accountService.updateAccount(this.account).subscribe({
      next: data => console.log('updated account', data),
      error: err => console.log('error', err)
    });


    this._accountService.removeBeneficiary(beneficiary.beneficiaryId).subscribe({
      next: data => console.log('deleted and updated account', data),
      error: err => console.log('error', err)
    });



  }




  // getApiData(){

  //   this.beneficiaryForm.setValue(this.account.beneficiaries[0]);
  // }






}
