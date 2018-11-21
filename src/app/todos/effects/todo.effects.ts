import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Action, LocalStorageService } from '@app/core';

import { TODOS_KEY, TODOS_PERSIST } from '../reducers/todo.reducer';
import { AddTodo, AddTodoFail, AddTodoSuccess, LoadFail, LoadSuccess, TodoActionTypes } from '@app/todos/actions/todo';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { TodoService } from '@app/todos/services/todo.service';
import { ITodo } from '@app/todos/models/todo';
import {Observable, of} from 'rxjs';

@Injectable()
export class TodoEffects {
  @Effect()
  loadTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActionTypes.Load),
    switchMap(() =>
      this.todoService.list().pipe(
        map((todos: ITodo[]) => new LoadSuccess(todos)),
        catchError(error => of(new LoadFail(error)))
      )
    )
  );
  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
    ofType(TodoActionTypes.AddTodo),
    map((action: AddTodo) => action.payload),
    mergeMap(newTodo =>
      this.todoService.create(newTodo).pipe(
        map((todo: ITodo) => new AddTodoSuccess(todo)),
        catchError(error => of(new AddTodoFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions<Action>,
    private todoService: TodoService,
    private localStorageService: LocalStorageService) {}

  @Effect({dispatch: false})
  persistTodos(): Observable<Action> {
    return this.actions$.ofType(TODOS_PERSIST).pipe(
      tap(action =>
        this.localStorageService.setItem(TODOS_KEY, action.payload)
      )
    );
  }

}
