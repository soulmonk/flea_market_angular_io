import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalStorageService} from './local-storage/local-storage.service';
import {NotFoundPageComponent} from './containers/not-found-page';
import {SharedModule} from '@app/shared';
import {LoggerService} from '@app/core/logger.service';
import {LogUpdateService} from '@app/core/log-update.service';
import {CheckForUpdateService} from '@app/core/check-for-update.service';
import {HandleUnrecoverableStateService} from '@app/core/handle-unrecoverable-state.service';

@NgModule({
  imports: [
    // angular
    CommonModule,
    SharedModule,
  ],
  declarations: [NotFoundPageComponent],
  providers: [LogUpdateService, CheckForUpdateService, HandleUnrecoverableStateService]
})

export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    checkForUpdateService: CheckForUpdateService,
    logUpdateService: LogUpdateService,
    handleUnrecoverableStateService: HandleUnrecoverableStateService,
    ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [LocalStorageService, LoggerService],
    };
  }
}
