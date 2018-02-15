import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebugComponent } from './debug.component';
import {DebugService} from './debug.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DebugComponent],
  providers: [DebugService],
  exports: [DebugComponent]
})
export class DebugModule { }
