/*
 * Source file for testing that the program documents interfaces and type aliases
 * at the top of the script, right after all import statement.
 * Interfaces need to be defined before the type aliases.
 */

import * as assert from 'node:assert';

/**
 * @constant
 * @type {ColorfulCircle}
 */
const aCircle: ColorfulCircle = { color: 'blue', radius: 42 };

assert(aCircle);

type ColorfulCircle = Colorful & Circle;

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}
