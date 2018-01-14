import { NgModule } from '@angular/core';
import { ScriptsComponent } from './scripts/scripts.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ScriptsComponent]
})
export class ScriptsModule { }
