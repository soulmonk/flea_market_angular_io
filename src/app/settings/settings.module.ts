import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { StoreConfig, StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { SharedModule } from '../shared'

import * as fromReducer from './settings.reducer'
import { SETTINGS_KEY } from './settings.reducer'
import { SettingsEffects } from './settings.effects'
import { SettingsComponent } from './settings/settings.component'
import { LocalStorageService } from '@app/core'

// Setting configuration
export const SETTINGS_CONFIG_TOKEN = new InjectionToken<StoreConfig<fromReducer.State>>(
  'Settings Config')

export function getConfig (localStorageService: LocalStorageService): StoreConfig<fromReducer.State> {
  // return the config synchronously.
  return {
    initialState: localStorageService.getItem(SETTINGS_KEY) ||
      fromReducer.initialState,
  }
}

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('settings', fromReducer.settingsReducer,
      SETTINGS_CONFIG_TOKEN),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {
  static forRoot (): ModuleWithProviders<SettingsModule> {
    return {
      ngModule: SettingsModule,
      providers: [
        {
          provide: SETTINGS_CONFIG_TOKEN,
          deps: [LocalStorageService],
          useFactory: getConfig,
        },
      ],
    }
  }
}
