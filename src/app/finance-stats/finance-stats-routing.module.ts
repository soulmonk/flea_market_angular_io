import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './containers/dashboard/dashboard.component'
import { AuthGuard } from '@app/auth/services/auth-guard.service'
import { NgModule } from '@angular/core'
import { TransactionPageComponent } from './containers/transaction-page/transaction-page.component'
import { FinanceStatsComponent } from '@app/finance-stats/containers/finance-stats/finance-stats.component'

export const routes: Routes = [
  {
    path: '', component: FinanceStatsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        component: TransactionPageComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceStatsRoutingModule {}
