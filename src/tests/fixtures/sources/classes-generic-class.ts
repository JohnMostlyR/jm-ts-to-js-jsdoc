/*
 * Source file for testing that the program documents Generic Classes
 */

class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
