import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {appRoutes} from './app.routes';
import {SharedModule} from '@app/shared';
import {CoreModule} from '@app/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsModule} from '@app/settings';
import {AuthModule} from '@app/auth/auth.module';
import {metaReducers, reducers} from '@app/reducers';
import {StoreModule} from '@ngrx/store';
import {
  FullRouterStateSerializer,
  NavigationActionTiming,
  RouterStateSerializer,
  StoreRouterConfig,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import {environment} from '@env';
import {EffectsModule} from '@ngrx/effects';
import {CustomRouterStateSerializer} from '@app/shared/utils';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ServiceWorkerModule} from '@angular/service-worker';
import {NavComponent} from './nav/nav.component';

export const routerStateConfig: StoreRouterConfig = {
  stateKey: 'router', // state-slice name for routing state
  serializer: FullRouterStateSerializer,
  navigationActionTiming: NavigationActionTiming.PostActivation
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'}),
    StoreModule.forRoot(reducers, {metaReducers, runtimeChecks: {strictStateImmutability: true, strictActionImmutability: true}}),

    StoreRouterConnectingModule.forRoot(routerStateConfig),

    EffectsModule.forRoot([]),
    // !environment.production ? StoreDevtoolsModule.instrument() : {},
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    // core & shared
    CoreModule.forRoot(),
    SharedModule,
    AuthModule.forRoot(),

    SettingsModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  declarations: [
    AppComponent,
    NavComponent
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
