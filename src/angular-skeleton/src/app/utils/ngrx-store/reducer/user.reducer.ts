import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../action/user.actions';

export const initialState = undefined;

export const userReducer = createReducer(
  initialState,
  on(UserActions.setLoggedInUser, (_actionType, action) => action.payload),
  on(UserActions.resetLoggedInUser, () => undefined),
);
