import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import {
  Add,
  AddFail,
  AddSuccess,
  LoadFail,
  LoadSuccess,
  Remove,
  RemoveFail,
  RemoveSuccess,
  TodoActionTypes,
  Update,
  UpdateFail,
  UpdateSuccess,
} from '@app/todos/actions/todo'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import { TodoService } from '@app/todos/services/todo.service'
import { ITodo } from '@app/todos/models/todo'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActionTypes.Load),
    switchMap(() =>
      this.todoService.list().pipe(
        map((todos: ITodo[]) => new LoadSuccess(todos)),
        catchError(error => of(new LoadFail(error))),
      ),
    ),
  )
  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActionTypes.Add),
    map((action: Add) => action.payload),
    mergeMap(newTodo =>
      this.todoService.create(newTodo).pipe(
        map((todo: ITodo) => new AddSuccess(todo)),
        catchError(error => of(new AddFail(error))),
      ),
    ),
  )

  @Effect()
  updateTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActionTypes.Update),
    map((action: Update) => action.payload),
    mergeMap(({ id, data }) =>
      this.todoService.update(id, data).pipe(
        map((todo: ITodo) => new UpdateSuccess(todo)),
        catchError(error => of(new UpdateFail(error))),
      ),
    ),
  )

  @Effect()
  removeTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActionTypes.Remove),
    map((action: Remove) => action.id),
    mergeMap(id =>
      this.todoService.remove(id).pipe(
        map(() => new RemoveSuccess(id)),
        catchError(error => of(new RemoveFail(error))),
      ),
    ),
  )

  constructor (
    private actions$: Actions<Action>,
    private todoService: TodoService) {}

}
