import { Action } from '@ngrx/store';
import { ITodo, IUpdateTodo } from '../models/todo'

export enum TodoActionTypes {
  Add = '[TODO] Add',
  AddSuccess = '[TODO] Add Success',
  AddFail = '[TODO] Add Fail',
  Update = '[TODO] Update',
  UpdateSuccess = '[TODO] Update Success',
  UpdateFail = '[TODO] Update Fail',
  Remove = '[TODO] Remove',
  RemoveSuccess = '[TODO] Remove Success',
  RemoveFail = '[TODO] Remove Fail',
  Load = '[TODO] Load',
  LoadSuccess = '[TODO] Load Success',
  LoadFail = '[TODO] Load Fail',

  Filter = '[TODO] Filter',
}

export type TodoFilter = 'ALL' | 'DONE' | 'ACTIVE';

export class Add implements Action {
  readonly type = TodoActionTypes.Add;

  constructor(public payload: ITodo) {}
}

export class AddSuccess implements Action {
  readonly type = TodoActionTypes.AddSuccess;

  constructor(public payload: ITodo) {}
}

export class AddFail implements Action {
  readonly type = TodoActionTypes.AddFail;

  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = TodoActionTypes.Update;

  constructor(public payload: IUpdateTodo) {}
}

export class UpdateSuccess implements Action {
  readonly type = TodoActionTypes.UpdateSuccess;

  constructor(public payload: ITodo) {}
}

export class UpdateFail implements Action {
  readonly type = TodoActionTypes.UpdateFail;

  constructor(public payload: any) {}
}

export class Remove implements Action {
  readonly type = TodoActionTypes.Remove;

  constructor(public id: string) {}
}

export class RemoveSuccess implements Action {
  readonly type = TodoActionTypes.RemoveSuccess;
  constructor(public id: string) {}
}

export class RemoveFail implements Action {
  readonly type = TodoActionTypes.RemoveFail;

  constructor(public payload: any) {}
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

export class Filter implements Action {
  readonly type = TodoActionTypes.Filter

  constructor (public filter: TodoFilter) {}
}

export type TodoActions =
  | Add
  | AddSuccess
  | AddFail
  | Remove
  | RemoveSuccess
  | RemoveFail
  | Update
  | UpdateSuccess
  | UpdateFail
  | Load
  | LoadSuccess
  | LoadFail
  | Filter;
