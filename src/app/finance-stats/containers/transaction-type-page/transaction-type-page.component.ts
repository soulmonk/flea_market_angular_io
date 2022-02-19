import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Load, OpenEditDialog} from '../../actions/transaction-type.actions';
import {getLoggedIn} from '@app/auth/reducers';
import {getAllTransactionType} from '@app/finance-stats/reducers/transaction-type.reducer';
import {ITransactionType} from '@app/finance-stats/models/transaction-type';

@Component({
  templateUrl: './transaction-type-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTypePageComponent implements OnInit {
  transactionTypes$: Observable<ITransactionType[]>;
  loggedIn$: Observable<boolean>;

  displayedColumns = ['id', 'name', 'description'];

  constructor(public store: Store<any>) {
    this.transactionTypes$ = this.store.pipe(select(getAllTransactionType));
    this.loggedIn$ = this.store.pipe(select(getLoggedIn));
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  create() {
    this.store.dispatch(new OpenEditDialog({} as ITransactionType));
  }
}
