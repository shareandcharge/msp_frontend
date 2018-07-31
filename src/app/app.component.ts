import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DataService } from './common/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  private toasterService: ToasterService;
  public toasterConfig: ToasterConfig = new ToasterConfig ({
    showCloseButton: true,
    tapToDismiss: true,
    limit: 5,
    timeout: 6000
  });
  title = 'MSP Dashboard app';
  accountInfo: any = [];

  constructor (
    public router: Router,
    toasterService: ToasterService,
    private viewContainer: ViewContainerRef,
    private dataService: DataService
  ) {
    this.toasterService = toasterService;
  }

  public ngOnInit() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         console.log(this.accountInfo);
    });
  }

}
