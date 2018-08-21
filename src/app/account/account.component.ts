import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/index';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  accountInfo: any = [];
  accountWallet = {
    balance: 0,
    currency: ''
  };
  accountHistory = [];
  weiToEvCoin = Math.pow(10, 18);

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAccountInfo();
    this.getHistory();
    // this.killMSP();
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         this.getWallet(data.wallet);
         console.log(this.accountInfo);
    });
  }

  getWallet(walletID) {
    this.dataService.getWallet(walletID).subscribe((data) => {
         this.accountWallet = data;
         console.log(this.accountWallet);
    });
  }

  getHistory() {
    this.dataService.getHistory().subscribe((data) => {
         this.accountHistory = data;
         console.log(data);
    });
  }

  toFixedNotation(number) {
    const initialnumber = Number.parseFloat(number).toFixed(4);
    const formatedNumber = initialnumber.toString();
    return formatedNumber;
  }

  killMSP() {
    this.dataService.killMSP().subscribe((data) => {
         localStorage.clear();
         console.log(data);
    });
  }

}
