import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {ITransaction} from '../../models/transaction';
import {getAllTransaction} from '../../reducers/transaction.reducer';
import {Load, OpenEditDialog} from '../../actions/transactions.actions';
import {Load as LoadTransactionType} from '../../actions/transaction-type.actions';
import {Load as LoadCard} from '../../actions/card.actions';
import {TransactionService} from '@app/finance-stats/services/transaction.service';
import {ListTransactionsGQL, ListTransactionsQuery} from '../../../../generated/graphql';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: './transaction-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPageComponent implements OnInit, OnDestroy {
  transactions$: Observable<ITransaction[]>;

  listTransactions: Observable<ListTransactionsQuery['transactions']>;
  transactions: ITransaction[] = [];
  loading = true;

  private querySubscription: Subscription;

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  constructor(public store: Store<any>, private transactionService: TransactionService, listTransactionsGQL: ListTransactionsGQL) {
    this.querySubscription = transactionService.watchTransactions().valueChanges.subscribe(({ data, loading }) => {
      this.transactions = data?.transactions;
      this.loading = loading;
    });
    this.listTransactions = listTransactionsGQL.watch().valueChanges.pipe(map(result => result.data.transactions));
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
