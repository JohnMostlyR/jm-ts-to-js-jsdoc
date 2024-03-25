# Functional description

## TLDR;

- preserves blank lines.
- preserves type-only imports.

Object types

- documents an intersection type.
- removes any comments from a type alias (this becomes problematic when transpiled to JSDoc).
- removes any comments from object properties (this becomes problematic when transpiled to JSDoc).

Interfaces

- documents an interface.
- documents an interface's optional properties.
- documents an interface's readonly properties.
- documents a generic interface.

Type aliases

- documents a type alias
- preserves property comments
- treats object literal union and intersection as regular aliases

Functions

- documents a function declaration.
- documents an optional parameter.
- documents a parameter's default value.
- documents rest parameters.
- documents an inferred return type.
- documents a generic function.
- references the return type.

Handling of existing JSDoc

- replaces a tag's name synonym with the common name.
- corrects the order of existing tags.
- corrects the type for an existing `@param` tag when necessary.
- corrects the type for an existing `@returns` tag when necessary.
- removes tags for non-existing parameters.
- removes optional parameter indicators for a parameter that is not optional.
- removes comments from type arguments.

Variable declarations

- documents the correct type for `let` and `var` declarations.
- only adds type documentation to `const` declarations when a type is specified.
- documents variables containing a function expression.
- documents variables containing an arrow function expression.

Classes

- documents a generic class.
- documents a class that implements an interface.

class members

- documents a class's constructor.
- documents a class's methods.
- documents properties that have initializers.
- should NOT document properties that have initializers where the type is inferred.

property modifier

- documents a readonly member.
- documents a public member.
- documents a protected member.
- documents a private member.

## Variables

### Documents `var`, `const` and `let` variables

example with `let`:

Input:

```ts
/** Foo */
let foo: string = 'foo';
```

Output:

```js
/**
 * Foo
 *
 * @type {string}
 */
let foo = 'foo';
```

example with `const`:

Input:

```ts
/** Bar */
const bar: number = 1;
```

Output:

```js
/**
 * Bar
 *
 * @type {number}
 */
const bar = 1;
```

example with `var`:

Input:

```ts
/** Baz */
var baz: boolean = true;
```

Output:

```js
/**
 * Baz
 *
 * @type {boolean}
 */
var baz = true;
```

### Documents variables without initializers

example:

Input:

```ts
/** Foo */
let foo: string;
```

Output:

```js
/**
 * Foo
 *
 * @type {string}
 */
let foo;
```

### Create an `@type` tag when `@const` is present without a documented type

example:

Input:

```ts
/**
 * Foo
 *
 * @const
 */
const foo: string = 'foo';
```

Output:

```js
/**
 * Foo
 *
 * @const
 * @type {string}
 */
const foo = 'foo';
```

### Does not create `@type` tag when a `@const` tag is present with a documented type

example:

Input:

```ts
/**
 * Foo
 *
 * @const {string}
 */
const foo = 'foo';
```

Output:

```js
/**
 * Foo
 *
 * @const {string}
 */
const foo = 'foo';
```

### Only generates documentation for top-level variable declarations

example:

Input:

```ts
/**
 * Foo
 */
const foo: string = 'foo';
{
  /**
   * Bar
   */
  const bar: string = 'bar';
}
```

Output:

```js
/**
 * Foo
 *
 * @type {string}
 */
const foo = 'foo';
{
  /**
   * Bar
   */
  const bar = 'bar';
}
```

### Does not overwrite existing tags

example:

Input:

```ts
/**
 * Foo
 * @type {string | number}
 */
const foo: string = 'foo';
```

Output:

```js
/**
 * Foo
 *
 * @type {string | number}
 */
const foo = 'foo';
```

### Does not generate documentation for variable declarations without existing JSDoc

example:

Input:

```ts
const foo: string = 'foo';

/**
 * Bar
 */
const bar: string = 'bar';
```

Output:

```js
const foo = 'foo';

/**
 * Bar
 *
 * @type {string}
 */
const bar = 'bar';
```

## Object Types

### aliases

#### Transpiles object literal type aliases

example:

Input:

```ts
type Case = {
  prop: string;
};
```

Output:

```js
/**
 * @typedef {object} Case
 * @property {string} prop
 */
```

#### Preserves object literal type alias property comments

example:

Input:

```ts
type Case = {
  /**
   * Comment
   *
   * @deprecated
   */
  prop: string;
};
```

Output:

```js
/**
 * @typedef {object} Case
 * @property {string} prop Comment
 */
```

#### Treats object literal union and intersection as regular aliases

example:

Input:

```ts
type Case1 = { prop1: string } & { prop2: number };
type Case2 = { prop1: string } | { prop2: number };
```

Output:

```js
/** @typedef {{ prop1: string } & { prop2: number }} Case1 */
/** @typedef {{ prop1: string } | { prop2: number }} Case2 */
```

## Functions

### Documents variables containing a function expression

example:

Input:

```ts
const aFunction = function aFunction(param: string): number {
  return 1;
};
```

