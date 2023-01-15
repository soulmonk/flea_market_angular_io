import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {FilterChange, Load} from '@app/finance-stats/actions/transactions.actions';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {endOfDay, endOfMonth, startOfDay, startOfMonth} from 'date-fns';

@Component({
  selector: 'ndfsm-transaction-filter',
  styles: [`
    .mat-mdc-form-field {
      margin: 10px;
    }
`],
  templateUrl: './transaction-filter.component.html',
})
export class TransactionFilterComponent {
  filter = new UntypedFormGroup({
    dateFrom: new UntypedFormControl(startOfMonth(new Date())),
    dateTo: new UntypedFormControl(endOfMonth(new Date())),
    limit: new UntypedFormControl(20),
    offset: new UntypedFormControl(),
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
