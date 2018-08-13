import { Component, OnInit } from '@angular/core';
import {DataService} from '../common/index';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  paymentRows = [
    { name: 'POD Point', transactions: '11', tokens: '56'},
    { name: 'POD Point', transactions: '12', tokens: '56'},
    { name: 'POD Point', transactions: '13', tokens: '56'},
    { name: 'POD Point', transactions: '14', tokens: '56'},
    { name: 'POD Point', transactions: '15', tokens: '56'},
    { name: 'POD Point', transactions: '16', tokens: '56'},
    { name: 'POD Point', transactions: '17', tokens: '56'},
    { name: 'POD Point', transactions: '18', tokens: '56'},
    { name: 'POD Point', transactions: '19', tokens: '56'},
    { name: 'POD Point', transactions: '20', tokens: '56'},
    { name: 'POD Point', transactions: '21', tokens: '56'},
    { name: 'POD Point', transactions: '22', tokens: '56'},
    { name: 'POD Point', transactions: '23', tokens: '56'}
  ];
  paymentColumns = [
    { name: 'Name' },
    { name: 'Transactions' },
    { name: 'Tokens' }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

}
