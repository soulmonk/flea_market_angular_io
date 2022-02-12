import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {NotesService} from '../services/notes.service';
import {
  CreateSuccess,
  Edit,
  EditFail,
  LoadFail,
  LoadSuccess,
  NoteActionsType,
  OpenEditDialog,
  UpdateSuccess,
  DismissEditDialog,
  DetailsDialog,
} from '../actions/note.actions';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {INote} from '../models/note';
import {MatDialog} from '@angular/material/dialog';
import {EditDialogComponent} from '../components/edit-dialog/edit-dialog.component';
import {DetailsDialogComponent} from '../components/details-dialog/details-dialog.component';
import {Observable, of} from 'rxjs';

@Injectable()
export class NoteEffects {

  
  loadNotes$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(NoteActionsType.Load),
    switchMap(() =>
      this.notesService.list().pipe(
        map((notes: INote[]) => new LoadSuccess(notes)),
        catchError(err => of(new LoadFail(err))),
      ),
    ),
  ));

  
  openEditDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(NoteActionsType.OpenEditDialog),
    mergeMap((action: OpenEditDialog) => {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        // width: '500px',
        data: action.payload,
      });
      return dialogRef.afterClosed().pipe(
        map(result => {
          if (!result) {
            return new DismissEditDialog();
          }
          return new Edit(result as INote);
        }),
      );
    }),
  ));

  
  editNote$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(NoteActionsType.Edit),
    map((action: Edit) => action.payload),
    switchMap((note: INote) => {
      const isNew = !note.id;
      return this.notesService.save(note).pipe(
        map((savedNote: INote) => isNew ? new CreateSuccess(savedNote) : new UpdateSuccess({id: note.id, changes: savedNote})),
        catchError(err => of(new EditFail(err))),
      );
    }),
  ));

  
  detailsDialog$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(NoteActionsType.DetailsDialog),
    tap((action: DetailsDialog) => {
      this.dialog.open(DetailsDialogComponent, {
        data: action.payload,
      });
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions<Action>,
    private notesService: NotesService,
    public dialog: MatDialog) {}
}
