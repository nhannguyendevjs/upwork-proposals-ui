import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { STATE_CONFIGS } from './state.configs';
import { Effect, CommitFn, SideEffectFn, StateGetterFn, StateSetterFn } from './state.schema';
import { cloneDeep, merge } from './state.utility';

@Injectable({
  providedIn: 'root'
})
export class StateService<T> implements OnDestroy {
  #state: T & any;

  #dataSource$: Subject<Effect<T> | T> = new Subject<Effect<T> | T>();
  stateChanges$: Observable<Effect<T> | T> = this.#dataSource$.asObservable();

  get currentState(): T {
    return cloneDeep(this.#state);
  }

  #stateConfigs = inject(STATE_CONFIGS);

  constructor() {
    this.#state = new Proxy(this.#stateConfigs.initialState, {
      get: this.#stateGetter.bind(this),
      set: this.#stateSetter.bind(this),
    });
  }

  #sideEffect: SideEffectFn<T> = (key, value, newState) => {
    this.#dataSource$.next(new Effect<T>(key, value, newState));
  }

  #stateGetter: StateGetterFn<T> = (target, key, receiver) => {
    return Reflect.get(target, key, receiver);
  }

  #stateSetter: StateSetterFn<T> = (target, key, receiver) => {
    if (key in target && target[key] !== receiver) {
      Reflect.set(target, key, receiver);
      this.#sideEffect(key, receiver, this.currentState);
    }
    return true;
  }

  commit: CommitFn<T> = (changes: Partial<T>) => {
    let commitState = cloneDeep(this.#state);

    commitState = merge<T>(commitState, changes);
    Object.keys(commitState).forEach(key => {
      (this.#state)[key] = (commitState)[key];
    });
  }

  ngOnDestroy() {
    this.#dataSource$.complete();
  }
}
