/*
 * Source file for testing that the program corrects the type for an existing `@returns` tag
 */

/**
 * A function
 * @param {string} [param]
 * @returns {string} This should become a `number` type
 */
function aFunction(param?: string): number {
  return 1;
}
