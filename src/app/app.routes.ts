import { Routes } from '@angular/router';
import { RegisteredGuard } from './auth/registered.guard';
import { UnregisteredGuard } from './auth/unregistered.guard';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { MnemonicComponent } from './mnemonic/mnemonic.component';
import { DriversComponent } from './drivers/drivers.component';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, canActivate: [UnregisteredGuard]},
  { path: 'account', component: AccountComponent, canActivate: [RegisteredGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [RegisteredGuard]},
  { path: 'mnemonic', component: MnemonicComponent, canActivate: [UnregisteredGuard]},
  { path: 'drivers', component: DriversComponent, canActivate: [RegisteredGuard]}
];

// export const routes: Routes = [
//   {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthLoginGuard] },
//   { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
//   { path: 'myEnergy', component: MyEnergyComponent, canActivate: [AuthGuard] },
//   { path: 'myCommunity', component: MyCommunityComponent, canActivate: [AuthGuard] },
//   { path: 'myInstallation', component: MyInstallationComponent, canActivate: [AuthGuard] },
//   { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard] },
// ];
