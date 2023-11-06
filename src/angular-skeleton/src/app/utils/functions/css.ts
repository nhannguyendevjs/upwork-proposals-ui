/**
 * @function
 * @param {string} name
 * @param {*} value
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @example
 * setRootProperty('--custom-variable', 'white');
 */
export const setRootProperty = (name, value) => {
  document.documentElement.style.setProperty(`${name}`, value);
};
