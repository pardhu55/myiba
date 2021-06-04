import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private route: ActivatedRoute, private _customerService: CustomerService) { }

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

  }


  getTransactionsByAccountId(){

    this._customerService.getAllTransactionsByAccountId(this.account.accountId).subscribe({
      next: data => this.transactions = data,
      error: err => console.log('error', err)
    });

  }


  TransferMoney() {

    this._customerService.transferMoney(this.account.accountId, 33, 9, this.customer.customerName, this.customer.password).subscribe(
      data => console.log('Success!', data),
      error => console.log('Error!', error)
    );



  }

  withdrawMoney() {

    this._customerService.withdrawMoney(this.account.accountId, 9, this.customer.customerName, this.customer.password).subscribe(
      data => console.log('Success!', data),
      error => console.log('Error!', error)
    );

  }

  depositMoney() {

    this._customerService.depositMoney(this.account.accountId, 1).subscribe(
      data => console.log('Success!', data),
      error => console.log('Error!', error)
    );

    // this.router.navigate(["/customer", this.customer.userId]);

  }

  onAccountDetails(){

    this.router.navigate(["/account", this.account.accountId]);
  }

}