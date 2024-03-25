/*
 * Source file for testing that the program documents a class's methods.
 */

class Point {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
