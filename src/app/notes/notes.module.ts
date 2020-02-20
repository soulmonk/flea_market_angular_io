import {NgModule} from '@angular/core';
import {EditDialogComponent} from './components/edit-dialog/edit-dialog.component';
import {NotesService} from './services/notes.service';
import {SharedModule} from '@app/shared';
import {RouterModule} from '@angular/router';
import {notesRoutes} from '@app/notes/notes.routes';
import {NotePageComponent} from '@app/notes/containers/note-page.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '@app/notes/reducers';
import {EffectsModule} from '@ngrx/effects';
import {NoteEffects} from '@app/notes/effects/note.effects';
import { NoteListComponent } from './components/note-list/note-list.component';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(notesRoutes),

    StoreModule.forFeature('notes', reducers),
    EffectsModule.forFeature([NoteEffects])
  ],
  declarations: [
    NotePageComponent,
    EditDialogComponent,
    NoteListComponent,
    DetailsDialogComponent,
  ],
  providers: [NotesService],
})
export class NotesModule {
}
