/*
 * Source file for testing that the program documents a parameter's default value.
 */

/**
 * @typedef {(p: any) => number} MyFunc
 */

/**
 * @param {string} p1
 * @param {number} [p2]
 * @param {string} [p3='defaultValue']
 * @returns {number}
 */
function aFunction(p1, p2, p3 = 'defaultValue') {
    return 1;
}

/**
 * @param {string} q1
 * @param {boolean} [q2=false]
 * @param {number} [q3=123]
 * @returns {number}
 */
function bFunction(q1, q2 = false, q3 = 123) {
    return 2;
}

/**
 * @param {*} p
 * @returns {number}
 */
function myFunc(p) {
    return 0;
}

/**
 * @param {MyFunc} [f1=myFunc]
 * @param {MyFunc} [f2=(p: any) => 0]
 * @param {MyFunc} [f3=(p: any) => {
 *     myFunc(1);
 *     return 0;
 *   }]
 * @returns {number}
 */
function cFunction(f1 = myFunc, f2 = (p) => 0, f3 = (p) => {
    myFunc(1);
    return 0;
}) {
    return 3;
}
