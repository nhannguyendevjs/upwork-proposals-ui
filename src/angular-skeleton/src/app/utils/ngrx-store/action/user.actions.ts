import { createAction } from '@ngrx/store';
import { actionFactory } from '../factory/action.factory';
import { User } from '../../schemas/user.schema';

export const setLoggedInUser = createAction('[User Logged In] Set', user => actionFactory<User>(user));
export const resetLoggedInUser = createAction('[User Logged In] Reset', () => actionFactory());
