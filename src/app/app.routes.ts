import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthLoginGuard } from './auth/authLogin.guard';
import { LoginComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailComponent } from './drivers/driver-detail/driver-detail.component';

export const routes: Routes = [
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  { path: 'register', component: LoginComponent},
  { path: 'account', component: AccountComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'mnemonic', component: MnemonicComponent},
  { path: 'drivers', component: DriversComponent},
  { path: 'driverDetail', component: DriverDetailComponent}
];

// export const routes: Routes = [
//   {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthLoginGuard] },
//   { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
//   { path: 'myEnergy', component: MyEnergyComponent, canActivate: [AuthGuard] },
//   { path: 'myCommunity', component: MyCommunityComponent, canActivate: [AuthGuard] },
//   { path: 'myInstallation', component: MyInstallationComponent, canActivate: [AuthGuard] },
//   { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard] },
// ];
