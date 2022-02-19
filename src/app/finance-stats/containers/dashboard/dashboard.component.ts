import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TransactionService} from '@app/finance-stats/services/transaction.service';
import {IStats} from '@app/finance-stats/models/stats';

@Component({
  templateUrl: './dashboard.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['type', 'amount'];
  stats: IStats[];

  constructor(private service: TransactionService) {}

  ngOnInit() {
    this.service.stats().subscribe(stats => {
      this.stats = stats;
    });
  }
}
