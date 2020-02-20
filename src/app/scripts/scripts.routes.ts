import { Routes } from '@angular/router';
import {ScriptsComponent} from './scripts/scripts.component';
import { AuthGuard } from '@app/auth/services/auth-guard.service'

export const scriptsRoutes: Routes = [
  {path: '', component: ScriptsComponent, canActivate: [AuthGuard]}
];
