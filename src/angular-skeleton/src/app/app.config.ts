import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { AppInterceptor } from './app.interceptor';
import { provideStore } from '@ngrx/store';
import { INITIAL_STATE } from './app.state';
import { environment } from '../environments/environment';
import { provideStateConfigs } from './utils/state';
import { APP_STORE } from './utils/ngrx-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([AppInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'vi'],
        defaultLang: environment.language,
        fallbackLang: environment.language,
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      },
      loader: TranslocoHttpLoader
    }),
    provideStateConfigs({ initialState: INITIAL_STATE }),
    provideStore(APP_STORE),
  ]
};
