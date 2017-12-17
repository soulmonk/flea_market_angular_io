import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { todosRoutes } from './todos.routes';
import { TodosComponent } from './todos.component';
import { todosReducer } from './todos.reducer';
import { StoreModule } from '@ngrx/store';
import { TodosEffects } from './todos.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(todosRoutes),

    StoreModule.forRoot({
      todos: todosReducer
    }),
    EffectsModule.forRoot([TodosEffects])
  ],
  declarations: [TodosComponent],
  providers: []
})
export class TodosModule {}
