import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const entranceRoutes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: '/auth/login', pathMatch: 'full'}
];
