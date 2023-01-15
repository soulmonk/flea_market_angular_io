import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {INote} from '@app/notes/models/note';
import {EditDialogComponent} from '@app/notes/components/edit-dialog/edit-dialog.component';
import {select, Store} from '@ngrx/store';

import * as fromNotes from '@app/notes/reducers';
import * as noteActions from '@app/notes/actions/note.actions';
import {Observable} from 'rxjs';
import * as fromAuth from '@app/auth/reducers';

@Component({
  templateUrl: './note-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit {

  notes$: Observable<INote[]>;
  loggedIn$: Observable<boolean>;

  constructor(public store: Store<any>, public dialog: MatDialog) {
    this.notes$ = this.store.pipe(select(fromNotes.getAllNotes));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  ngOnInit() {
    this.store.dispatch(new noteActions.Load());
  }

  create() {
    this.store.dispatch(new noteActions.OpenEditDialog({} as INote));
  }
}
