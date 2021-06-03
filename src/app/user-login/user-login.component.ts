import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router) { }

  loginForm: any;

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      userId: ['2', Validators.required],
      password: ['password', [Validators.required, Validators.minLength(8)]],
      role: ['CUSTOMER', Validators.required]
    });
  }

  onSubmit() {
    console.log('onSubmit ran');

    let receivedUser: IUser;
    let receivedError;

    this._userService.signIn(this.loginForm.value).subscribe({
      next: data => this.checkUserAndRoute(data),
      error: err => console.log('error', err)
    });


  }


  checkUserAndRoute(user: IUser): void{
    if(user.role === 'CUSTOMER'){

      this.router.navigate(["/customer", user.userId]);
    }else if(user.role === 'ADMIN'){

      this.router.navigate(["/admin", user.userId]);
    }
  }


}
