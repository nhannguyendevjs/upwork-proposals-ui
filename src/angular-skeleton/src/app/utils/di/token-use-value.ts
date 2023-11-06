import { InjectionToken, Provider } from '@angular/core';

export interface Token {
  readonly value: any;
}

/**
 * @example
 * {
 * ...
 * tokenValue = inject(TOKEN).value;
 * ...
 * }
 */
export const TOKEN = new InjectionToken<Token>('');

/**
 * @param {Token} useValue
 * @returns {Provider}
 * @example
 * {
 * ...
 * providers: [provideToken({ value: 'TOKEN VALUE' })],
 * ...
 * }
 */
export const provideToken = (useValue: Token): Provider => {
  return {
    provide: TOKEN,
    useValue,
  };
};
