import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LoginPageComponent} from './containers/login-page.component';
import {LoginFormComponent} from './components/login-form.component';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {AuthEffects} from './effects/auth.effects';
import {reducers} from './reducers';
import {SharedModule} from '../shared';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '@app/auth/services/token.interceptor';
import {ErrorInterceptor} from '@app/auth/services/error.interceptor';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<RootAuthModule> {
    return {
      ngModule: RootAuthModule, // tslint:disable-line:no-use-before-declare
      providers: [
        AuthService,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        }, {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild([{path: 'login', component: LoginPageComponent}]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule {}
