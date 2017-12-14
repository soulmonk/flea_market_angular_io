import { Routes } from '@angular/router';
import { ToolsComponent } from '@app/tools';
import { RandomStringComponent } from '@app/tools/random-string/random-string.component';

export const toolsRoutes: Routes = [
  {
    path: '', component: ToolsComponent,
    children: [
      {path: '', redirectTo: 'random-string', pathMatch: 'full'},
      {path: 'random-string', component: RandomStringComponent, data: {title: 'Random String'}}
    ]
  }
];
