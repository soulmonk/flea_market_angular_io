import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { todosRoutes } from './todos.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { todosReducer } from './reducers/todo.reducer';
import { TodoEffects } from './effects/todo.effects';
import { TodosComponent } from './containers/todo.component';
import { TodoService } from '@app/todos/services/todo.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(todosRoutes),

    StoreModule.forFeature('todos', todosReducer),

    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [TodosComponent],
  providers: [TodoService]
})
export class TodosModule {}
