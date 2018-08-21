import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/index';
import { environment } from './../../environments/environment';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  paymentPending: any = [];
  paymentCompleted: any = [];
  selected = [];
  baseUrl = environment.apiUrl;

  paymentRows = [];
  paymentColumns = [];

  constructor(private dataService: DataService,
              private toasterService: ToasterService) { }

  ngOnInit() {
    this.getCpoPaymentRequestsPending();
    this.getCpoPaymentRequestsCompleted();
  }

  getCpoPaymentRequests() {
    this.dataService.getCpoPaymentRequests().subscribe((data) => {
        console.log(data);
    });
  }

  getCpoPaymentRequestsPending() {
    this.dataService.getCpoPaymentRequestsPending().subscribe((data) => {
        console.log(data);
        this.paymentPending = data;
    });
  }

  getCpoPaymentRequestsCompleted() {
    this.dataService.getCpoPaymentRequestsCompleted().subscribe((data) => {
        console.log(data);
        this.paymentCompleted = data;
    });
  }

  setPaymentStatus(reimbursementId) {
    this.dataService.setPaymentStatus(reimbursementId).subscribe((data) => {
        console.log(data);
        this.toasterService.pop('success', 'Success', 'Payment status successfully set.');
        this.getCpoPaymentRequestsPending();
        this.getCpoPaymentRequestsCompleted();
    });
  }

  onSelectPending({selected}) {
    console.log('Select Event', selected, this.selected);
  }

  onSelectCompleted({selected}) {
    console.log('Select Event', selected, this.selected);
  }

}
