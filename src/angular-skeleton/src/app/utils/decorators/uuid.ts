export function uuid(constructor: Function) {
  constructor.prototype.uuid = Date.now();
}
