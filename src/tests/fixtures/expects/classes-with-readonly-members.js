/*
 * Source file for testing that the program documents a class's readonly members.
 */

class Greeter {
    /**
     * @readonly
     * @type {string}
     */
    name = 'world';

    /**
     * @param {string} [otherName]
     */
    constructor(otherName) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
}
