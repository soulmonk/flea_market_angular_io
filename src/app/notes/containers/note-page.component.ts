import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { INote } from '@app/notes/models/note';
import { EditDialogComponent } from '@app/notes/components/edit-dialog/edit-dialog.component';
import { Observable } from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';

import * as fromNotes from '@app/notes/reducers'
import * as noteActions from '@app/notes/actions/note.actions';

@Component({
  templateUrl: './note-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit {

  notes$: Observable<INote[]>;

  constructor(public store: Store<any>, public dialog: MatDialog) {
    this.notes$ = this.store.pipe(select(fromNotes.getAllNotes))
  }

  ngOnInit() {
    this.store.dispatch(new noteActions.Load());
  }

  create() {
    this.store.dispatch(new noteActions.OpenEditDialog({} as INote));
  }
}
