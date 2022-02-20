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
import {TransactionTypePageComponent} from './containers/transaction-type-page/transaction-type-page.component';
import {TransactionTypeEditDialogComponent} from './components/transaction-type-edit-dialog/transaction-type-edit-dialog.component';
import {CardPageComponent} from './containers/card-page/card-page.component';
import {BankPageComponent} from './containers/bank-page/bank-page.component';
import {BankService} from './services/bank.service';
import {BankEffects} from './effects/bank.effects';
import {CardEditDialogComponent} from './components/card-edit-dialog/card-edit-dialog.component';
import {BankEditDialogComponent} from './components/bank-edit-dialog/bank-edit-dialog.component';

@NgModule({
  declarations: [
    TransactionPageComponent,
    TransactionTypePageComponent,
    TransactionListComponent,
    DashboardComponent,
    TransactionEditDialogComponent,
    TransactionTypeEditDialogComponent,
    TransactionFilterComponent,
    CardPageComponent,
    CardEditDialogComponent,
    BankPageComponent,
    BankEditDialogComponent,
  ],
  imports: [
    SharedModule,
    FinanceStatsRoutingModule,
    GraphQLModule,
    StoreModule.forFeature('finance-stats', reducers),
    EffectsModule.forFeature([TransactionEffects, CardEffects, TransactionTypeEffects, BankEffects])
  ],
  providers: [
    TransactionService,
    TransactionTypeService,
    CardService,
    BankService,
  ],
})
export class FinanceStatsModule {
}
