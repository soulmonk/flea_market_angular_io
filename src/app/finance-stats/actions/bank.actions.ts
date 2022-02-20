import {Action} from '@ngrx/store';
import {IBank} from '../models/bank';
import {Update} from '@ngrx/entity';

export enum BankActionsType {
  Load = '[FINANCE STATS - BANK] Load',
  LoadSuccess = '[FINANCE STATS - BANK] Load Success',
  LoadFail = '[FINANCE STATS - BANK] Load Fail',

  UpdateSuccess = '[FINANCE STATS - BANK] Update Success',
  CreateSuccess = '[FINANCE STATS - BANK] Create Success',

  Edit = '[FINANCE STATS - BANK] Edit',
  EditFail = '[FINANCE STATS - BANK] Edit Fail',
  Remove = '[FINANCE STATS - BANK] Remove',
  RemoveSuccess = '[FINANCE STATS - BANK] Remove Success',
  RemoveFail = '[FINANCE STATS - BANK] Remove Fail',

  OpenEditDialog = '[FINANCE STATS - BANK] Open Edit Dialog',
  DismissEditDialog = '[FINANCE STATS - BANK] Dismiss Edit Dialog',
  DetailsDialog = '[FINANCE STATS - BANK] Details Dialog',
}

export class Load implements Action {
  readonly type = BankActionsType.Load;
}

export class LoadSuccess implements Action {
  readonly type = BankActionsType.LoadSuccess;

  constructor(public payload: IBank[]) {
  }
}

export class LoadFail implements Action {
  readonly type = BankActionsType.LoadFail;

  constructor(public error: string) {
  }
}

export class Edit implements Action {
  readonly type = BankActionsType.Edit;

  constructor(public payload: IBank) {
  }
}

export class EditFail implements Action {
  readonly type = BankActionsType.EditFail;

  // todo error interface
  constructor(public payload: any) {
  }
}

export class CreateSuccess implements Action {
  readonly type = BankActionsType.CreateSuccess;

  constructor(public payload: IBank) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = BankActionsType.UpdateSuccess;

  constructor(public payload: Update<IBank>) {
  }
}

export class Remove implements Action {
  readonly type = BankActionsType.Remove;

  constructor(public payload: number) {
  }
}

export class RemoveSuccess implements Action {
  readonly type = BankActionsType.RemoveSuccess;

  constructor(public payload: number) {
  }
}

export class RemoveFail implements Action {
  readonly type = BankActionsType.RemoveFail;

  constructor(public payload: any) {
  }
}

export class OpenEditDialog implements Action {
  readonly type = BankActionsType.OpenEditDialog;

  constructor(public payload: IBank) {
  }
}

export class DismissEditDialog implements Action {
  readonly type = BankActionsType.DismissEditDialog;
}

export class DetailsDialog implements Action {
  readonly type = BankActionsType.DetailsDialog;

  constructor(public payload: IBank) {
  }
}

export type BankActions =
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
