import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { AdminCusTranComponent } from './admin/admin-cus-tran/admin-cus-tran.component';
import { AdminDetailsComponent } from './admin/admin-details/admin-details.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerViewComponent } from './admin/customer-view/customer-view.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'account/:id/#account', component: AccountComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'customer/:id', component: CustomerComponent},
  {path: 'account/:id', component: AccountComponent},
  {path: 'admin/:id', component: AdminComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer/:id', component: CustomerComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin-details', component: AdminDetailsComponent},
  {path: 'admin-customer', component: CustomerViewComponent},
  {path: 'admin-actions/:id', component: AdminActionsComponent},
  {path: 'admin-custran/:id', component: AdminCusTranComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
