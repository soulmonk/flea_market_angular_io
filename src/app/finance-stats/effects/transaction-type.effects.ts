import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {TransactionTypeService} from '../services/transaction-type.service';
import {
  CreateSuccess,
  EditFail,
  LoadFail,
  LoadSuccess,
  TransactionTypeActionsType,
  UpdateSuccess,
  DismissEditDialog,
  Edit,
  OpenEditDialog
} from '../actions/transaction-type.actions';
import {ITransactionType} from '../models/transaction-type';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {
  TransactionTypeEditDialogComponent
} from '../components/transaction-type-edit-dialog/transaction-type-edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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

  openEditDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionTypeActionsType.OpenEditDialog),
    mergeMap((action: OpenEditDialog) => {
      const dialogRef = this.dialog.open(TransactionTypeEditDialogComponent, {
        // width: '500px',
        data: action.payload,
      });
      return dialogRef.afterClosed().pipe(
        map(result => {
          if (!result) {
            return new DismissEditDialog();
          }
          return new Edit(result as ITransactionType);
        }),
      );
    }),
  ));

  edit$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionTypeActionsType.Edit),
    map((action: Edit) => action.payload),
    switchMap((record: ITransactionType) => {
      const isNew = !record.id;
      return this.service.save(record).pipe(
        map((result: ITransactionType) => isNew
          ? new CreateSuccess(result)
          : new UpdateSuccess({id: record.id, changes: result})),
        catchError(err => of(new EditFail(err))),
      );
    }),
  ));


  constructor(
    private actions$: Actions,
    private service: TransactionTypeService,
    public dialog: MatDialog) {
  }
}
