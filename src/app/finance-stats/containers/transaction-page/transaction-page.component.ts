import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ITransaction } from '../../models/transaction'
import * as fromFinanceStats from '../../reducers'
import * as transactionActions from '../../actions/transactions.actions'

@Component({
  templateUrl: './transaction-page.component.html',
})
export class TransactionPageComponent implements OnInit {
  transaction$: Observable<ITransaction[]>

  constructor (public store: Store<any>) {
    this.transaction$ = this.store.pipe(select(fromFinanceStats.getAllTransaction))
  }

  ngOnInit (): void {
    this.store.dispatch(new transactionActions.Load())
  }
}
