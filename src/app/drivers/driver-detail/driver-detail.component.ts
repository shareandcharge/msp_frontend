import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.sass']
})
export class DriverDetailComponent implements OnInit {

  transactionsActive: boolean = false;
  tokensActive: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  backToDrivers() {
    this.router.navigate(['/drivers']);
  }

}
