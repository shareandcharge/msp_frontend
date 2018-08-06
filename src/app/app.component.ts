import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DataService } from './common/index';
import { Http, Response } from '@angular/http';
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
  registeredFlag = '';

  constructor (
    public router: Router,
    toasterService: ToasterService,
    private viewContainer: ViewContainerRef,
    private dataService: DataService,
    private http: Http
  ) {
    this.toasterService = toasterService;
  }

  public ngOnInit() {
    this.getAccountInfo();
    this.registeredFlag = localStorage.getItem('registeredMsp');

    if (this.registeredFlag !== 'true') {
      this.http.get('http://18.195.223.26:9090/api/v1/msp').subscribe(
        data => {
          localStorage.setItem('registeredMsp', 'true');
          this.registeredFlag = localStorage.getItem('registeredMsp');
          this.router.navigate(['drivers']);
        },
        err => {
            this.router.navigate(['register']);
        }
      );
    } else {
      this.router.navigate(['drivers']);
    }
  }

  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
    });
  }

}
