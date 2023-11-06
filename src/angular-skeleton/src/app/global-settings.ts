import { environment } from '../environments/environment';

export const GLOBAL_SETTINGS = {
  production: environment.production,
  version: environment.version,
  language: environment.language,
} as const;
