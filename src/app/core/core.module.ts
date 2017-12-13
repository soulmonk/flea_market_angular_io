import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { AuthEffects } from '@app/core/auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '@app/core/auth/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from '@app/core/not-found/not-found.component';

export function getInitialState() {
  return LocalStorageService.loadInitialState();
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(
      {
        auth: authReducer
      },
      {initialState: getInitialState}
    ),
    EffectsModule.forRoot([AuthEffects])
  ],
  declarations: [NotFoundComponent],
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
