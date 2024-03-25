// @ts-nocheck

/*
 * Examples taken from https://www.typescriptlang.org/docs/handbook/2/classes.html
 */

class BasicClass {}

class PointWithFields {
  x: number;
  y: number;
}

class PointWithInitializers {
  x = 0;
  y = 0;
}

/* readonly */

class Greeter {
  readonly name: string = 'world';

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }
}

/* Constructors */

class PointWithConstructor {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

/* Methods */

class PointWIthMethods {
  x = 10;
  y = 10;

  /* some comment */ scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

/* Getters / Setters */

class C {
  _length = 0;

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }
}

/* accessors with different types for getting and setting */

class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}

/* Index Signatures */

class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}

/* Class Heritage */

/* implements */

interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log('ping!');
  }
}

/* extends */

class Animal {
  move() {
    console.log('Moving along!');
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log('woof!');
    }
  }
}

/* Member Visibility */

class GreeterTwo {
  public greet() {
    console.log('Hello, ' + this.getName());
  }

  protected getName() {
    return 'hi';
  }
}

class MyClassWithPrivateMember {
  private x = 0;
}

class MyClassWithStaticMember {
  static x = 0;
}

class MyClassWithPrivateAndStaticMember {
  private static x = 0;
}

/* Static blocks */

class Foo {
  static #count = 0;

  get count() {
    return Foo.#count;
  }

  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.#count += lastInstances.length;
    } catch {}
  }
}

/* Generic Classes */

class Box<Type> {
  contents: Type;

  constructor(value: Type) {
    this.contents = value;
  }
}

/* Parameter Properties */

class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}

/* Class Expressions */

const someClass = class<Type> {
  content: Type;

  constructor(value: Type) {
    this.content = value;
  }
};

/* abstract Classes and Members */

abstract class Base {
  abstract getName(): string;

  printName() {
    console.log(`Hello, ${this.getName()}`);
  }
}

/* Relationships Between Classes */

class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

// OK
const p: Person = new Employee();

/* Abstract Classes */

abstract class AbstractAnimal {
  abstract getName(): string;

  printName() {
    console.log(`Hello, ${this.getName()}`);
  }
}
