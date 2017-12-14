import { Routes } from '@angular/router';
import { NotFoundComponent } from '@app/core';
import { SettingsComponent } from '@app/settings';

export const appRoutes: Routes = [
  {path: 'notes', loadChildren: './notes/notes.module#NotesModule'},
  {path: 'auth', loadChildren: './entrance/entrance.module#EntranceModule'},
  {path: 'tools', loadChildren: './tools/tools.module#ToolsModule'},
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    }
  },

  {path: '', redirectTo: '/notes', pathMatch: 'full'},

  {path: '**', component: NotFoundComponent}
];
