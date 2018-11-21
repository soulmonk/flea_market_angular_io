import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts/scripts.component';
import { SharedModule } from '../shared';
import {RouterModule} from '@angular/router';
import {scriptsRoutes} from './scripts.routes';

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild(scriptsRoutes),
  ],
  declarations: [ScriptsComponent]
})
export class ScriptsModule { }
