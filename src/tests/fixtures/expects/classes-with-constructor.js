/*
 * Source file for testing that the program documents a class with a constructor.
 */

class Point {
    /**
     * @type {number}
     */
    x;
    /**
     * @type {number}
     */
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
