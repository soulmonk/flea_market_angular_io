import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { entranceRoutes } from './entrance.routes';
import { LoginComponent } from './login/login.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(entranceRoutes)
  ],
  declarations: [LoginComponent]
})
export class EntranceModule { }
