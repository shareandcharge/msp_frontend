import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import { DataService } from '../common/index';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html'
})
export class DriversComponent implements OnInit {

  driverDetail: any = [];
  driverDetailActive: boolean = false;
  transactionsActive: boolean = false;
  tokensActive: boolean = false;
  tokenValue = 0;
  selected = [];
  selectedDriverIndex: any = 0;
  driversRows = [];
  driversColumns = [];
  selectedTransactionIndex: any;
  showTransactions: any;


  private toasterService: ToasterService;

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.dataService.getDrivers({
    }).subscribe((data) => {
        this.driversRows = data;
        console.log(data);
    });
  }

  getDriverTransactions(driverId) {
    this.dataService.getDriverTransactions(driverId).subscribe((data) => {
        console.log(data);
    });
  }

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    this.driverDetail = JSON.parse(JSON.stringify(selected[0]));
    this.driverDetailActive = true;
    this.tokenValue = 0;
    this.getDriverTransactions(this.driverDetail.address);
  }

  selectRow(index) {
    this.selectedDriverIndex = index;
    // console.log(index);
    console.log(this.selectedDriverIndex);
  }

  getTransactionDetails(index) {
    this.selectedTransactionIndex = index;
    this.showTransactions = !this.showTransactions;
  }

  backToDrivers() {
    this.driverDetailActive = false;
  }

  addTokens() {
    this.tokenValue = this.tokenValue += 100;
  }

  removeTokens() {
    if (this.tokenValue >= 100) {
      this.tokenValue = this.tokenValue -= 100;
    }
  }

  topUpWallet() {
    this.dataService.topUpWallet(this.driverDetail.address, this.tokenValue).subscribe((data) => {
        console.log(data);
        this.transactionsActive = false;
        this.tokensActive = false;
        this.tokenValue = 0;
        this.toasterService.pop('success', 'Success', 'You have successfuly added tokens to this driver.');
        this.getDrivers();
        setTimeout(() => {
          this.driverDetail = this.driversRows[this.selectedDriverIndex];
          console.log(this.selectedDriverIndex);
        }, 1000);
      });
  }


}
