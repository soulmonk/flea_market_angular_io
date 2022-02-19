import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {ITransaction} from '../../models/transaction';
import {trackByFn} from '@app/utils';
import {OpenEditDialog} from '@app/finance-stats/actions/transactions.actions';

@Component({
  selector: 'ndfsm-transaction-list',
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent {
  displayedColumns = ['date', 'description', 'amount', 'type', 'note', 'card', 'actions'];

  @Input() transactions: ITransaction[] = [];

  @Input() canEdit = false;

  constructor(public store: Store<any>) {}

  edit(tx: ITransaction) {
    this.store.dispatch(new OpenEditDialog(tx));
  }
}
