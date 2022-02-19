import {NgModule} from '@angular/core';

import {FinanceStatsRoutingModule} from './finance-stats-routing.module';
import {SharedModule} from '@app/shared';
import {GraphQLModule} from './graphql.module';
import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {TransactionService} from './services/transaction.service';
import {TransactionTypeService} from './services/transaction-type.service';
import {CardService} from './services/card.service';
import {TransactionPageComponent} from './containers/transaction-page/transaction-page.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './reducers';
import {TransactionEffects} from './effects/transaction.effects';
import {TransactionTypeEffects} from './effects/transaction-type.effects';
import {CardEffects} from './effects/card.effects';
import {TransactionListComponent} from './components/transaction-list/transaction-list.component';
import {TransactionEditDialogComponent} from './components/transaction-edit-dialog/transaction-edit-dialog.component';
import {TransactionFilterComponent} from './components/transaction-filter/transaction-filter.component';
import {TransactionTypePageComponent} from '@app/finance-stats/containers/transaction-type-page/transaction-type-page.component';
import {
  TransactionTypeEditDialogComponent
} from '@app/finance-stats/components/transaction-type-edit-dialog/transaction-type-edit-dialog.component';

@NgModule({
  declarations: [
    TransactionPageComponent,
    TransactionTypePageComponent,
    TransactionListComponent,
    DashboardComponent,
    TransactionEditDialogComponent,
    TransactionTypeEditDialogComponent,
    TransactionFilterComponent
  ],
  imports: [
    SharedModule,
    FinanceStatsRoutingModule,
    GraphQLModule,
    StoreModule.forFeature('finance-stats', reducers),
    EffectsModule.forFeature([TransactionEffects, CardEffects, TransactionTypeEffects])
  ],
  providers: [
    TransactionService,
    TransactionTypeService,
    CardService,
  ],
})
export class FinanceStatsModule {
}
