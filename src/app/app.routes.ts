import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { NotFoundComponent } from '@app/core';


export const appRoutes: Routes = [
  {path: 'notes', component: NotesComponent},
  {path: 'auth', loadChildren: './entrance/entrance.module#EntranceModule'},

  {path: '', redirectTo: '/notes', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}
];
