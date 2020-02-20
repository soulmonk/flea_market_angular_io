import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router'
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect(state.url));
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
