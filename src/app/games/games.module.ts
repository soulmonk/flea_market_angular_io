import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import {gamesRoutes} from './games.routes';
import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild(gamesRoutes)
  ],
  declarations: [DashboardComponent]
})
export class GamesModule { }
