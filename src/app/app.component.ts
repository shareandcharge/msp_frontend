import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {ModalDialogComponent} from './common/components/session-timeout/session-timeout-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private toasterService: ToasterService;
  public toasterConfig: ToasterConfig = new ToasterConfig ({
    showCloseButton: true,
    tapToDismiss: true,
    limit: 5,
    timeout: 6000
  });
  title = 'MSP Dashboard app';
  menuState: boolean = false;

  constructor (
    public router: Router,
    toasterService: ToasterService,
    private modalDialogService: ModalDialogService,
    private viewContainer: ViewContainerRef
  ) {
    this.toasterService = toasterService;

  }

  public ngOnInit() {

  }

  openSimpleModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Simple dialog',
      childComponent: SimpleModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      data: {
        text: 'Some text content'
      }
    });
  }

  openSimpleModalWithCallback() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Dialog with delayed closing',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Some text content. It will close after 1 sec.'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      onClose: () => new Promise((resolve: any) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })
    });
  }

  openPromptModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Dialog with action buttons',
      childComponent: SimpleModalComponent,
      data: {
        text: 'Not so simple modal dialog. Do you agree?\n(It will close on Yes, fail on No and do nothing on Site effect)'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      actionButtons: [
        {
          text: 'Yes, close me!',
          buttonClass: 'btn btn-success',
          onAction: () => new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 20);
          })
        },
        {
          text: 'Side effect',
          buttonClass: 'btn btn-info',
          onAction: () => {
            alert('As you can see, I will not close this dialog');
          }
        },
        {
          text: 'No, fail closing!',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
              reject();
            }, 20);
          })
        }
      ]
    });
  }

  openCustomModal() {
    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Session Expired',
      childComponent: ModalDialogComponent,
      settings: {
        closeButtonClass: 'close'
      },
      actionButtons: [
        {
          text: 'Log in',
          buttonClass: 'modal-button modal-button-success',
          onAction: () => new Promise((resolve: any) => {
            setTimeout(() => {

              resolve();
            }, 20);
          })
        }
      ]
    });
  }

// Your session has expired due to inactivity. Please log in again.
}
