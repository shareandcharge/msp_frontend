import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/index';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html'
})
export class MnemonicComponent implements OnInit {

  mnemonicSeed: any = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getSeed();
  }

  getSeed() {
    this.dataService.getSeed({
    }).subscribe((data) => {
      this.mnemonicSeed = data;
      console.log(data);
    });
  }

}
