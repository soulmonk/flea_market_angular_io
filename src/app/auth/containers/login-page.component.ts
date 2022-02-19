import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Authenticate} from '../models/user';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';

@Component({
  template: `
    <ndfsm-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </ndfsm-login-form>
  `,
  styles: [],
})
export class LoginPageComponent {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Login($event));
  }
}
