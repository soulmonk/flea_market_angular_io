import { NgModule } from '@angular/core';

import { FinanceStatsRoutingModule } from './finance-stats-routing.module';
import { SharedModule } from '@app/shared'


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    FinanceStatsRoutingModule
  ]
})
export class FinanceStatsModule { }
