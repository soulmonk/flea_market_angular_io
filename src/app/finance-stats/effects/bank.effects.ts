import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {BankService} from '../services/bank.service';
import {
  BankActionsType,
  CreateSuccess,
  DismissEditDialog,
  Edit,
  EditFail,
  LoadFail,
  LoadSuccess,
  OpenEditDialog,
  UpdateSuccess,
} from '../actions/bank.actions';
import {IBank} from '../models/bank';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BankEditDialogComponent} from '../components/bank-edit-dialog/bank-edit-dialog.component';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';

@Injectable()
export class BankEffects {
  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BankActionsType.Load),
    switchMap(() => this.service.list().pipe(
        map((banks: IBank[]) => new LoadSuccess(banks)),
        catchError(err => of(new LoadFail(err))),
      ),
    ),
  ));

  openEditDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BankActionsType.OpenEditDialog),
    mergeMap((action: OpenEditDialog) => {
      const dialogRef = this.dialog.open(BankEditDialogComponent, {
        // width: '500px',
        data: action.payload,
      });
      return dialogRef.afterClosed().pipe(
        map(result => {
          if (!result) {
            return new DismissEditDialog();
          }
          return new Edit(result as IBank);
        }),
      );
    }),
  ));

  edit$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BankActionsType.Edit),
    map((action: Edit) => action.payload),
    switchMap((record: IBank) => {
      const isNew = !record.id;
      return this.service.save(record).pipe(
        map((result: IBank) => isNew
          ? new CreateSuccess(result)
          : new UpdateSuccess({id: record.id, changes: result})),
        catchError(err => of(new EditFail(err))),
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private service: BankService,
    public dialog: MatDialog) {
  }
}
