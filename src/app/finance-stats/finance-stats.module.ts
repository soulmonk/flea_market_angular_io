import { NgModule } from '@angular/core'

import { FinanceStatsRoutingModule } from './finance-stats-routing.module'
import { SharedModule } from '@app/shared'
import { GraphQLModule } from './graphql.module'
import { DashboardComponent } from './containers/dashboard/dashboard.component'
import { TransactionService } from './services/transaction.service'
import { TransactionPageComponent } from './containers/transaction-page/transaction-page.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { TransactionEffects } from './effects/transaction.effects'
import { TransactionListComponent } from './components/transaction-list/transaction-list.component'
import { FinanceStatsComponent } from '@app/finance-stats/containers/finance-stats/finance-stats.component'

@NgModule({
  declarations: [
    TransactionPageComponent,
    TransactionListComponent,
    DashboardComponent,
    FinanceStatsComponent
  ],
  imports: [
    SharedModule,
    FinanceStatsRoutingModule,
    GraphQLModule,
    StoreModule.forFeature('finance-stats', reducers),
    EffectsModule.forFeature([TransactionEffects])
  ],
  providers: [
    TransactionService,
  ],
})
export class FinanceStatsModule {}
