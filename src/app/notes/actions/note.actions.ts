import {Action} from '@ngrx/store';
import {INote} from '@app/notes/models/note';
import {Update} from '@ngrx/entity';

export enum NoteActionsType {
  Load = '[NOTE] Load',
  LoadSuccess = '[NOTE] Load Success',
  LoadFail = '[NOTE] Load Fail',
  Edit = '[NOTE] Edit',

  UpdateSuccess = '[NOTE] Update Success',
  CreateSuccess = '[NOTE] Create Success',

  EditFail = '[NOTE] Edit Fail',
  Remove = '[NOTE] Remove',
  RemoveSuccess = '[NOTE] Remove Success',
  RemoveFail = '[NOTE] Remove Fail',

  OpenEditDialog = '[NOTE] Open Edit Dialog',
  DismissEditDialog = '[NOTE] Dismiss Edit Dialog',

  DetailsDialog = '[NOTE] Details Dialog',
}

// --- Load group -- START

export class Load implements Action {
  readonly type = NoteActionsType.Load;
}

export class LoadSuccess implements Action {
  readonly type = NoteActionsType.LoadSuccess;

  constructor(public payload: INote[]) {}
}

export class LoadFail implements Action {
  readonly type = NoteActionsType.LoadFail;

  constructor(public payload: any) {}
}

// --- Load group --- END

// --- Edit group --- START

export class Edit implements Action {
  readonly type = NoteActionsType.Edit;

  constructor(public payload: INote) {}
}

export class CreateSuccess implements Action {
  readonly type = NoteActionsType.CreateSuccess;

  constructor(public payload: INote) {}
}

export class UpdateSuccess implements Action {
  readonly type = NoteActionsType.UpdateSuccess;

  constructor(public payload: Update<INote>) {}
}

export class EditFail implements Action {
  readonly type = NoteActionsType.EditFail;

  constructor(public payload: any) {}
}

// --- Edit group --- END

// --- Remove group --- START

export class Remove implements Action {
  readonly type = NoteActionsType.Remove;

  constructor(public payload: number) {}
}

export class RemoveSuccess implements Action {
  readonly type = NoteActionsType.RemoveSuccess;

  constructor(public payload: number) {}
}

export class RemoveFail implements Action {
  readonly type = NoteActionsType.RemoveFail;

  constructor(public payload: any) {}
}

// --- Remove group --- END

export class OpenEditDialog implements Action {
  readonly type = NoteActionsType.OpenEditDialog;

  constructor(public payload: INote) {}
}

export class DismissEditDialog implements Action {
  readonly type = NoteActionsType.DismissEditDialog;
}

export class DetailsDialog implements Action {
  readonly type = NoteActionsType.DetailsDialog;

  constructor(public payload: INote) {}
}

export type NoteActions =
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
