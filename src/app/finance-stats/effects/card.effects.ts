import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {CardService} from '../services/card.service';
import {
  CardActionsType,
  LoadFail,
  LoadSuccess,
  CreateSuccess,
  DismissEditDialog,
  Edit, EditFail,
  OpenEditDialog,
  UpdateSuccess
} from '../actions/card.actions';
import {ICard} from '../models/card';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CardEditDialogComponent} from '../components/card-edit-dialog/card-edit-dialog.component';

@Injectable()
export class CardEffects {
  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CardActionsType.Load),
    switchMap(() =>
      this.service.list().pipe(
        map((cards: ICard[]) => new LoadSuccess(cards)),
        catchError(err => of(new LoadFail(err))),
      ),
    ),
  ));

  openEditDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CardActionsType.OpenEditDialog),
    mergeMap((action: OpenEditDialog) => {
      const dialogRef = this.dialog.open(CardEditDialogComponent, {
        // width: '500px',
        data: action.payload,
      });
      return dialogRef.afterClosed().pipe(
        map(result => {
          if (!result) {
            return new DismissEditDialog();
          }
          return new Edit(result as ICard);
        }),
      );
    }),
  ));

  edit$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CardActionsType.Edit),
    map((action: Edit) => action.payload),
    switchMap((record: ICard) => {
      const isNew = !record.id;
      return this.service.save(record).pipe(
        map((result: ICard) => isNew
          ? new CreateSuccess(result)
          : new UpdateSuccess({id: record.id, changes: result})),
        catchError(err => of(new EditFail(err))),
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private service: CardService,
    public dialog: MatDialog) {
  }
}
