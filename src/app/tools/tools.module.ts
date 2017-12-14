import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toolsRoutes } from '@app/tools/tools.routes';
import { RandomStringComponent } from './random-string/random-string.component';
import { ToolsComponent } from './tools/tools.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild(toolsRoutes)
  ],
  declarations: [RandomStringComponent, ToolsComponent]
})
export class ToolsModule { }
