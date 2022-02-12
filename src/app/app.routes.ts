import {Routes} from '@angular/router';
import {NotFoundPageComponent} from '@app/core';
import {SettingsComponent} from '@app/settings';

export const appRoutes: Routes = [
  {path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)},
  {path: 'tools', loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule)},
  {path: 'todos', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)},
  {path: 'finance', loadChildren: () => import('./finance-stats/finance-stats.module').then(m => m.FinanceStatsModule)},
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
