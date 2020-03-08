import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators'

import { AuthService } from '../services/auth.service'
import {
  AuthActionTypes,
  GetUserInfo,
  GetUserInfoFailure,
  GetUserInfoSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LogoutFailure,
  LogoutSuccess,
  RefreshToken,
  RefreshTokenFailure,
} from '../actions/auth'
import { Authenticate } from '../models/user'
import { fromEvent, of, timer } from 'rxjs'

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService.login(auth).pipe(
        map((response) => new LoginSuccess(response)),
        catchError(error => of(new LoginFailure(error))),
      ),
    ),
  )

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap((login: LoginSuccess) => {
      this.authService.setToken(login.payload.token)
      localStorage.setItem('login', Date.now().toString())
      // TODO redirect only from login page
      // this.router.navigate(['/'])
    }),
    map(() => new GetUserInfo()),
  )

  @Effect()
  autoRefreshToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    switchMap((login: LoginSuccess) => {
      // TODO vs parse token
      // JSON.parse(atob(decodeURIComponent(login.payload.token.split('.')[1])))
      return timer(login.payload.expiresIn * 1000).
        pipe(
          takeUntil(this.actions$.pipe(ofType(AuthActionTypes.Logout))),
          map(() => new RefreshToken()),
        )
    }),
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    tap(() => {
      this.router.navigate(['/login'])
    }),
  )

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    exhaustMap((sync) =>
      this.authService.logout().pipe(
        map(() => new LogoutSuccess(sync)),
        catchError(error => of(new LogoutFailure(sync, error))),
      ),
    ),
  )

  @Effect({ dispatch: false })
  logoutDone$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutSuccess, AuthActionTypes.LogoutFailure),
    tap(sync => {
      this.authService.setToken(null)
      if (sync) {
        return
      }
      localStorage.setItem('logout', Date.now().toString())
    }),
  )

  @Effect()
  loginGetStatus$ = this.actions$.pipe(
    ofType(AuthActionTypes.GetUserInfo),
    exhaustMap(() =>
      this.authService.me().pipe(
        map((response) => new GetUserInfoSuccess(response)),
        catchError(error => of(new GetUserInfoFailure(error))),
      ),
    ),
  )
  @Effect()
  refreshToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.RefreshToken),
    exhaustMap(() =>
      this.authService.refreshToken().pipe(
        map((response) => new LoginSuccess(response)),
        catchError(error => of(new RefreshTokenFailure(error))),
      ),
    ),
  )

  // Todo tbd
  @Effect()
  logoutSync$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((event: StorageEvent) => event.key === 'logout'),
    map(() => new Logout(true)),
  )

  // Todo tbd
  @Effect()
  loginSync$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((event: StorageEvent) => event.key === 'login'),
    map(() => new GetUserInfo(true)),
  )

  constructor (
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
