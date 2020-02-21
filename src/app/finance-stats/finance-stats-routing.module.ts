import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthGuard } from '@app/auth/services/auth-guard.service'
import { NgModule } from '@angular/core'


export const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceStatsRoutingModule { }
