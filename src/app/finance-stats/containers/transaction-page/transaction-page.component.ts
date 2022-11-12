import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ITransaction} from '../../models/transaction';
import {getAllTransaction} from '../../reducers/transaction.reducer';
import {Load, OpenEditDialog} from '../../actions/transactions.actions';
import {Load as LoadTransactionType} from '../../actions/transaction-type.actions';
import {Load as LoadCard} from '../../actions/card.actions';

@Component({
  templateUrl: './transaction-page.component.html',
  styles: [`
    .create-button {
      margin: 10px 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPageComponent implements OnInit {
  transactions$: Observable<ITransaction[]>;

  constructor(public store: Store<any>) {
    this.transactions$ = this.store.pipe(select(getAllTransaction));
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());
    this.store.dispatch(new LoadTransactionType());
    this.store.dispatch(new LoadCard());
  }

  create() {
    this.store.dispatch(new OpenEditDialog({} as ITransaction));
  }
}
