/*
 * Source file for testing that the program does not modify the presence, or absence, of
 * a dash between name and comments.
 */

/**
 * A function
 * @param {string} p1 description a
 * @param {string} p2 - description b
 * @returns {number} the return type
 */
function aFunction(p1, p2) {
    return 1;
}
