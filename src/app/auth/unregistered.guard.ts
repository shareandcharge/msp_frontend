// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../common';
import { Http, Response } from '@angular/http';
import { environment } from './../../environments/environment';

import { Router } from '@angular/router';

@Injectable()
export class UnregisteredGuard implements CanActivate {

  canProceed = false;
  registeredFlag = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: Http
  ) {}

  getAccountInfo() {

    this.registeredFlag = localStorage.getItem('registeredMsp');

    if (this.registeredFlag !== 'true') {
      this.http.get(environment.apiUrl + 'msp').subscribe(
        data => {
          this.canProceed = false;
        },
        err => {
          this.canProceed = true;
          this.router.navigate(['register']);
        }
      );
    } else {
      this.canProceed = false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.getAccountInfo();
    if (this.canProceed === false) {
        return false;
    } else {
        return true;
    }
  }

}
