import { Action } from '@ngrx/store';
import {User, Authenticate, UserAuthResponse} from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  LoginGetStatus = '[Auth] Login Get Status',
  LoginGetStatusSuccess = '[Auth] Login Get Status Success',
  LoginGetStatusFailure = '[Auth] Login Get Status Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: UserAuthResponse ) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginGetStatus implements Action {
  readonly type = AuthActionTypes.LoginGetStatus;
}

export class LoginGetStatusSuccess implements Action {
  readonly type = AuthActionTypes.LoginGetStatusSuccess;
  constructor(public payload: User) {}
}

export class LoginGetStatusFailure implements Action {
  readonly type = AuthActionTypes.LoginGetStatusFailure;
  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | LoginGetStatus
  | LoginGetStatusSuccess
  | LoginGetStatusFailure;
