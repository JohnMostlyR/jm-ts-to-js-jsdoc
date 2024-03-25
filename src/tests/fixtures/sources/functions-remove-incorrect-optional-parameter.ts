/*
 * Source file for testing that the program removes incorrect optional parameter indicators.
 */

/**
 * A function
 * @param {string} [param] - A not so optional parameter
 */
function aFunction(param: string): number {
  return 1;
}
