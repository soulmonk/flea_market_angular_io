import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';
import {AuthActionTypes, Login, LoginFailure, LoginGetStatusFailure, LoginGetStatusSuccess, LoginSuccess} from '../actions/auth';
import {Authenticate} from '../models/user';
import {of} from 'rxjs';

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
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap((login: LoginSuccess) => {
      localStorage.setItem('token', login.payload.token);
      this.router.navigate(['/']);
    }),
  );

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }),
  );

  @Effect()
  loginGetStatus$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginGetStatus),
    exhaustMap(() =>
      this.authService.me().pipe(
        map((response) => new LoginSuccess(response)),
        catchError(error => of(new LoginGetStatusFailure(error))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
