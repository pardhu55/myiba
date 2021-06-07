import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICustomer } from 'src/app/Customer';
import { CustomerService } from 'src/app/customer.service';


@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  customer!: ICustomer;
  customers!: Observable<ICustomer[]>;
  cust!: ICustomer[];
  customerId!: number;
  id!: number;
  constructor(private router: Router, private route: ActivatedRoute, private _customerService: CustomerService) { }

  ngOnInit(): void {

    console.log("done");       

    this._customerService.listAllCustomers().subscribe({
      next: data=> this.cust = data,
      error: err => console.log('error',err)
      
      });      
    
  }

  customerDetails(id: number){
      console.log("working");
      
    this.router.navigate(["/admin-actions",id]); 

  }

  onCustomerDetails(){
    this.router.navigate(["/admin-customer"]);
  }

  listAllAdmins(){   
    this.router.navigate(["/admin-details"]);
  }
 

  deleteCustomer(id: number){

    // this.id = Number(this.route.snapshot.paramMap.get('id'));

    this._customerService.deleteCustomer(id).subscribe({
      next: data=> this.customer = data,
      error: err => console.log('error',err)
      
      });  
      console.log("delete works");
      
  }
}
