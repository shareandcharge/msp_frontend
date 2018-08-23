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
  calculatedAmount = 0;
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
    });
  }

  getWallet(walletID) {
    this.dataService.getWallet(walletID).subscribe((data) => {
         this.accountWallet = data;
    });
  }

  getHistory() {
    this.dataService.getHistory().subscribe((data) => {
        this.accountHistory = data;
        let i;
        let totalAmount = 0;
        for (i = 0; i < this.accountHistory.length; i++) {
          if (this.accountInfo.wallet ===  this.accountHistory[i].to_addr) {
            totalAmount = totalAmount + this.accountHistory[i].amount;
          } else {
            totalAmount = totalAmount - this.accountHistory[i].amount;
          }
          if (this.accountHistory.length === (i + 1)) {
            this.calculatedAmount = totalAmount;
          }
        }
    });
  }

  toFixedNotation(number) {
    // disabled
    const initialnumber = Number.parseFloat(number).toFixed(4);
    const formatedNumber = initialnumber.toString();
    return number;
  }

  killMSP() {
    this.dataService.killMSP().subscribe((data) => {
         localStorage.clear();
    });
  }

}
