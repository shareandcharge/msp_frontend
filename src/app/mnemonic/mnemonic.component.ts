import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/index';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent implements OnInit {

  accountInfo: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }


  getAccountInfo() {
    this.dataService.getAccountInfo().subscribe((data) => {
         this.accountInfo = data;
         console.log(this.accountInfo);
         console.log(data.error);
    });
  }

}
