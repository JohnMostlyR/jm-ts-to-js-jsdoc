/**
 * @module Typings
 * @description A set of utilities with regard to typings.
 */

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter of type `undefined`.
 * Otherwise `false`.
 */
export function isUndefined(parameter) {
  return typeof parameter === 'undefined';
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is `undefined` or `null`.
 * Otherwise `false`.
 */
export function isUndefinedOrNull(parameter) {
  return isUndefined(parameter) || parameter === null;
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is defined.
 * Otherwise `false`.
 */
export function isDefined(parameter) {
  return !isUndefinedOrNull(parameter);
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is a `Boolean`.
 * Otherwise `false`.
 */
export function isBoolean(parameter) {
  return parameter === true || parameter === false;
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is a `Number`.
 * Otherwise `false`.
 */
export function isNumber(parameter) {
  return typeof parameter === 'number' && !Number.isNaN(parameter);
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter of type `String`.
 * Otherwise `false`.
 */
export function isString(parameter) {
  return typeof parameter === 'string';
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is an `Array`.
 * Otherwise `false`.
 */
export function isArray(parameter) {
  return Array.isArray(parameter);
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is of type `Object` but
 * __not__ `Null`, `Array`, `RegExp` or `Date`.
 */
export function isObject(parameter) {
  return (
    typeof parameter === 'object' &&
    parameter !== null &&
    !Array.isArray(parameter) &&
    !(parameter instanceof RegExp) &&
    !(parameter instanceof Date)
  );
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is an empty Object.
 * Otherwise `false`.
 */
export function isEmptyObject(parameter) {
  if (!isObject(parameter)) {
    return false;
  }

  for (const key of Object.keys(parameter)) {
    if (Object.hasOwn(parameter, key)) {
      return false;
    }
  }

  return true;
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is of type `RegExp`.
 */
export function isRegExp(parameter) {
  return (
    typeof parameter === 'object' &&
    parameter !== null &&
    parameter instanceof RegExp
  );
}

/**
 * @param {*} parameter
 * @returns {boolean} `true` if the provided parameter is of type `Function`.
 * Otherwise `false`.
 */
export function isFunction(parameter) {
  return typeof parameter === 'function';
}

/**
 * @example
 * ```javascript
 * castAsBooleanIfPossible(); // false
 * castAsBooleanIfPossible(0); // false
 * castAsBooleanIfPossible(1); // true
 * castAsBooleanIfPossible('0'); // false
 * castAsBooleanIfPossible('1'); // true
 * castAsBooleanIfPossible('false'); // false
 * castAsBooleanIfPossible('true'); // true
 * castAsBooleanIfPossible('just a string'); // 'just a string'
 * ```
 * @param {*} value
 * @returns {boolean|*} Casts value as a boolean if it makes sense. Returns the
 * value as-is otherwise.
 */
export function castAsBooleanIfPossible(value) {
  if (isUndefinedOrNull(value)) {
    return false;
  }

  if (isBoolean(value)) {
    return value;
  }

  if (isNumber(value)) {
    if (value === 0) return false;
    if (value === 1) return true;
    return value;
  }

  if (isString(value)) {
    if (value === '0') return false;
    if (value === '1') return true;
    if (value === 'false') return false;
    if (value === 'true') return true;
  }

  return value;
}

/**
 * @param {*} value
 * @returns {boolean} `true` if value has any length, `false` otherwise
 */
export function hasLength(value) {
  return value?.length > 0;
}
