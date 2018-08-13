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
  latestTransactions = [];
  driverName: any;
  sortAscending: boolean = true;

  rows = [];

  paymentColumns = [
    { name: 'Name' },
    { name: 'Transactions' },
    { name: 'Tokens' }
  ];


  private toasterService: ToasterService;

  constructor(toasterService: ToasterService,
              private dataService: DataService,
              public router: Router) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.getDrivers();
  }

  private onSort(event: any, column: string, sortingType: boolean) {
  // here update the resilt rows as per assending or desc
    console.log('Test');
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
        this.latestTransactions = data;
        console.log(data);
    });
  }

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    this.driverDetail = JSON.parse(JSON.stringify(selected[0]));
    this.driverDetailActive = true;
    this.tokenValue = 0;
    this.getDriverTransactions(this.driverDetail.address);
    this.selectedDriverIndex = selected[0].index;
  }

  // selectRow(index) {
  //   this.selectedDriverIndex = index;
  //   console.log(this.selectedDriverIndex);
  // }

  getTransactionDetails(index) {
    this.selectedTransactionIndex = index;
    this.showTransactions = !this.showTransactions;
  }

  backToDrivers() {
    this.driverDetailActive = false;
  }

  addTokens() {
    this.tokenValue = Number(this.tokenValue) + 100;
  }

  removeTokens() {
    if (this.tokenValue >= 100) {
      this.tokenValue = Number(this.tokenValue) - 100;
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

  calculateTotalTime(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const totaltime =  endDate - startDate;
    let day, hour, minute, seconds;
    seconds = Math.floor(totaltime / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    return hour + 'h ' + minute % 60 + 'm ' + seconds % 60 + 's';
  }


}
