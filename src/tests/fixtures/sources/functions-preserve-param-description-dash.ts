/*
 * Source file for testing that the program does not modify the presence, or absence, of
 * a dash between name and comments.
 */

/**
 * A function
 * @param p1 description a
 * @param p2 - description b
 * @returns {number} the return type
 */
function aFunction(p1: string, p2: string): number {
  return 1;
}
