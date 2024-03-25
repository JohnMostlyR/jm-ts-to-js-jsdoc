/*
 * Source file for testing that the program documents generator functions
 */

/**
 * @param {number} i
 * @returns {Generator<number>}
 */
function* generator(i) {
    yield i;
    yield i + 10;
}
