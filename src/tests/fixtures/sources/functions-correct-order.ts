/*
 * Source file for testing that the program correctly places `@param`
 * tags before the `@returns` tag.
 */

/**
 * A function
 * @returns {number}
 * @param {string} param - A parameter
 */
function aFunction(param: string): number {
  return 1;
}
