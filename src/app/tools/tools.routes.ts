import { Routes } from '@angular/router';
import { ToolsComponent } from '@app/tools';
import { RandomStringComponent } from './random-string/random-string.component';
import {LinksComponent} from './links/links.component';

export const toolsRoutes: Routes = [
  {
    path: '', component: ToolsComponent,
    children: [
      {path: '', redirectTo: 'random-string', pathMatch: 'full'},
      {path: 'random-string', component: RandomStringComponent, data: {title: 'Random String'}},
      {path: 'links', component: LinksComponent, data: {title: 'Useful Links'}}
    ]
  }
];
