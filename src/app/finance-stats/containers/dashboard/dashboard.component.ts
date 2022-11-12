import {Component, OnInit} from '@angular/core';
import {TransactionService} from '@app/finance-stats/services/transaction.service';
import {IStats} from '@app/finance-stats/models/stats';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {endOfMonth, startOfMonth} from 'date-fns';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['type', 'amount', 'currencyCode'];
  stats: IStats[];

  filter = new UntypedFormGroup({
    dateFrom: new UntypedFormControl(startOfMonth(new Date())),
    dateTo: new UntypedFormControl(endOfMonth(new Date()))
  });

  constructor(private service: TransactionService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.service.stats(this.filter.value).subscribe(stats => {
      this.stats = stats;
    });
  }
}
