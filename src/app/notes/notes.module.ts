import { NgModule } from '@angular/core';
import { NotesComponent } from './notes.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { NotesService } from './notes.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { notesRoutes } from '@app/notes/notes.routes';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(notesRoutes)
  ],
  declarations: [
    NotesComponent,
    EditDialogComponent
  ],
  entryComponents: [EditDialogComponent],
  providers: [NotesService]
})
export class NotesModule { }
