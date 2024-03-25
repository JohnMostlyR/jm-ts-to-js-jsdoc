/*
 * Source file for testing that the program documents a parameter's default value.
 */

function aFunction(
  p1: string,
  p2?: number,
  p3: string = 'defaultValue'
): number {
  return 1;
}

function bFunction(q1: string, q2: boolean = false, q3: number = 123): number {
  return 2;
}

type MyFunc = (p: any) => number;

function myFunc(p: any) {
  return 0;
}

function cFunction(
  f1: MyFunc = myFunc,
  f2: MyFunc = (p: any) => 0,
  f3: MyFunc = (p: any) => {
    myFunc(1);
    return 0;
  }
): number {
  return 3;
}
