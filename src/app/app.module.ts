import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CustomerComponent } from './customer/customer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDetailsComponent } from './admin/admin-details/admin-details.component';
import { CustomerViewComponent } from './admin/customer-view/customer-view.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCusTranComponent } from './admin/admin-cus-tran/admin-cus-tran.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    CustomerComponent,
    WelcomeComponent,
    AdminComponent,
    AccountComponent,
    AdminDetailsComponent,
    CustomerViewComponent,
    AdminActionsComponent,
    AdminCusTranComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
