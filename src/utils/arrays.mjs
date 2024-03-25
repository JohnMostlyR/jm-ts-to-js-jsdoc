import { isArray, hasLength } from './typings.mjs';

/**
 * Returns the last element of an array
 *
 * @param {*[]} input
 * @returns {* | undefined}
 */
export function getLastElement(input) {
  if (isArray(input) === false) return;
  if (hasLength(input) === false) return;

  return input[input.length - 1];
}
