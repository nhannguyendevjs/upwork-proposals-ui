import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { takeUntil, timer } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseComponent } from './utils/abstract/base.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    TranslocoModule,
    MatProgressBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  #swUpdate = inject(SwUpdate);
  #translocoService = inject(TranslocoService);
  #router = inject(Router);

  isShowLoadingBar = signal(false);

  constructor() {
    super();

    this.registerMatIcons([
      {
        name: 'compost',
        url: 'assets/mat-icons/compost.svg',
      },
      {
        name: 'eco',
        url: 'assets/mat-icons/eco.svg',
      },
      {
        name: 'image',
        url: 'assets/mat-icons/image.svg',
      },
    ]);
  }

  ngOnInit() {
    this.registerAppWebWorker();
    this.registerRouterEvents();
    this.registerServiceWorkerUpgrade();
    this.detectLocalLanguage();
    this.registerSharedActions();
  }

  registerAppWebWorker() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./utils/web-workers/app.worker', import.meta.url));
      { // Register App Worker events
        worker.onmessage = ({ data }) => {
          console.log(data);
        }
        worker.postMessage('Angular app has been successfully launched.');
      }
      { // Init App State worker
        this.appState.worker = worker;
        this.stateService.commit(this.appState);
      }
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log('Sorry! No Web Worker support.');
    }
  }

  registerRouterEvents() {
    this.#router.events.pipe(takeUntil(this.destroy$)).subscribe(navigationEvent => {
      if (navigationEvent instanceof NavigationStart) {
        // TODO
        // ...
      }
    });
  }

  registerServiceWorkerUpgrade() {
    if (this.#swUpdate.isEnabled) {
      timer(0, 30000).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.#swUpdate.checkForUpdate().then(res => {
          if (res) {
            if (confirm('A new version is available, do you want to load it?')) {
              window.location.reload();
            }
          }
        });
      });
    }
  }

  detectLocalLanguage() {
    const language = localStorage.getItem('language') ?? environment.language;
    this.appState.language = language;
    this.stateService.commit(this.appState);
    this.#translocoService.setActiveLang(language);
    this.#translocoService.setFallbackLangForMissingTranslation({ fallbackLang: 'en' });
  }

  registerSharedActions() {
    this.sharedService.sharedData$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      switch (res.action) {
        case 'show-loading-bar':
          this.isShowLoadingBar.set(true);
          break;
        case 'hide-loading-bar':
          this.isShowLoadingBar.set(false);
          break;
        default:
          break;
      }
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();

    { // Destroy App State - worker
      if (this.appState.worker) {
        this.appState.worker.terminate();
        this.appState.worker = undefined;
        this.stateService.commit(this.appState);
      }
    }
  }
}
