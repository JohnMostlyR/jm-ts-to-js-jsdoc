/*
 * Source file for testing that the program documents a class's methods.
 */

class Point {
    x = 10;
    y = 10;

    /**
     * @param {number} n
     */
    scale(n) {
        this.x *= n;
        this.y *= n;
    }
}
