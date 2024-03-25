/*
 * Source file for testing that the program documents a class's protected members.
 */

class Greeter {
  public greet() {
    console.log(`Hello, ${this.getName()}`);
  }

  protected getName() {
    return 'hi';
  }
}

class LocalGreeter extends Greeter {
  public howdy() {
    console.log(`Howdy, ${this.getName()}`);
  }
}
