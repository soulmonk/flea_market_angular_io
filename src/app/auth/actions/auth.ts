import { Action } from '@ngrx/store';
import {User, Authenticate, UserTokenResponse} from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  GetUserInfo = '[Auth] Get User Info',
  GetUserInfoSuccess = '[Auth] Get User Info Success',
  GetUserInfoFailure = '[Auth] Get User Info Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: UserTokenResponse ) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class GetUserInfo implements Action {
  readonly type = AuthActionTypes.GetUserInfo;
}

export class GetUserInfoSuccess implements Action {
  readonly type = AuthActionTypes.GetUserInfoSuccess;
  constructor(public payload: User) {}
}

export class GetUserInfoFailure implements Action {
  readonly type = AuthActionTypes.GetUserInfoFailure;
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
  | GetUserInfo
  | GetUserInfoSuccess
  | GetUserInfoFailure;
