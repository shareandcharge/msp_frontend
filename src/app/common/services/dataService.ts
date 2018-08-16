import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import '../rxjs-operators';
import {ToasterModule, ToasterService, ToasterContainerComponent} from 'angular2-toaster';
import {Broadcaster} from './broadcasterService';
declare let BroadcastChannel;
import { environment } from '../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class DataService {
    private cache = {};
    private errorObject: any = {};
    @BlockUI() blockUI: NgBlockUI;
    baseUrl = environment.apiUrl;

    constructor(private http: Http,
                private broadcaster: Broadcaster,
                private toasterService: ToasterService
              ) {
                this.toasterService = toasterService;
    }

    setCache(obj: any) {
        Object.assign(this.cache, obj);
    }

    getCache(prop: any) {
        return prop ? this.cache[prop] : this.cache;
    }

    // MSP

    getAccountInfo(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'msp');
    }

    setAccountInfo(params): Observable<any> {
        return this.execPOSTRequest(this.baseUrl + 'msp');
    }

    getSeed(params): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'msp/wallet/seed');
    }

    getHistory(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'msp/history');
    }

    getDrivers(params): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'drivers');
    }

    getDriverTransactions(params): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'tx_history/' + params);
    }

    getWallet(walletId): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'wallet/' + walletId);
    }

    topUpWallet(walletId, ammount): Observable<any> {
      return this.execPOSTRequest(this.baseUrl + 'token/mint/' + walletId + '?amount=' + ammount);
    }

    getCpoPaymentRequests(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'list_reimbursements' );
    }

    getCpoPaymentRequestsPending(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'list_reimbursements?status=pending' );
    }

    getCpoPaymentRequestsCompleted(): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'list_reimbursements?status=complete' );
    }

    setPaymentStatus(reimbursementId): Observable<any> {
      return this.execPUTRequest(this.baseUrl + 'set_status/' + reimbursementId + '/complete');
    }

    getCdrs(reimbursementId): Observable<any> {
      return this.execGETRequest(this.baseUrl + 'view_cdrs/' + reimbursementId);
    }

    getInvoice(serverAddress, reimbursementId): Observable<any> {
      return this.execGETRequest(serverAddress + '/cpo/payment/download_invoice/' + reimbursementId);
    }

    /********************* Handling Requests ***********************/

    handleError(error: any, disabledToast?: boolean): Observable<Error> {
        const err = error || {};
        this.errorObject = JSON.parse(err._body);
        const errMessage = this.errorObject.error || 'Server error';
        if (!disabledToast) {
          this.toasterService.pop('error', 'Error', errMessage);
          this.logError(err).subscribe();
        }

        this.broadcaster.broadcast('httpRequest', false);
        setTimeout(() => {
          this.blockUI.stop();
        }, 100);
        return Observable.throw(errMessage);
    }

    private execPOSTRequest(url: string, params: Object = {}, disabledToast?: boolean): Observable<any> {
      this.broadcaster.broadcast('httpRequest', true);
      this.blockUI.start();
      return this.http.post(url, params)
          .map((response: Response) => this.handleResponse(response))
          .catch((error: any) => this.handleError(error, disabledToast));
  }

  private execGETRequest(url: string, params: Object = {}): Observable<any> {
      this.broadcaster.broadcast('httpRequest', true);
      this.blockUI.start();
      return this.http.get(url, {params})
          .map((response: Response) => this.handleResponse(response))
          .catch((error: any) => this.handleError(error));
  }

  private execPUTRequest(url: string, params: Object = {}): Observable<any> {
    this.broadcaster.broadcast('httpRequest', true);
    this.blockUI.start();
    return this.http.put(url, params)
        .map((response: Response) => this.handleResponse(response))
        .catch((error: any) => this.handleError(error));
  }

    handleResponse(response: Response) {
        let res: any = {};
        try {
            res = response.json();
        } catch (e) {

        }
        this.broadcaster.broadcast('httpRequest', false);
        setTimeout(() => {
          this.blockUI.stop();
        }, 100);

        if (res.status === 'ERROR') {
           // Handle errors thrown by back end
        }
        if (res.error) {
          // Handle errors thrown by back end
        }
        return res;
    }

    private logError(error: any): Observable<any> {
        return this.http.post('/log/js/message', {
            origin: 'MSP-web-app',
            userAgent: navigator ? navigator.userAgent : undefined,
            browser: navigator ? navigator.userAgent : undefined,
            url: window.location.href,
            cause: error.message,
            error: error.stack ? error.stack.toString() : JSON.stringify(error),
            date: new Date().getTime(),
            isError: true
        });
    }
}