Output:

```js
/**
 * @param {string} param
 * @returns {number}
 */
const aFunction = function aFunction(param) {
  return 1;
};
```

### Documents function declarations

example:

Input:

```ts
/**
 * A function
 */
function aFunction(param: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} param
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Documents arrow functions

example:

Input:

```ts
/**
 * A function
 */
const aFunction = (param: string): number => {
  return 1;
};
```

Output:

```js
/**
 * A function
 *
 * @param {string} param
 * @returns {number}
 */
const aFunction = (param) => {
  return 1;
};
```

### `@param` tags are correctly ordered

example:

Input:

```ts
/**
 * A function
 *
 * @returns {number}
 * @param {string} param - A parameter.
 */
function aFunction(param: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} param - A parameter.
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Documents a parameter's default value

example 1:

Input:

```ts
/**
 * A function
 *
 * @param p1 the first parameter
 */
function aFunction(
  p1: string,
  p2?: number,
  p3: string = 'defaultValue'
): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} p1 the first parameter
 * @param {number} [p2]
 * @param {string} [p3='defaultValue']
 * @returns {number}
 */
function aFunction(p1, p2, p3 = 'defaultValue') {
  return 1;
}
```

example 2:

Input:

```ts
/**
 * B function
 *
 * @param p1 the first parameter
 */
const bFunction = (q1: string, q2: boolean = false, q3: number = 123): number =>
  2;
```

Output:

```js
/**
 * B function
 *
 * @param {string} q1
 * @param {boolean} [q2=false]
 * @param {number} [q3=123]
 * @returns {number}
 */
const bFunction = (q1, q2 = false, q3 = 123) => 2;
```

example 3:

Input:

```ts
type MyFunc = (p: any) => number;
const myFunc: MyFunc = (p: any) => 0;
/**
 * C function
 */
const cFunction = (
  f1: MyFunc = myFunc,
  f2: MyFunc = (p: any) => 0,
  f3: MyFunc = (p: any) => {
    myFunc(1);
    return 0;
  }
): number => 3;
```

Output:

```js
/** @typedef {(p: any) => number} MyFunc */

/**
 * @param {any} p
 * @returns {number}
 */
const myFunc = (p) => 0;

/**
 * C function
 *
 * @param {MyFunc} [f1=myFunc]
 * @param {MyFunc} [f2=(p: any) => 0]
 * @param {MyFunc} [f3=(p: any) => { myFunc(1); return 0; }]
 * @returns {number}
 */
const cFunction = (
  f1 = myFunc,
  f2 = (p) => 0,
  f3 = (p) => {
    myFunc(1);
    return 0;
  }
) => 3;
```

### Document optional parameters

example:

Input:

```ts
/**
 * A function
 */
function aFunction(param?: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} [param]
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Handles rest parameters

example:

Input:

```ts
/**
 * A function
 *
 * @param {string} param
 * @returns {number}
 */
function aFunction(param: string, ...nums: number[]): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} param
 * @param {...number} [nums]
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Update the type for an existing `@param` tag

example:

Input:

```ts
/**
 * A function
 *
 * @param {string} param - A parameter
 */
function aFunction(param?: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} [param] - A parameter
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### update the nearest JSDoc

example:

Input:

```ts
/**
 * Some orphan JSDoc comment
 */
/**
 * A function
 */
function aFunction(param: string): number {
  return 1;
}
```

Output:

```js
/**
 * Some orphan JSDoc comment
 */
/**
 * A function
 *
 * @param {string} param
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Does not modify the presence, or absence, of a dash between name and comments

example:

Input:

```ts
/**
 * A function
 *
 * @param p1 description for a
 * @param p2 - description for b
 * @returns {number} the return value
 */
function aFunction(p1: string, p2: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} p1 description for a
 * @param {string} p2 - description for b
 * @returns {number} the return value
 */
function aFunction(p1, p2) {
  return 1;
}
```

### Remove documentation for non-existing parameters

example:

Input:

```ts
/**
 * A function
 *
 * @param {number} notPresent
 * @returns {number}
 */
function aFunction(param: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} param
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Remove incorrect optional parameter indicator

example:

Input:

```ts
/**
 * A function
 *
 * @param {string} [param] - A not so optional parameter
 * @returns {number}
 */
function aFunction(param: string): number {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} param - A not so optional parameter
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Document an inferred return type

example:

Input:

```ts
/**
 * A function
 */
function aFunction(param: string) {
  return 1;
}
```

Output:

```js
/**
 * A function
 *
 * @param {string} param
 * @returns {number}
 */
function aFunction(param) {
  return 1;
}
```

### Reference the return type

example:

Input:

```ts
interface ISomeType {
  someKey: string;
}

function aFunction(param: string): ISomeType {
  return { someKey: param };
}
```

Output:

```js
/**
 * @typedef {object} ISomeType
 * @property {string} someKey
 */

/**
 * A function
 *
 * @param {string} param
 * @returns {ISomeType}
 */
function aFunction(param) {
  return { someKey: param };
}
```
