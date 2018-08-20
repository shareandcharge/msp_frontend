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
    // this.getCpoPaymentRequests();
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

  // getCdrs(reimbursementId) {
  //   this.dataService.getCdrs(reimbursementId).subscribe((data) => {
  //       console.log(data);
  //   });
  // }

  getInvoice(serverAddress, reimbursementId) {
    this.dataService.getInvoice(serverAddress, reimbursementId).subscribe((data) => {
        console.log(data.redirect);
        console.log(serverAddress);
        const replacedServerAddress = data.redirect.replace('http://{{server_addr}}:{{server_port}}', serverAddress);
        // const finalInvoiceLink = replacedServerAddress.replace('/api/v1', '');
        const replacePdfToHtml = replacedServerAddress.replace('pdf', 'html');
        console.log(replacePdfToHtml);
        // window.open(replacePdfToHtml, '_blank');
        window.open(replacePdfToHtml, '_blank', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');

      });
  }

  onSelectPending({selected}) {
    console.log('Select Event', selected, this.selected);
  }

  onSelectCompleted({selected}) {
    console.log('Select Event', selected, this.selected);
  }

}
