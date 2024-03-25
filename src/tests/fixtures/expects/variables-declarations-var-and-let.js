/*
 * Source file for testing that the program documents `var` and `let` variables.
 */

/**
 * @type {*}
 */
let a = undefined;
/**
 * @type {*}
 */
let b = null;
/**
 * @type {boolean}
 */
let c = true;
/**
 * @type {boolean}
 */
let d = false;
/**
 * @type {number}
 */
let e = 42;
/**
 * @type {string}
 */
let f = 'foo';
/**
 * @type {*[]}
 */
let g = [];
/**
 * @type {(string | number)[]}
 */
let h = [1, 2, '3'];
/**
 * @type {{}}
 */
let i = {};
/**
 * @type {{ foo: string; }}
 */
let j = { foo: 'bar' };
/**
 * @type {RegExp}
 */
let k = /test/;
/**
 * @type {RegExp}
 */
let l = new RegExp('');
/**
 * @type {Date}
 */
let m = new Date();
let n = function () {
    /* empty */
};
let o = () => { };

/**
 * @type {boolean}
 */
let p;
/**
 * @type {number}
 */
let q;
/**
 * @type {string}
 */
let r;
/**
 * @type {(number | string)[]}
 */
let s;
/**
 * @type {object}
 */
let t;
/**
 * @type {RegExp}
 */
let u;
/**
 * @type {Function}
 */
let v;

// TODO: implement MyClass
/**
 * @type {MyClass}
 */
let w;

/** @constant {number} */
var ONE = 1;
