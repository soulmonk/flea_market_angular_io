import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Load, OpenEditDialog} from '../../actions/bank.actions';
import {getAllBank} from '../../reducers/bank.reducer';
import {IBank} from '../../models/bank';

@Component({
  templateUrl: './bank-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankPageComponent implements OnInit {
  banks$: Observable<IBank[]>;
  displayedColumns = ['id', 'name', 'url'];

  constructor(public store: Store<any>) {
    this.banks$ = this.store.pipe(select(getAllBank));
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

  create() {
    this.store.dispatch(new OpenEditDialog({} as IBank));
  }
}
