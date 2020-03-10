import { Action } from '@ngrx/store'
import { ITransactionType } from '../models/transaction-type'
import { Update } from '@ngrx/entity'

export enum TransactionTypeActionsType {
  Load = '[FINANCE STATS - TRANSACTION TYPE] Load',
  LoadSuccess = '[FINANCE STATS - TRANSACTION TYPE] Load Success',
  LoadFail = '[FINANCE STATS - TRANSACTION TYPE] Load Fail',

  UpdateSuccess = '[FINANCE STATS - TRANSACTION TYPE] Update Success',
  CreateSuccess = '[FINANCE STATS - TRANSACTION TYPE] Create Success',

  Edit = '[FINANCE STATS - TRANSACTION TYPE] Edit',
  EditFail = '[FINANCE STATS - TRANSACTION TYPE] Edit Fail',
  Remove = '[FINANCE STATS - TRANSACTION TYPE] Remove',
  RemoveSuccess = '[FINANCE STATS - TRANSACTION TYPE] Remove Success',
  RemoveFail = '[FINANCE STATS - TRANSACTION TYPE] Remove Fail',

  OpenEditDialog = '[FINANCE STATS - TRANSACTION TYPE] Open Edit Dialog',
  DismissEditDialog = '[FINANCE STATS - TRANSACTION TYPE] Dismiss Edit Dialog',
  DetailsDialog = '[FINANCE STATS - TRANSACTION TYPE] Details Dialog',
}

export class Load implements Action {
  readonly type = TransactionTypeActionsType.Load
}

export class LoadSuccess implements Action {
  readonly type = TransactionTypeActionsType.LoadSuccess

  constructor (public payload: ITransactionType[]) {}
}

export class LoadFail implements Action {
  readonly type = TransactionTypeActionsType.LoadFail

  constructor (public error: string) {}
}

export class Edit implements Action {
  readonly type = TransactionTypeActionsType.Edit

  constructor (public payload: ITransactionType) {}
}

export class EditFail implements Action {
  readonly type = TransactionTypeActionsType.EditFail

  // todo error interface
  constructor (public payload: any) {}
}

export class CreateSuccess implements Action {
  readonly type = TransactionTypeActionsType.CreateSuccess;

  constructor(public payload: ITransactionType) {}
}

export class UpdateSuccess implements Action {
  readonly type = TransactionTypeActionsType.UpdateSuccess;

  constructor(public payload: Update<ITransactionType>) {}
}

export class Remove implements Action {
  readonly type = TransactionTypeActionsType.Remove;

  constructor(public payload: number) {}
}

export class RemoveSuccess implements Action {
  readonly type = TransactionTypeActionsType.RemoveSuccess;

  constructor(public payload: number) {}
}

export class RemoveFail implements Action {
  readonly type = TransactionTypeActionsType.RemoveFail;

  constructor(public payload: any) {}
}

export class OpenEditDialog implements Action {
  readonly type = TransactionTypeActionsType.OpenEditDialog;

  constructor(public payload: ITransactionType) {}
}

export class DismissEditDialog implements Action {
  readonly type = TransactionTypeActionsType.DismissEditDialog;
}

export class DetailsDialog implements Action {
  readonly type = TransactionTypeActionsType.DetailsDialog;

  constructor(public payload: ITransactionType) {}
}

export type TransactionTypeActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Edit
  | CreateSuccess
  | UpdateSuccess
  | EditFail
  | Remove
  | RemoveSuccess
  | RemoveFail
  | OpenEditDialog
  | DismissEditDialog
  | DetailsDialog
