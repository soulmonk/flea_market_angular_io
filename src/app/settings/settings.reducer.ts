import {Action} from '@app/core';

export interface State {
  theme: string;
}

export const initialState: State = {
  theme: 'DEFAULT-THEME'
};

export const SETTINGS_KEY = 'SETTINGS';
export const SETTINGS_CHANGE_THEME = 'SETTINGS_CHANGE_THEME';
export const SETTINGS_LOAD_THEME = 'SETTINGS_LOAD_THEME';

export const actionChangeTheme = (theme: string) => ({
  type: SETTINGS_CHANGE_THEME,
  payload: theme
});

export const selectorSettings = state => state.settings || {theme: ''};

export function settingsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SETTINGS_CHANGE_THEME:
      return {theme: action.payload};

    default:
      return state;
  }
}
