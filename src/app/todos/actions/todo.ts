import { Action } from '@ngrx/store';
import { ITodo } from '../models/todo';

export enum TodoActionTypes {
  AddTodo = '[TODO] Add',
  AddTodoSuccess = '[TODO] Add Sucess',
  AddTodoFail = '[TODO] Add Fail',
  Load = '[TODO] Load',
  LoadSuccess = '[TODO] Load Success',
  LoadFail = '[TODO] Load Fail',
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;

  constructor(public payload: ITodo) {}
}


export class AddTodoSuccess implements Action {
  readonly type = TodoActionTypes.AddTodoSuccess;

  constructor(public payload: ITodo) {}
}

export class AddTodoFail implements Action {
  readonly type = TodoActionTypes.AddTodoFail;

  constructor(public payload: ITodo) {}
}

/**
 * Load Todo Actions
 */
export class Load implements Action {
  readonly type = TodoActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = TodoActionTypes.LoadSuccess;

  constructor(public payload: ITodo[]) {}
}

export class LoadFail implements Action {
  readonly type = TodoActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type TodoActions =
  | AddTodo
  | Load
  | LoadSuccess
  | LoadFail
