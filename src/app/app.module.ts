import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {appRoutes} from './app.routes';
import {SharedModule} from '@app/shared';
import {CoreModule} from '@app/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsModule} from '@app/settings';
import {AuthModule} from '@app/auth/auth.module';
import {metaReducers, reducers} from '@app/reducers';
import {StoreModule} from '@ngrx/store';
import {RouterStateSerializer, StoreRouterConnectingModule, DefaultRouterStateSerializer} from '@ngrx/router-store';
import {environment} from '@env';
import {EffectsModule} from '@ngrx/effects';
import {CustomRouterStateSerializer} from '@app/shared/utils';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ServiceWorkerModule} from '@angular/service-worker';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers, {metaReducers, runtimeChecks: {strictStateImmutability: true, strictActionImmutability: true}}),

    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),

    EffectsModule.forRoot([]),
    // !environment.production ? StoreDevtoolsModule.instrument() : {},

    // core & shared
    CoreModule,
    SharedModule,
    AuthModule.forRoot(),

    SettingsModule,

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
