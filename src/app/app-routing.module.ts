import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: UserLoginComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'customer/:id', component: CustomerComponent},
  {path: 'account/:id', component: AccountComponent},
  {path: 'admin/:id', component: AdminComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
