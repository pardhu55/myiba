import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomerService } from 'src/app/customer.service';
import { IAdmin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

  admins!: Observable<IAdmin[]>
  admi!: IAdmin[];
  constructor(private router: Router, private route: ActivatedRoute,private _adminService: AdminService, private _customerService: CustomerService) { }

  ngOnInit(): void {
   this._adminService.listAllAdmins().subscribe(data=>{
     console.log(data)
    this.admi=data;
      
   });
    
   }
  listAllAdmins(){    
    this._adminService.listAllAdmins().subscribe(data=>{
      console.log(data)
      this.admi=data;
      
    });
    
}

onCustomerDetails(){
  this.router.navigate(["/admin-customer"]);
}
}