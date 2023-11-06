import { Location } from '@angular/common';
import { Component, OnDestroy, inject, ChangeDetectorRef, signal } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StateService } from '../state/state.service';
import { Effect } from '../state/state.schema';
import { ResizeObserverService } from '../services/resize-observer.service';
import { APP_SELECTOR, IAppStore } from '../ngrx-store';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from '../services/shared.service';
import { uuid } from '../decorators/uuid';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'base',
  standalone: true,
  template: '',
})
@uuid
export abstract class BaseComponent implements OnDestroy {
  sharedService = inject(SharedService);
  location = inject(Location);
  matIconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  changeDetectorRef = inject(ChangeDetectorRef);
  stateService = inject(StateService<AppState>);
  resizeObserverService = inject(ResizeObserverService);
  appStore = inject(Store) as Store<IAppStore>;

  [k: string]: any;

  destroy$ = new Subject<void>();
  subscriptions = new Map<string, Subscription>();

  appState: AppState;

  appSelector = APP_SELECTOR();

  isLoading = signal(false);

  constructor() {
    this.appState = this.stateService.currentState;
    this.stateService.stateChanges$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (changes) => {
        if (changes instanceof Effect) {
          this.appState = changes.newState;
        } else {
          this.appState = changes;
        }
      },
    });
  }

  /**
   * 
   * @param {Array<*>} icons
   * @example
   * registerMatIcons([name: 'icon_sample', url: 'assets/icons/icon_sample.svg']);
   */
  registerMatIcons(icons = []) {
    if (icons.length > 0) {
      icons.forEach(icon => {
        this.matIconRegistry.addSvgIcon(icon.name, this.sanitizer.bypassSecurityTrustResourceUrl(icon.url));
      });
    }
  }

  registerCoreLayer() { }

  registerSignal() { }

  registerResizeObserver() { }

  trackByFn(index: number) {
    return index;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
