import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthLoginGuard } from './auth/authLogin.guard';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { DriversComponent } from './drivers/drivers.component';

export const routes: Routes = [
  {path: '', redirectTo: 'drivers', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  { path: 'mnemonic', component: MnemonicComponent, canActivate: [AuthGuard]},
  { path: 'drivers', component: DriversComponent, canActivate: [AuthGuard]}
];

// export const routes: Routes = [
//   {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthLoginGuard] },
//   { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
//   { path: 'myEnergy', component: MyEnergyComponent, canActivate: [AuthGuard] },
//   { path: 'myCommunity', component: MyCommunityComponent, canActivate: [AuthGuard] },
//   { path: 'myInstallation', component: MyInstallationComponent, canActivate: [AuthGuard] },
//   { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard] },
// ];
