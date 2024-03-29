import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {TransactionService} from '../services/transaction.service';
import {
  LoadFail,
  LoadSuccess,
  TransactionActionsType,
  CreateSuccess,
  DismissEditDialog,
  Edit,
  EditFail,
  OpenEditDialog,
  UpdateSuccess, FilterChange,
} from '../actions/transactions.actions';
import {ITransaction} from '../models/transaction';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TransactionEditDialogComponent} from '../components/transaction-edit-dialog/transaction-edit-dialog.component';
import {ITransactionFilter} from '@app/finance-stats/models/transaction-filter';


@Injectable()
export class TransactionEffects {

  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionActionsType.Load),
    switchMap(() => {
      return this.transactionService.listFull().pipe(
        map((transactions: ITransaction[]) => new LoadSuccess(transactions)),
        catchError(err => of(new LoadFail(err))),
      );
    }),
  ));

  filterChange$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionActionsType.FilterChange),
    switchMap((event: FilterChange) => {
      return this.transactionService.listFull(event.payload).pipe(
        map((transactions: ITransaction[]) => new LoadSuccess(transactions)),
        catchError(err => of(new LoadFail(err))),
      );
    }),
  ));

  openEditDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionActionsType.OpenEditDialog),
    mergeMap((action: OpenEditDialog) => {
      const dialogRef = this.dialog.open(TransactionEditDialogComponent, {
        // width: '500px',
        data: action.payload,
      });
      return dialogRef.afterClosed().pipe(
        map(result => {
          if (!result) {
            return new DismissEditDialog();
          }
          return new Edit(result as ITransaction);
        }),
      );
    }),
  ));


  edit$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TransactionActionsType.Edit),
    map((action: Edit) => action.payload),
    switchMap((record: ITransaction) => {
      const isNew = !record.id;
      return this.transactionService.save(record).pipe(
        map((result: ITransaction) => isNew
          ? new CreateSuccess(result)
          : new UpdateSuccess({id: record.id, changes: result})),
        catchError(err => of(new EditFail(err))),
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    public dialog: MatDialog) {
  }
}
