import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/core';
import { SettingsComponent } from '@app/settings';

export const appRoutes: Routes = [
  {path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)},
  {path: 'tools', loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule)},
  {path: 'todos', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)},
  {path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule)},
  {path: 'scripts', loadChildren: () => import('./scripts/scripts.module').then(m => m.ScriptsModule)},
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
