import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {toolsRoutes} from '@app/tools/tools.routes';
import {RandomStringComponent} from './random-string/random-string.component';
import {ToolsComponent} from './tools/tools.component';
import {SharedModule} from '@app/shared';
import {SpellingComponent} from './spelling/spelling.component';
import {LinksComponent} from '@app/tools/links/links.component';

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild(toolsRoutes)
  ],
  declarations: [
    RandomStringComponent,
    ToolsComponent,
    SpellingComponent,
    LinksComponent
  ]
})
export class ToolsModule {
}
