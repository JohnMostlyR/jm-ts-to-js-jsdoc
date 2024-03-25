/*
 * Source file for testing that the program documents interfaces and type aliases
 * at the top of the script, right after all import statement.
 * Interfaces need to be defined before the type aliases.
 */

import * as assert from 'node:assert';

/**
 * @typedef {object} Colorful
 * @property {string} color
 */

/**
 * @typedef {object} Circle
 * @property {number} radius
 */

/**
 * @typedef {Colorful & Circle} ColorfulCircle
 */

/**
 * @constant
 * @type {ColorfulCircle}
 */
const aCircle = { color: 'blue', radius: 42 };

assert(aCircle);
