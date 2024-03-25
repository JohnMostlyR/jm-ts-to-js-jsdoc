/*
 * Source file for testing that the program documents a class's readonly members.
 */

class Greeter {
  readonly name: string = 'world';

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
}
