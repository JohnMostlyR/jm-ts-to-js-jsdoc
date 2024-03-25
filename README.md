# TypeScript to JavaScript transpiler

Transpiles TypeScript to JavaScript, adding JSDoc comments for type documentation.

## Functional description

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

## Caveats

### Documenting an object method's generic type is not supported.

example:

```javascript
interface IProtocolMainService {
	createIPCObjectUrl<T>(): IIPCObjectUrl<T>;
}
```

transpiles to:

```javascript
/**
 * @typedef {object} IProtocolMainService
 * @property {() => IIPCObjectUrl<T>} createIPCObjectUrl
 */
```

The generic type `T` for `createIPCObjectUrl` is lost.

### leading- and trailing comments are removed.

They are removed because they are problematic within JSDoc comments.

## Installation

```shell
npm i -g @jm/ts-to-js-jsdoc

# OR

yarn global add @jm/ts-to-js-jsdoc
```

The package manager will then link the binary for you, and you can access it with:

```shell
$ jm-ts-to-js-jsdoc
```

## Usage

The following will transpile all TypeScript files in the given directory and subdirectories
and writes all transpiled files to the same directory, including subdirectories.
Any JavaScript files that exist in the directory will be overwritten.

```shell
jm-ts-to-js-jsdoc /path/to/folder/with/typescript/files/
```

The following will transpile the given TypeScript file to JavaScript and writes
this into the same directory. If the file exist it will be overwritten.

```shell
jm-ts-to-js-jsdoc /path/to/folder/with/typescript/files/typescript.ts
```

The following will transpile all TypeScript files in the given directory and subdirectories
and writes all transpiled files to the supplied directory, including subdirectories.

```shell
jm-ts-to-js-jsdoc /path/to/folder/with/typescript/files/ /path/to/folder/with/javascript/files/
```

The following will transpile the given TypeScript file to JavaScript and writes
this into the supplied directory. If the file exist it will be overwritten.

```shell
jm-ts-to-js-jsdoc /path/to/folder/with/typescript/files/typescript.ts /path/to/folder/with/javascript/files/
```

For getting help information, type:

```shell
jm-ts-to-js-jsdoc --help
```

| Option                           | Description                                     |
| -------------------------------- | ----------------------------------------------- |
| -l, --log-level <level>          | the level of logging to use (default: 'warn')   |
| --add-type-documentation         | Add type documentation as JSDoc (default: true) |
| -p, --ts-config-file-path <path> | The path to a tsconfig.json file                |
| -h, --help                       | Print help information                          |
| -v, --version                    | Print version information                       |

### Command Line

```shell
$ jm-ts-to-js-jsdoc

Usage:
jm-ts-to-js-jsdoc [options] <input> [output]

Arguments:
  input          Input file or directory
  output         Output file or directory, (optional if it can be inferred)

Options:
  -v, --version                     display the version number
  -l, --log-level <level>           the level of logging to use (choices: "error", "warn", "info", "debug", "trace", default: "warn")
  --add-type-documentation          Add type documentation as JSDoc (default: true)
  -p, --ts-config-file-path <path>  The path to a tsconfig.json file
  -h, --help                        display help for command
```

## License

Copyright (c) Johan Meester

Licensed under [MIT License](https://choosealicense.com/licenses/mit/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Licenses of all dependencies are listed in [THIRD-PARTY-LICENSES](/THIRD-PARTY-LICENSES)

## Credits

This project is heavily inspired by: [TypeScript to JSDoc](https://github.com/futurGH/ts-to-jsdoc)
Published under the [MIT License](https://github.com/futurGH/ts-to-jsdoc/blob/1b7aa97fc770fab7a7ba3c3498546b4d9064fdf4/LICENSE)
