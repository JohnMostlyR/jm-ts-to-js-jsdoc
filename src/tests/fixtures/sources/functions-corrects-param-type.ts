/*
 * Source file for testing that the program corrects the type for an existing `@param` tag
 */

/**
 * A function
 * @param {number} param - This should be of type string and optional.
 */
function aFunction(param?: string): number {
  return 1;
}
