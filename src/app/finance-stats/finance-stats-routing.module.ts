import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {AuthGuard} from '@app/auth/services/auth-guard.service';
import {NgModule} from '@angular/core';
import {TransactionPageComponent} from './containers/transaction-page/transaction-page.component';
import {TransactionTypePageComponent} from '@app/finance-stats/containers/transaction-type-page/transaction-type-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transaction',
    component: TransactionPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transaction-types',
    component: TransactionTypePageComponent,
    canActivate: [AuthGuard],
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceStatsRoutingModule {
}
