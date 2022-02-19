import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {FilterChange, Load} from '@app/finance-stats/actions/transactions.actions';
import {FormControl, FormGroup} from '@angular/forms';
import {endOfDay, endOfMonth, startOfDay, startOfMonth} from 'date-fns';

@Component({
  selector: 'ndfsm-transaction-filter',
  styles: [`
    .mat-form-field {
      margin: 10px;
    }
`],
  templateUrl: './transaction-filter.component.html',
})
export class TransactionFilterComponent {
  filter = new FormGroup({
    dateFrom: new FormControl(startOfMonth(new Date())),
    dateTo: new FormControl(endOfMonth(new Date())),
    limit: new FormControl(20),
    offset: new FormControl(),
  });

  constructor(public store: Store<any>) {}

  reset() {
    this.store.dispatch(new Load());
  }

  apply() {
    const values = this.filter.value;
    this.store.dispatch(new FilterChange({
      dateFrom: startOfDay(values.dateFrom),
      dateTo: endOfDay(values.dateTo),
      limit: values.limit,
      offset: values.offset,
    }));
  }
}
