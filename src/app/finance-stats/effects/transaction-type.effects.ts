import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {TransactionTypeService} from '../services/transaction-type.service';
import {
  LoadFail,
  LoadSuccess,
  TransactionTypeActionsType,
} from '../actions/transaction-type.actions';
import {ITransactionType} from '../models/transaction-type';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class TransactionTypeEffects {
  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionTypeActionsType.Load),
    switchMap(() =>
      this.service.list().pipe(
        map((transactionTypes: ITransactionType[]) =>
          new LoadSuccess(transactionTypes)),
        catchError(err => of(new LoadFail(err))),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private service: TransactionTypeService) {
  }
}
