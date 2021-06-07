import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from 'src/app/Account';
import { ICustomer } from 'src/app/Customer';
import { CustomerService } from 'src/app/customer.service';
import { ITransaction } from 'src/app/Transaction';


@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {

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

  }



  getTransactionsByAccountId() {


    this.router.navigate(["/admin-custran", this.account.accountId]);

  }

  onAccountDetails() {

    this.router.navigate(["/account", this.account.accountId]);
  }

}
