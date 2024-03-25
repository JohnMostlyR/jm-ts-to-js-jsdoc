/*
 * Source file for testing that the program documents generator functions
 */

function* generator(i: number): Generator<number> {
  yield i;
  yield i + 10;
}
