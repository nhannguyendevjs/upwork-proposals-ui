import { userReducer } from './reducer/user.reducer';

export const APP_STORE = {
  user: userReducer,
} as const;
2
