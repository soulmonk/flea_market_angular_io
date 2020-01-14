import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundPageComponent } from './containers/not-found-page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

export function getInitialState() {
  return LocalStorageService.loadInitialState();
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,

    // ngrx
    StoreModule.forRoot(
      {initialState: getInitialState}, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }}
    ),
  ],
  declarations: [NotFoundPageComponent],
  providers: [LocalStorageService]
})

export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
