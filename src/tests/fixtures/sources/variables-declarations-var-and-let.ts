/*
 * Source file for testing that the program documents `var` and `let` variables.
 */

let a = undefined;
let b = null;
let c = true;
let d = false;
let e = 42;
let f = 'foo';
let g = [];
let h = [1, 2, '3'];
let i = {};
let j = { foo: 'bar' };
let k = /test/;
let l = new RegExp('');
let m = new Date();
let n = function () {
  /* empty */
};
let o = () => {};

let p: boolean;
let q: number;
let r: string;
let s: Array<number | string>;
let t: object;
let u: RegExp;
let v: Function;

// TODO: implement MyClass
let w: MyClass;

/** @constant {number} */
var ONE = 1;
