import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {LocalStorageService, Action} from '@app/core';

import {SETTINGS_KEY, SETTINGS_CHANGE_THEME} from './settings.reducer';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService
  ) {}

  persistThemeSettings(): Observable<Action> {
    return createEffect(() => this.actions$.pipe(
      ofType(SETTINGS_CHANGE_THEME),
      tap((action: Action) =>
        this.localStorageService.setItem(SETTINGS_KEY, {
          theme: action.payload
        })
      )
    ), { dispatch: false });
  }
}
