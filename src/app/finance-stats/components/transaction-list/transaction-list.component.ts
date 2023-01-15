import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {ITransaction} from '../../models/transaction';
import {OpenEditDialog} from '@app/finance-stats/actions/transactions.actions';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'ndfsm-transaction-list',
  templateUrl: './transaction-list.component.html',
  styles: [`
  .table-list {
    max-width: 100%;
    overflow: auto;
  }
  .mat-table-sticky-border-elem-right {
    border-left: 1px solid #e0e0e0;
  }

  .mat-table-sticky-border-elem-left {
    border-right: 1px solid #e0e0e0;
  }

  .mat-column-date {
    width: 100px;
  }
  .mat-column-amount {
    width: 100px;
  }
  `],
})
export class TransactionListComponent {
  displayedColumns = ['date', 'amount', 'description', 'type', 'note', 'card', 'actions'];
  displayedMobileColumns = ['date', 'amount', 'description', 'type', 'actions'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Input() transactions: ITransaction[] = [];

  @Input() canEdit = false;

  constructor(public store: Store<any>, private breakpointObserver: BreakpointObserver) {}

  edit(tx: ITransaction) {
    this.store.dispatch(new OpenEditDialog(tx));
  }

  duplicate(tx: ITransaction) {
    this.store.dispatch(new OpenEditDialog({...tx, id: undefined, date: undefined}));
  }
}
