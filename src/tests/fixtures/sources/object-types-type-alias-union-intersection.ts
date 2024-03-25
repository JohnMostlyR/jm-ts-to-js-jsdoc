/*
 * Source file for testing that the program documents treats Object Literal union and
 * intersection as regular aliases.
 */

type Intersection = { a: number } & { b: string };
type Union = { a: string } | { a: number };
