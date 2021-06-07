import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from 'src/app/Account';
import { CustomerService } from 'src/app/customer.service';
import { ITransaction } from 'src/app/Transaction';

@Component({
  selector: 'app-admin-cus-tran',
  templateUrl: './admin-cus-tran.component.html',
  styleUrls: ['./admin-cus-tran.component.css']
})
export class AdminCusTranComponent implements OnInit {
  account!: IAccount;
  transactions!: ITransaction[];
  id!: number;

  constructor(private router: Router, private route: ActivatedRoute, private _customerService: CustomerService) { }


  ngOnInit(): void {
      this.id = Number(this.route.snapshot.paramMap.get('id'));

    this._customerService.getAllTransactionsByAccountId(this.id).subscribe({
      next: data => this.transactions = data,
      error: err => console.log('error', err)
    });
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

}
