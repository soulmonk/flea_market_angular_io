import {Component, Input} from '@angular/core';
import {INote} from '@app/notes/models/note';
import {trackByFn} from '@app/utils';
import * as noteActions from '@app/notes/actions/note.actions';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@app/auth/reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'ndfsm-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  trackByFn = trackByFn;

  @Input() notes: INote[];

  @Input() canEdit = false;

  constructor(public store: Store<any>) {
  }

  edit(note: INote) {
    this.store.dispatch(new noteActions.OpenEditDialog(note));
  }

  details(note: INote) {
    this.store.dispatch(new noteActions.DetailsDialog(note));
  }

}
