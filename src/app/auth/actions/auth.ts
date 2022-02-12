import {Action} from '@ngrx/store';
import {User, Authenticate, UserTokenResponse} from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFailure = '[Auth] Logout Failure',
  LoginRedirect = '[Auth] Login Redirect',
  RefreshToken = '[Auth] Refresh Token',
  RefreshTokenFailure = '[Auth] Refresh Token Failure',
  GetUserInfo = '[Auth] Get User Info',
  GetUserInfoSuccess = '[Auth] Get User Info Success',
  GetUserInfoFailure = '[Auth] Get User Info Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: UserTokenResponse) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {
  }
}

export class GetUserInfo implements Action {
  readonly type = AuthActionTypes.GetUserInfo;

  constructor(public sync: boolean = false) {
  }
}

export class GetUserInfoSuccess implements Action {
  readonly type = AuthActionTypes.GetUserInfoSuccess;

  constructor(public payload: User) {
  }
}

export class GetUserInfoFailure implements Action {
  readonly type = AuthActionTypes.GetUserInfoFailure;

  constructor(public payload: any) {
  }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;

  constructor(public payload: any) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;

  constructor(public sync: boolean = false) {
  }
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;

  constructor(public sync: boolean = false) {
  }
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LogoutFailure;

  constructor(public sync: boolean = false, public error: any) {
  }
}

export class RefreshToken implements Action {
  readonly type = AuthActionTypes.RefreshToken;

  constructor(public silent: boolean = false) {
  }
}

export class RefreshTokenFailure implements Action {
  readonly type = AuthActionTypes.RefreshTokenFailure;

  constructor(public payload: any) {
  }
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | RefreshToken
  | RefreshTokenFailure
  | GetUserInfo
  | GetUserInfoSuccess
  | GetUserInfoFailure;
