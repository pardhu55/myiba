import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from '../Account';
import { ICustomer } from '../Customer';
import { CustomerService } from '../customer.service';
import { ITransaction } from '../Transaction';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  customerId!: number;
  customer!: ICustomer;
  account!: IAccount;

  customerAccountId!: number;
  transactions!: ITransaction[];

  depositForm: any;
  depositStatus: boolean = false;

  transferForm: any;
  transferStatus: boolean = false;

  withdrawForm: any;
  withdrawStatus: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private _customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    this.customerId = id;
    

    this._customerService.getCustomer(id).subscribe({
      next: data => this.customer = data,
      error: err => console.log('error', err)
    });

    this._customerService.getAccountByCustomerId(id).subscribe({
      next: data => this.account = data,
      error: err => console.log('error', err)
    });



    //should complete
    // const promise2 = doSomething().then(successCallback, failureCallback);
    
    // this._customerService.getAllTransactionsByAccountId(32).subscribe({
    //   next: data => this.transactions = data,
    //   error: err => console.log('error', err)
    // });



    this.depositForm = this.fb.group({

      amount: ['1000', Validators.required]
    });

    this.transferForm = this.fb.group({

      receiverAccountId: ['', Validators.required],
      amount: ['1000', Validators.required]
    });

    this.withdrawForm = this.fb.group({

      amount: ['1000', Validators.required]

    });

  }


  getTransactionsByAccountId(){

    this._customerService.getAllTransactionsByAccountId(this.account.accountId).subscribe({
      next: data => this.transactions = data.reverse(),
      error: err => console.log('error', err)
    });


  }


  transferMoney(){

    console.log(this.transferForm.value.receiverAccountId);
    console.log(this.transferForm.value.amount);

    this._customerService.transferMoney(this.account.accountId, this.transferForm.value.receiverAccountId, this.transferForm.value.amount, this.customer.customerName, this.customer.password).subscribe(
      data => console.log(this.transferStatus = true, data),
      error => console.log('Error!', error)
    );



  }

  withdrawMoney() {

    console.log(this.withdrawForm.value.amount);
    

    this._customerService.withdrawMoney(this.account.accountId, this.withdrawForm.value.amount, this.customer.customerName, this.customer.password).subscribe(
      data => console.log(this.withdrawStatus = true, data),
      error => console.log('Error!', error)
    );

  }

  depositMoney() {

    console.log(this.depositForm.value.amount);
    

    this._customerService.depositMoney(this.account.accountId, this.depositForm.value.amount).subscribe(
      data => console.log(this.depositStatus = true, data),
      error => console.log('Error!', error)
    );

    console.log(this.depositStatus);
    
    

    this.router.navigate(["/customer", this.customer.userId]);

  }

  onAccountDetails(){

    this.router.navigate(["/account", this.account.accountId]);
  }

  onCustomerDetails(){

    this.router.navigate(["/profile", this.customer.userId]);
  }


  checkTransactionType(transaction: ITransaction){


    if(transaction.transactionType.toString() === 'CREDIT'){

      console.log(true);
      return true;
      
    }else{
      console.log(false);
      return false;
    }

  }


  getDate(dateTime: any){

    return dateTime.toString().substr(0,10);

  }

  getTime(dateTime: any){

    return dateTime.toString().substr(11,17);

  }

  reloadCurrentPage() {
    window.location.reload();
   }


}