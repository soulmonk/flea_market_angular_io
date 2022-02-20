import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Action, LocalStorageService} from '@app/core';

import {actionChangeTheme, SETTINGS_CHANGE_THEME, SETTINGS_KEY, SETTINGS_LOAD_THEME, SETTINGS_LOAD_THEME_ERROR} from './settings.reducer';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService
  ) {}

  loadThemeSettings$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SETTINGS_LOAD_THEME),
    map(() => {
      const savedTheme = this.localStorageService.getItem(SETTINGS_KEY);
      if (savedTheme) {
        return actionChangeTheme(savedTheme.theme);
      }
      return {type: SETTINGS_LOAD_THEME_ERROR};
    }),
  ));

  persistThemeSettings$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SETTINGS_CHANGE_THEME),
    tap((action: Action) => {
        return this.localStorageService.setItem(SETTINGS_KEY, {
          theme: action.payload
        });
      }
    )
  ), {dispatch: false});
}
