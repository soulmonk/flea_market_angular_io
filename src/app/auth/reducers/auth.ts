import { AuthActions, AuthActionTypes } from './../actions/auth';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.GetUserInfoSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      }
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
      };
    }

    case AuthActionTypes.GetUserInfoFailure:
    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
