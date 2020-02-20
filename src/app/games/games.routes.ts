import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from '@app/auth/services/auth-guard.service'


export const gamesRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]}
];
