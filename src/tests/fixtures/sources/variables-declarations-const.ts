/*
 * Source file for testing that the program does not add documentation to `const` variables.
 */

const foo = 'foo';
const bar: string = 'bar';

/**
 * Baz
 */
const baz: boolean = true;

/**
 * Quux
 * @constant
 * @type {number}
 */
const quux: number = 1;

class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

const p1 = new Employee();

const p2: Person = new Employee();
