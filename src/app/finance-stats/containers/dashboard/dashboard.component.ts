import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@app/finance-stats/services/transaction.service'

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(private service: TransactionService) { }

  ngOnInit() {
    this.service.listFull().subscribe(data => {
      console.log('dashboard.component.ts::::13 >>>', data)
    })
  }
}
