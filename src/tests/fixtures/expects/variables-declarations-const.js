/*
 * Source file for testing that the program does not add documentation to `const` variables.
 */

const foo = 'foo';
/**
 * @type {string}
 */
const bar = 'bar';

/**
 * Baz
 * @type {boolean}
 */
const baz = true;

/**
 * Quux
 * @constant
 * @type {number}
 */
const quux = 1;

class Person {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {number}
     */
    age;
}

class Employee {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {number}
     */
    age;
    /**
     * @type {number}
     */
    salary;
}

const p1 = new Employee();

/**
 * @type {Person}
 */
const p2 = new Employee();
