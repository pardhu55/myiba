import { Component, OnInit } from '@angular/core';
import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from '../Account';
import { ICustomer } from '../Customer';
import { CustomerService } from '../customer.service';
import { PasswordValidator } from '../password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private _customerService: CustomerService, private fb: FormBuilder) { }

  customer!: ICustomer;
  account!: IAccount;

  customerForm: any;
  passwordForm: any;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this._customerService.getCustomer(id).subscribe({
      next: data => this.customer = data,
      error: err => console.log('error', err)
    });


    this._customerService.getAccountByCustomerId(id).subscribe({
      next: data => this.account = data,
      error: err => console.log('error', err)
    });

    // console.log(this?.customer);

    this.customerForm = this.fb.group({

      customerName: ['', Validators.required],
      emailId: ['', Validators.required],
      phoneNo: [ , Validators.required],

    });



    this.passwordForm = this.fb.group({

      password: ['', Validators.minLength(8)],
      confirmPassword: ['', Validators.minLength(8)],
    });

    this.passwordForm.setValidators(PasswordValidator);


  }

  onSubmit(){

    console.log(this.customerForm.value.customerName);
    console.log(this.customerForm.value.emailId);
    console.log(this.customerForm.value.phoneNo);

    this.customer.customerName = this.customerForm.value.customerName;
    this.customer.emailId = this.customerForm.value.emailId;
    this.customer.phoneNo = this.customerForm.value.phoneNo;

    console.log(this.customer);

    this._customerService.updateCustomer(this.customer).subscribe({
      next: data => console.log('updated customer', data),
      error: err => console.log('error', err)
    });
    
    
  }

  passwordChange(){

    console.log(this.passwordForm.value.password);
    console.log(this.passwordForm.value.confirmPassword);

    this.customer.password = this.passwordForm.value.password;

    console.log(this.customer);

    this._customerService.updateCustomer(this.customer).subscribe({
      next: data => console.log('updated customer', data),
      error: err => console.log('error', err)
    });

  }

  populateDetails(){

    this.customerForm.patchValue(this.customer);
  
  }

}


