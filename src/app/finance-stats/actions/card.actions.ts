import { Action } from '@ngrx/store'
import { ICard } from '../models/card'
import { Update } from '@ngrx/entity'

export enum CardActionsType {
  Load = '[FINANCE STATS - CARD] Load',
  LoadSuccess = '[FINANCE STATS - CARD] Load Success',
  LoadFail = '[FINANCE STATS - CARD] Load Fail',

  UpdateSuccess = '[FINANCE STATS - CARD] Update Success',
  CreateSuccess = '[FINANCE STATS - CARD] Create Success',

  Edit = '[FINANCE STATS - CARD] Edit',
  EditFail = '[FINANCE STATS - CARD] Edit Fail',
  Remove = '[FINANCE STATS - CARD] Remove',
  RemoveSuccess = '[FINANCE STATS - CARD] Remove Success',
  RemoveFail = '[FINANCE STATS - CARD] Remove Fail',

  OpenEditDialog = '[FINANCE STATS - CARD] Open Edit Dialog',
  DismissEditDialog = '[FINANCE STATS - CARD] Dismiss Edit Dialog',
  DetailsDialog = '[FINANCE STATS - CARD] Details Dialog',
}

export class Load implements Action {
  readonly type = CardActionsType.Load
}

export class LoadSuccess implements Action {
  readonly type = CardActionsType.LoadSuccess

  constructor (public payload: ICard[]) {}
}

export class LoadFail implements Action {
  readonly type = CardActionsType.LoadFail

  constructor (public error: string) {}
}

export class Edit implements Action {
  readonly type = CardActionsType.Edit

  constructor (public payload: ICard) {}
}

export class EditFail implements Action {
  readonly type = CardActionsType.EditFail

  // todo error interface
  constructor (public payload: any) {}
}

export class CreateSuccess implements Action {
  readonly type = CardActionsType.CreateSuccess;

  constructor(public payload: ICard) {}
}

export class UpdateSuccess implements Action {
  readonly type = CardActionsType.UpdateSuccess;

  constructor(public payload: Update<ICard>) {}
}

export class Remove implements Action {
  readonly type = CardActionsType.Remove;

  constructor(public payload: number) {}
}

export class RemoveSuccess implements Action {
  readonly type = CardActionsType.RemoveSuccess;

  constructor(public payload: number) {}
}

export class RemoveFail implements Action {
  readonly type = CardActionsType.RemoveFail;

  constructor(public payload: any) {}
}

export class OpenEditDialog implements Action {
  readonly type = CardActionsType.OpenEditDialog;

  constructor(public payload: ICard) {}
}

export class DismissEditDialog implements Action {
  readonly type = CardActionsType.DismissEditDialog;
}

export class DetailsDialog implements Action {
  readonly type = CardActionsType.DetailsDialog;

  constructor(public payload: ICard) {}
}

export type CardActions =
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
