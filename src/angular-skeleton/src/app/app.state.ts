import { GLOBAL_SETTINGS } from './global-settings';

export interface AppState {
  production: boolean;
  version: string;
  language: string;
  linkActivated: string;
  worker: Worker;
}

export const INITIAL_STATE = {
  production: GLOBAL_SETTINGS.production,
  version: GLOBAL_SETTINGS.version,
  language: GLOBAL_SETTINGS.language,
  linkActivated: undefined,
  worker: undefined,
} as const;
