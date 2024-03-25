// @ts-nocheck

/*
 * Exmaples taken from https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions
 */

/* Generic Functions */

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

/**
 * Inference
 */
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

/**
 * Constraints
 */
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

/* Function Overloads */

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

// The inferred return type is void
function noop() {
  return;
}

function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  return a;
}

function fail(msg: string): never {
  throw new Error(msg);
}

function doSomething(f: Function) {
  return f(1, 2, 3);
}

/* Rest Parameters and Arguments */

function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

/* Parameter Destructuring */

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

/* Assignability of Functions */

type voidFunc = () => void;

const func1: voidFunc = () => {
  return true;
};

const func2: voidFunc = () => true;

const func3: voidFunc = function () {
  return true;
};
