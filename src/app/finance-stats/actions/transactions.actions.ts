import {Action} from '@ngrx/store';
import {ITransaction} from '../models/transaction';
import {Update} from '@ngrx/entity';

export enum TransactionActionsType {
  Load = '[FINANCE STATS - TRANSACTION] Load',
  LoadSuccess = '[FINANCE STATS - TRANSACTION] Load Success',
  LoadFail = '[FINANCE STATS - TRANSACTION] Load Fail',

  UpdateSuccess = '[FINANCE STATS - TRANSACTION] Update Success',
  CreateSuccess = '[FINANCE STATS - TRANSACTION] Create Success',

  Edit = '[FINANCE STATS - TRANSACTION] Edit',
  EditFail = '[FINANCE STATS - TRANSACTION] Edit Fail',
  Remove = '[FINANCE STATS - TRANSACTION] Remove',
  RemoveSuccess = '[FINANCE STATS - TRANSACTION] Remove Success',
  RemoveFail = '[FINANCE STATS - TRANSACTION] Remove Fail',

  OpenEditDialog = '[FINANCE STATS - TRANSACTION] Open Edit Dialog',
  DismissEditDialog = '[FINANCE STATS - TRANSACTION] Dismiss Edit Dialog',
  DetailsDialog = '[FINANCE STATS - TRANSACTION] Details Dialog',
}

export class Load implements Action {
  readonly type = TransactionActionsType.Load;
}

export class LoadSuccess implements Action {
  readonly type = TransactionActionsType.LoadSuccess;

  constructor(public payload: ITransaction[]) {
  }
}

export class LoadFail implements Action {
  readonly type = TransactionActionsType.LoadFail;

  constructor(public error: string) {
  }
}

export class Edit implements Action {
  readonly type = TransactionActionsType.Edit;

  constructor(public payload: ITransaction) {
  }
}

export class EditFail implements Action {
  readonly type = TransactionActionsType.EditFail;

  // todo error interface
  constructor(public payload: any) {
  }
}

export class CreateSuccess implements Action {
  readonly type = TransactionActionsType.CreateSuccess;

  constructor(public payload: ITransaction) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = TransactionActionsType.UpdateSuccess;

  constructor(public payload: Update<ITransaction>) {
  }
}

export class Remove implements Action {
  readonly type = TransactionActionsType.Remove;

  constructor(public payload: number) {
  }
}

export class RemoveSuccess implements Action {
  readonly type = TransactionActionsType.RemoveSuccess;

  constructor(public payload: number) {
  }
}

export class RemoveFail implements Action {
  readonly type = TransactionActionsType.RemoveFail;

  constructor(public payload: any) {
  }
}

export class OpenEditDialog implements Action {
  readonly type = TransactionActionsType.OpenEditDialog;

  constructor(public payload: ITransaction) {
  }
}

export class DismissEditDialog implements Action {
  readonly type = TransactionActionsType.DismissEditDialog;
}

export class DetailsDialog implements Action {
  readonly type = TransactionActionsType.DetailsDialog;

  constructor(public payload: ITransaction) {
  }
}

export type TransactionActions =
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
