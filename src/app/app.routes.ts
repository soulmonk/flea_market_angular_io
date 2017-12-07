import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: 'notes', component: NotesComponent},
  {path: 'auth', loadChildren: './entrance/entrance.module#EntranceModule'},

  {path: '', redirectTo: '/notes', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}
];
