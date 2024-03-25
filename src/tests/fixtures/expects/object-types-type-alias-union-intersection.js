/*
 * Source file for testing that the program documents treats Object Literal union and
 * intersection as regular aliases.
 */

/**
 * @typedef {{ a: number } & { b: string }} Intersection
 */

/**
 * @typedef {{ a: string } | { a: number }} Union
 */
