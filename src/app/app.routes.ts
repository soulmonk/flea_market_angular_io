import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/core';
import { SettingsComponent } from '@app/settings';

export const appRoutes: Routes = [
  {path: 'notes', loadChildren: './notes/notes.module#NotesModule'},
  {path: 'tools', loadChildren: './tools/tools.module#ToolsModule'},
  {path: 'todos', loadChildren: './todos/todos.module#TodosModule'},
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    }
  },

  {path: '', redirectTo: '/notes', pathMatch: 'full'},

  {path: '**', component: NotFoundPageComponent}
];
