import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Load, OpenEditDialog} from '../../actions/card.actions';
import {getAllCard} from '../../reducers/card.reducer';
import {ICard} from '../../models/card';
import {Load as LoadBank} from '../../actions/bank.actions';

@Component({
  templateUrl: './card-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent implements OnInit {
  cards$: Observable<ICard[]>;
  displayedColumns = ['id', 'name', 'validTo', 'bank'];

  constructor(public store: Store<any>) {
    this.cards$ = this.store.pipe(select(getAllCard));
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());
    this.store.dispatch(new LoadBank());
  }

  create() {
    this.store.dispatch(new OpenEditDialog({} as ICard));
  }
}
