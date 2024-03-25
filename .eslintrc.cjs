/**
 * @file Configuration file for eslint.
 * @see {@link https://eslint.org/}
 */

'use strict';

module.exports = Object.freeze({
  root: true,

  env: {
    es2021: true,
    node: true,
  },

  /*
   * https://eslint.org/docs/latest/use/configure/configuration-files#extending-configuration-files
   */
  extends: 'prettier',

  globals: {
    ByteLengthQueuingStrategy: 'readable',
    CompressionStream: 'readable',
    CountQueuingStrategy: 'readable',
    CustomEvent: 'readable',
    crypto: 'readable',
    Crypto: 'readable',
    CryptoKey: 'readable',
    DecompressionStream: 'readable',
    fetch: 'readable',
    FormData: 'readable',
    navigator: 'readable',
    ReadableStream: 'readable',
    ReadableStreamDefaultReader: 'readable',
    ReadableStreamBYOBReader: 'readable',
    ReadableStreamBYOBRequest: 'readable',
    ReadableByteStreamController: 'readable',
    ReadableStreamDefaultController: 'readable',
    Response: 'readable',
    TextDecoderStream: 'readable',
    TextEncoderStream: 'readable',
    TransformStream: 'readable',
    TransformStreamDefaultController: 'readable',
    ShadowRealm: 'readable',
    SubtleCrypto: 'readable',
    WritableStream: 'readable',
    WritableStreamDefaultWriter: 'readable',
    WritableStreamDefaultController: 'readable',
    WebSocket: 'readable',
  },

  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'no-restricted-globals': [
          'error',
          {
            name: '__dirname',
            message: 'Not available in ESM',
          },
          {
            name: '__filename',
            message: 'Use import.meta.url instead',
          },
          {
            name: 'exports',
            message: 'Not available in ESM',
          },
          {
            name: 'module',
            message: 'Not available in ESM',
          },
          {
            name: 'process',
            message: 'Import process instead of using the global',
          },
          {
            name: 'require',
            message: 'Use import instead',
          },
          {
            name: 'Buffer',
            message: 'Import Buffer instead of using the global',
          },
        ],
      },
    },
    {
      env: {
        'jest/globals': true,
      },
      files: ['**/tests/**/*.test.mjs'],
      plugins: ['jest'],
      rules: {
        //#region ESLint Core Rules

        /*
         * Require or disallow named `function` expressions
         * https://eslint.org/docs/latest/rules/func-names
         * Type: suggestion
         * Recommended: false
         */
        'func-names': 'off', // expect-to-thow wrapper function

        //#endregion ESLint Core Rules

        //#region Jest

        //#region PROBLEM

        /*
         * Disallow calling `expect` conditionally
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md
         * Type: problem
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-conditional-expect': 'error',

        /*
         * Disallow conditional logic in tests
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-in-test.md
         * Type: problem
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-conditional-in-test': 'error',

        /*
         * Disallow confusing usages of jest.setTimeout
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-confusing-set-timeout.md
         * Type: problem
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-confusing-set-timeout': 'off',

        /*
         * Disallow string interpolation inside snapshots
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-interpolation-in-snapshots.md
         * Type: problem
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-interpolation-in-snapshots': 'error',

        /*
         * Disallow manually importing from `__mocks__`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-mocks-import.md
         * Type: problem
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-mocks-import': 'error',

        /*
         * Enforce unbound methods are called with their expected scope
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
         * Type: problem
         * Category: Best Practices
         * Recommended: false
         */
        'jest/unbound-method': 'off',

        /*
         * Enforce valid `describe()` callback
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-describe-callback.md
         * Type: problem
         * Category: Possible Errors
         * Recommended: error
         */
        'jest/valid-describe-callback': 'error',

        //#endregion PROBLEM

        //#region SUGGESTION

        /*
         * Enforce `test` and `it` usage conventions
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/consistent-test-it.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/consistent-test-it': 'off',

        /*
         * Enforce assertion to be made in a test body
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: warn
         */
        'jest/expect-expect': 'off',

        /*
         * Enforces a maximum number assertion calls in a test body
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-expects.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/max-expects': 'off',

        /*
         * Enforces a maximum depth to nested describe calls
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/max-nested-describe': 'error',

        /*
         * Disallow alias methods
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-alias-methods': 'off',

        /*
         * Disallow commented out tests
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-commented-out-tests.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: warn
         */
        'jest/no-commented-out-tests': 'warn',

        /*
         * Disallow use of deprecated functions
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-deprecated-functions.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-deprecated-functions': 'error',

        /*
         * Disallow disabled tests
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-disabled-tests.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: warn
         */
        'jest/no-disabled-tests': 'warn',

        /*
         * Disallow using a callback in asynchronous tests and hooks
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-done-callback.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-done-callback': 'error',

        /*
         * Disallow duplicate setup and teardown hooks
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-duplicate-hooks': 'off',

        /*
         * Disallow using `exports` in files containing tests
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-export.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-export': 'error',

        /*
         * Disallow focused tests
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-focused-tests.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-focused-tests': 'error',

        /*
         * Disallow setup and teardown hooks
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-hooks.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-hooks': 'off',

        /*
         * Disallow identical titles
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-identical-title.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-identical-title': 'error',

        /*
         * Disallow Jasmine globals
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-jasmine-globals.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-jasmine-globals': 'off',

        /*
         * Disallow large snapshots
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-large-snapshots.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-large-snapshots': ['warn', { maxSize: 300 }],

        /*
         * Disallow specific `jest.` methods
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-restricted-jest-methods.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-restricted-jest-methods': 'off',

        /*
         * Disallow specific matchers & modifiers
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-restricted-matchers.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-restricted-matchers': 'off',

        /*
         * Disallow using `expect` outside of `it` or `test` blocks
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-standalone-expect.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-standalone-expect': 'off',

        /*
         * Require using `.only` and `.skip` over `f` and `x`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-prefixes.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/no-test-prefixes': 'error',

        /*
         * Disallow explicitly returning from tests
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-return-statement.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-test-return-statement': 'off',

        /*
         * Disallow using `jest.mock()` factories without an explicit type parameter
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-untyped-mock-factory.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/no-untyped-mock-factory': 'off',

        /*
         * Suggest using `toBeCalledWith()` or `toHaveBeenCalledWith()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-called-with.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-called-with': 'error',

        /*
         * Suggest using the built-in comparison matchers
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-comparison-matcher.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-comparison-matcher': 'error',

        /*
         * Prefer using `.each` rather than manual loops
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-each.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-each': 'error',

        /*
         * Suggest using the built-in equality matchers
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-equality-matcher.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-equality-matcher': 'error',

        /*
         * Suggest using `expect.assertions()` OR `expect.hasAssertions()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-assertions.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-expect-assertions': 'off',

        /*
         * Prefer `await expect(...).resolves` over `expect(await...)` syntax
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-resolves.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-expect-resolves': 'off',

        /*
         * Prefer having hooks in a consistent order
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-in-order.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-hooks-in-order': 'error',

        /*
         * Suggest having hooks before any test cases
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-on-top.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-hooks-on-top': 'error',

        /*
         * Enforce lowercase test names
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-lowercase-title': 'off',

        /*
         * Prefer mock resolved/rejected shorthands for promises
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-mock-promise-shorthand.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-mock-promise-shorthand': 'error',

        /*
         * Prefer including a hint with external snapshots
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-snapshot-hint.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-snapshot-hint': 'error',

        /*
         * Suggest using `jest.spyOn()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-spy-on.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-spy-on': 'off',

        /*
         * Suggest using `toStrictEqual()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-strict-equal.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-strict-equal': 'off',

        /*
         * Suggest using `toBe()` for primitive literals
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-be.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-to-be': 'off',

        /*
         * Suggest using `toContain()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-contain.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-to-contain': 'warn',

        /*
         * Suggest using `toHaveLength()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-have-length.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-to-have-length': 'warn',

        /*
         * Require setup and teardown code to be within a hook
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-hook.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/require-hook': 'off',

        /*
         * Require a message for `toThrow()`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-to-throw-message.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/require-to-throw-message': 'off',

        /*
         * Require test cases and hooks to be inside a `describe` block
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-top-level-describe.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: false
         */
        'jest/require-top-level-describe': 'off',

        /*
         * Enforce valid `expect()` usage
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/valid-expect': 'error',

        /*
         * Require promises that have expectations in their chain to be valid
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect-in-promise.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/valid-expect-in-promise': 'error',

        /*
         * Enforce valid titles
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md
         * Type: suggestion
         * Category: Best Practices
         * Recommended: error
         */
        'jest/valid-title': 'warn',

        //#endregion SUGGESTION

        //#region LAYOUT

        /*
         * Suggest using `test.todo`
         * https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-todo.md
         * Type: layout
         * Category: Best Practices
         * Recommended: false
         */
        'jest/prefer-todo': 'warn',

        //#endregion LAYOUT

        //#endregion Jest

        //#region n

        /*
         * Disallow `import` declarations which import private modules
         * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-unpublished-import.md
         * Type: problem
         * Recommended: true
         */
        'n/no-unpublished-import': 'off',

        //#endregion n
      },
    },
  ],

  /*
   * https://eslint.org/docs/latest/use/configure/language-options#specifying-parser-options
   */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },

  /*
   * https://eslint.org/docs/latest/use/configure/configuration-files#using-a-configuration-from-a-plugin
   */
  plugins: ['@microsoft/eslint-plugin-sdl', 'jsdoc', 'n'],

  /*
   * https://eslint.org/docs/latest/use/configure/configuration-files#adding-shared-settings
   */
  settings: {
    jsdoc: {
      mode: 'typescript',
      tagNamePreference: {
        augments: {
          message:
            '@extends is to be used over @augments as it is more evocative of classes than @augments',
          replacement: 'extends',
        },
      },
    },
  },

  rules: {
    //#region ESLint Core Rules

    //#region PROBLEM

    /*
     * Enforce `return` statements in callbacks of array methods
     * https://eslint.org/docs/latest/rules/array-callback-return
     * Type: problem
     * Recommended: false
     */
    'array-callback-return': ['error', { allowImplicit: true }],

    /*
     * Require `super()` calls in constructors
     * https://eslint.org/docs/latest/rules/constructor-super
     * Type: problem
     * Recommended: true
     */
    'constructor-super': 'error',

    /*
     * Enforce `for` loop update clause moving the counter in the right direction
     * https://eslint.org/docs/latest/rules/for-direction
     * Type: problem
     * Recommended: true
     */
    'for-direction': 'error',

    /*
     * Enforce `return` statements in getters
     * https://eslint.org/docs/latest/rules/getter-return
     * Type: problem
     * Recommended: true
     */
    'getter-return': ['error', { allowImplicit: true }],

    /*
     * Disallow using an async function as a Promise executor
     * https://eslint.org/docs/latest/rules/no-async-promise-executor
     * Type: problem
     * Recommended: true
     */
    'no-async-promise-executor': 'error',

    /*
     * Disallow `await` inside of loops
     * https://eslint.org/docs/latest/rules/no-await-in-loop
     * Type: problem
     * Recommended: false
     */
    'no-await-in-loop': 'error',

    /*
     * Disallow reassigning class members
     * https://eslint.org/docs/latest/rules/no-class-assign
     * Type: problem
     * Recommended: true
     */
    'no-class-assign': 'error',

    /*
     * Disallow comparing against -0
     * https://eslint.org/docs/latest/rules/no-compare-neg-zero
     * Type: problem
     * Recommended: true
     */
    'no-compare-neg-zero': 'error',

    /*
     * Disallow assignment operators in conditional expressions
     * https://eslint.org/docs/latest/rules/no-cond-assign
     * Type: problem
     * Recommended: true
     */
    'no-cond-assign': 'error',

    /*
     * Disallow reassigning `const` variables
     * https://eslint.org/docs/latest/rules/no-const-assign
     * Type: problem
     * Recommended: true
     */
    'no-const-assign': 'error',

    /*
     * Disallow expressions where the operation doesn't affect the value
     * https://eslint.org/docs/latest/rules/no-constant-binary-expression
     * Type: problem
     * Recommended: false
     */
    'no-constant-binary-expression': 'error',

    /*
     * Disallow constant expressions in conditions
     * https://eslint.org/docs/latest/rules/no-constant-condition
     * Type: problem
     * Recommended: true
     */
    'no-constant-condition': 'error',

    /*
     * Disallow returning value from constructor
     * https://eslint.org/docs/latest/rules/no-constructor-return
     * Type: problem
     * Recommended: false
     */
    'no-constructor-return': 'error',

    /*
     * Disallow control characters in regular expressions
     * https://eslint.org/docs/latest/rules/no-control-regex
     * Type: problem
     * Recommended: true
     */
    'no-control-regex': 'error',

    /*
     * Disallow the use of `debugger`
     * https://eslint.org/docs/latest/rules/no-debugger
     * Type: problem
     * Recommended: true
     */
    'no-debugger': 'error',

    /*
     * Disallow duplicate arguments in `function` definitions
     * https://eslint.org/docs/latest/rules/no-dupe-args
     * Type: problem
     * Recommended: true
     */
    'no-dupe-args': 'error',

    /*
     * Disallow duplicate class members
     * https://eslint.org/docs/latest/rules/no-dupe-class-members
     * Type: problem
     * Recommended: true
     */
    'no-dupe-class-members': 'error',

    /*
     * Disallow duplicate conditions in if-else-if chains
     * https://eslint.org/docs/latest/rules/no-dupe-else-if
     * Type: problem
     * Recommended: true
     */
    'no-dupe-else-if': 'error',

    /*
     * Disallow duplicate keys in object literals
     * https://eslint.org/docs/latest/rules/no-dupe-keys
     * Type: problem
     * Recommended: true
     */
    'no-dupe-keys': 'error',

    /*
     * Disallow duplicate case labels
     * https://eslint.org/docs/latest/rules/no-duplicate-case
     * Type: problem
     * Recommended: true
     */
    'no-duplicate-case': 'error',

    /*
     * Disallow duplicate module imports
     * https://eslint.org/docs/latest/rules/no-duplicate-imports
     * Type: problem
     * Recommended: false
     */
    'no-duplicate-imports': 'error',

    /*
     * Disallow empty character classes in regular expressions
     * https://eslint.org/docs/latest/rules/no-empty-character-class
     * Type: problem
     * Recommended: true
     */
    'no-empty-character-class': 'error',

    /*
     * Disallow empty destructuring patterns
     * https://eslint.org/docs/latest/rules/no-empty-pattern
     * Type: problem
     * Recommended: true
     */
    'no-empty-pattern': 'error',

    /*
     * Disallow reassigning exceptions in `catch` clauses
     * https://eslint.org/docs/latest/rules/no-ex-assign
     * Type: problem
     * Recommended: true
     */
    'no-ex-assign': 'error',

    /*
     * Disallow fallthrough of `case` statements
     * https://eslint.org/docs/latest/rules/no-fallthrough
     * Type: problem
     * Recommended: true
     */
    'no-fallthrough': 'error',

    /*
     * Disallow reassigning `function` declarations
     * https://eslint.org/docs/latest/rules/no-func-assign
     * Type: problem
     * Recommended: true
     */
    'no-func-assign': 'error',

    /*
     * Disallow assigning to imported bindings
     * https://eslint.org/docs/latest/rules/no-import-assign
     * Type: problem
     * Recommended: true
     */
    'no-import-assign': 'error',

    /*
     * Disallow variable or `function` declarations in nested blocks
     * https://eslint.org/docs/latest/rules/no-inner-declarations
     * Type: problem
     * Recommended: true
     */
    'no-inner-declarations': 'error',

    /*
     * Disallow invalid regular expression strings in `RegExp` constructors
     * https://eslint.org/docs/latest/rules/no-invalid-regexp
     * Type: problem
     * Recommended: true
     */
    'no-invalid-regexp': 'error',

    /*
     * Disallow irregular whitespace
     * https://eslint.org/docs/latest/rules/no-irregular-whitespace
     * Type: problem
     * Recommended: true
     */
    'no-irregular-whitespace': 'error',

    /*
     * Disallow literal numbers that lose precision
     * https://eslint.org/docs/latest/rules/no-loss-of-precision
     * Type: problem
     * Recommended: true
     */
    'no-loss-of-precision': 'error',

    /*
     * Disallow characters which are made with multiple code points in character class syntax
     * https://eslint.org/docs/latest/rules/no-misleading-character-class
     * Type: problem
     * Recommended: true
     */
    'no-misleading-character-class': 'error',

    /*
     * Disallow `new` operators with global non-constructor functions
     * https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
     * Type: problem
     * Recommended: false
     */
    'no-new-native-nonconstructor': 'off',

    /*
     * Disallow `new` operators with the `Symbol` object
     * https://eslint.org/docs/latest/rules/no-new-symbol
     * Type: problem
     * Recommended: true
     */
    'no-new-symbol': 'error',

    /*
     * Disallow calling global object properties as functions
     * https://eslint.org/docs/latest/rules/no-obj-calls
     * Type: problem
     * Recommended: true
     */
    'no-obj-calls': 'error',

    /*
     * Disallow returning values from Promise executor functions
     * https://eslint.org/docs/latest/rules/no-promise-executor-return
     * Type: problem
     * Recommended: false
     */
    'no-promise-executor-return': 'off',

    /*
     * Disallow calling some `Object.prototype` methods directly on objects
     * https://eslint.org/docs/latest/rules/no-prototype-builtins
     * Type: problem
     * Recommended: true
     */
    'no-prototype-builtins': 'error',

    /*
     * Disallow assignments where both sides are exactly the same
     * https://eslint.org/docs/latest/rules/no-self-assign
     * Type: problem
     * Recommended: true
     */
    'no-self-assign': [
      'error',
      {
        props: true,
      },
    ],

    /*
     * Disallow comparisons where both sides are exactly the same
     * https://eslint.org/docs/latest/rules/no-self-compare
     * Type: problem
     * Recommended: false
     */
    'no-self-compare': 'error',

    /*
     * Disallow returning values from setters
     * https://eslint.org/docs/latest/rules/no-setter-return
     * Type: problem
     * Recommended: true
     */
    'no-setter-return': 'error',

    /*
     * Disallow sparse arrays
     * https://eslint.org/docs/latest/rules/no-sparse-arrays
     * Type: problem
     * Recommended: true
     */
    'no-sparse-arrays': 'error',

    /*
     * Disallow template literal placeholder syntax in regular strings
     * https://eslint.org/docs/latest/rules/no-template-curly-in-string
     * Type: problem
     * Recommended: false
     */
    'no-template-curly-in-string': 'error',

    /*
     * Disallow `this`/`super` before calling `super()` in constructors
     * https://eslint.org/docs/latest/rules/no-this-before-super
     * Type: problem
     * Recommended: true
     */
    'no-this-before-super': 'error',

    /*
     * Disallow the use of undeclared variables unless mentioned in `global` comments
     * https://eslint.org/docs/latest/rules/no-undef
     * Type: problem
     * Recommended: true
     */
    'no-undef': 'error',

    /*
     * Disallow confusing multiline expressions
     * https://eslint.org/docs/latest/rules/no-unexpected-multiline
     * Type: problem
     * Recommended: true
     */
    'no-unexpected-multiline': 'error',

    /*
     * Disallow unmodified loop conditions
     * https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
     * Type: problem
     * Recommended: false
     */
    'no-unmodified-loop-condition': 'error',

    /*
     * Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
     * https://eslint.org/docs/latest/rules/no-unreachable
     * Type: problem
     * Recommended: true
     */
    'no-unreachable': 'error',

    /*
     * Disallow loops with a body that allows only one iteration
     * https://eslint.org/docs/latest/rules/no-unreachable-loop
     * Type: problem
     * Recommended: false
     */
    'no-unreachable-loop': 'error',

    /*
     * Disallow control flow statements in `finally` blocks
     * https://eslint.org/docs/latest/rules/no-unsafe-finally
     * Type: problem
     * Recommended: true
     */
    'no-unsafe-finally': 'error',

    /*
     * Disallow negating the left operand of relational operators
     * https://eslint.org/docs/latest/rules/no-unsafe-negation
     * Type: problem
     * Recommended: true
     */
    'no-unsafe-negation': 'error',

    /*
     * Disallow use of optional chaining in contexts where the `undefined` value is not allowed
     * https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining
     * Type: problem
     * Recommended: true
     */
    'no-unsafe-optional-chaining': 'error',

    /*
     * Disallow unused private class members
     * https://eslint.org/docs/latest/rules/no-unused-private-class-members
     * Type: problem
     * Recommended: false
     */
    'no-unused-private-class-members': 'error',

    /*
     * Disallow unused variables
     * https://eslint.org/docs/latest/rules/no-unused-vars
     * Type: problem
     * Recommended: true
     */
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],

    /*
     * Disallow the use of variables before they are defined
     * https://eslint.org/docs/latest/rules/no-use-before-define
     * Type: problem
     * Recommended: false
     */
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: true },
    ],

    /*
     * Disallow useless backreferences in regular expressions
     * https://eslint.org/docs/latest/rules/no-useless-backreference
     * Type: problem
     * Recommended: true
     */
    'no-useless-backreference': 'error',

    /*
     * Disallow assignments that can lead to race conditions due to usage of `await` or `yield`
     * https://eslint.org/docs/latest/rules/require-atomic-updates
     * Type: problem
     * Recommended: false
     */
    'require-atomic-updates': 'off',

    /*
     * Require calls to `isNaN()` when checking for `NaN`
     * https://eslint.org/docs/latest/rules/use-isnan
     * Type: problem
     * Recommended: true
     */
    'use-isnan': 'error',

    /*
     * Enforce comparing `typeof` expressions against valid strings
     * https://eslint.org/docs/latest/rules/valid-typeof
     * Type: problem
     * Recommended: true
     */
    'valid-typeof': 'error',

    //#endregion PROBLEM

    //#region SUGGESTION

    /*
     * Enforce getter and setter pairs in objects and classes
     * https://eslint.org/docs/latest/rules/accessor-pairs
     * Type: suggestion
     * Recommended: false
     */
    'accessor-pairs': 'off',

    /*
     * Require braces around arrow function bodies
     * https://eslint.org/docs/latest/rules/arrow-body-style
     * Type: suggestion
     * Recommended: false
     */
    'arrow-body-style': 'off',

    /*
     * Enforce the use of variables within the scope they are defined
     * https://eslint.org/docs/latest/rules/block-scoped-var
     * Type: suggestion
     * Recommended: false
     */
    'block-scoped-var': 'error',

    /*
     * Enforce camelcase naming convention
     * https://eslint.org/docs/latest/rules/camelcase
     * Type: suggestion
     * Recommended: false
     */
    camelcase: 'off',

    /*
     * Enforce or disallow capitalization of the first letter of a comment
     * https://eslint.org/docs/latest/rules/capitalized-comments
     * Type: suggestion
     * Recommended: false
     */
    'capitalized-comments': 'off',

    /*
     * Enforce that class methods utilize `this`
     * https://eslint.org/docs/latest/rules/class-methods-use-this
     * Type: suggestion
     * Recommended: false
     */
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [],
      },
    ],

    /*
     * Enforce a maximum cyclomatic complexity allowed in a program
     * https://eslint.org/docs/latest/rules/complexity
     * Type: suggestion
     * Recommended: false
     */
    complexity: ['off', 20],

    /*
     * Require `return` statements to either always or never specify values
     * https://eslint.org/docs/latest/rules/consistent-return
     * Type: suggestion
     * Recommended: false
     */
    'consistent-return': 'off',

    /*
     * Enforce consistent naming when capturing the current execution context
     * https://eslint.org/docs/latest/rules/consistent-this
     * Type: suggestion
     * Recommended: false
     */
    'consistent-this': 'off',

    /*
     * Enforce consistent brace style for all control statements
     * https://eslint.org/docs/latest/rules/curly
     * Type: suggestion
     * Recommended: false
     */
    curly: ['error', 'multi-line'],

    /*
     * Require `default` cases in `switch` statements
     * https://eslint.org/docs/latest/rules/default-case
     * Type: suggestion
     * Recommended: false
     */
    'default-case': ['error', { commentPattern: '^no default$' }],

    /*
     * Enforce default clauses in switch statements to be last
     * https://eslint.org/docs/latest/rules/default-case-last
     * Type: suggestion
     * Recommended: false
     */
    'default-case-last': 'error',

    /*
     * Enforce default parameters to be last
     * https://eslint.org/docs/latest/rules/default-param-last
     * Type: suggestion
     * Recommended: false
     */
    'default-param-last': 'error',

    /*
     * Enforce dot notation whenever possible
     * https://eslint.org/docs/latest/rules/dot-notation
     * Type: suggestion
     * Recommended: false
     */
    'dot-notation': ['error', { allowKeywords: true }],

    /*
     * Require the use of `===` and `!==`
     * https://eslint.org/docs/latest/rules/eqeqeq
     * Type: suggestion
     * Recommended: false
     */
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    /*
     * Require function names to match the name of the variable or property to which they are assigned
     * https://eslint.org/docs/latest/rules/func-name-matching
     * Type: suggestion
     * Recommended: false
     */
    'func-name-matching': 'error',

    /*
     * Require or disallow named `function` expressions
     * https://eslint.org/docs/latest/rules/func-names
     * Type: suggestion
     * Recommended: false
     */
    'func-names': 'error',

    /*
     * Enforce the consistent use of either `function` declarations or expressions
     * https://eslint.org/docs/latest/rules/func-style
     * Type: suggestion
     * Recommended: false
     */
    'func-style': 'off',

    /*
     * Require grouped accessor pairs in object literals and classes
     * https://eslint.org/docs/latest/rules/grouped-accessor-pairs
     * Type: suggestion
     * Recommended: false
     */
    'grouped-accessor-pairs': 'error',

    /*
     * Require `for-in` loops to include an `if` statement
     * https://eslint.org/docs/latest/rules/guard-for-in
     * Type: suggestion
     * Recommended: false
     */
    'guard-for-in': 'error',

    /*
     * Disallow specified identifiers
     * https://eslint.org/docs/latest/rules/id-denylist
     * Type: suggestion
     * Recommended: false
     */
    'id-denylist': 'error',

    /*
     * Enforce minimum and maximum identifier lengths
     * https://eslint.org/docs/latest/rules/id-length
     * Type: suggestion
     * Recommended: false
     */
    'id-length': 'off',

    /*
     * Require identifiers to match a specified regular expression
     * https://eslint.org/docs/latest/rules/id-match
     * Type: suggestion
     * Recommended: false
     */
    'id-match': 'off',

    /*
     * Require or disallow initialization in variable declarations
     * https://eslint.org/docs/latest/rules/init-declarations
     * Type: suggestion
     * Recommended: false
     */
    'init-declarations': 'off',

    /*
     * Require or disallow logical assignment operator shorthand
     * https://eslint.org/docs/latest/rules/logical-assignment-operators
     * Type: suggestion
     * Recommended: false
     */
    'logical-assignment-operators': 'warn',

    /*
     * Enforce a maximum number of classes per file
     * https://eslint.org/docs/latest/rules/max-classes-per-file
     * Type: suggestion
     * Recommended: false
     */
    'max-classes-per-file': 'off',

    /*
     * Enforce a maximum depth that blocks can be nested
     * https://eslint.org/docs/latest/rules/max-depth
     * Type: suggestion
     * Recommended: false
     */
    'max-depth': ['error', 4],

    /*
     * Enforce a maximum number of lines per file
     * https://eslint.org/docs/latest/rules/max-lines
     * Type: suggestion
     * Recommended: false
     */
    'max-lines': 'off',

    /*
     * Enforce a maximum number of lines of code in a function
     * https://eslint.org/docs/latest/rules/max-lines-per-function
     * Type: suggestion
     * Recommended: false
     */
    'max-lines-per-function': 'off',

    /*
     * Enforce a maximum depth that callbacks can be nested
     * https://eslint.org/docs/latest/rules/max-nested-callbacks
     * Type: suggestion
     * Recommended: false
     */
    'max-nested-callbacks': ['error', 7],

    /*
     * Enforce a maximum number of parameters in function definitions
     * https://eslint.org/docs/latest/rules/max-params
     * Type: suggestion
     * Recommended: false
     */
    'max-params': ['error', 7],

    /*
     * Enforce a maximum number of statements allowed in function blocks
     * https://eslint.org/docs/latest/rules/max-statements
     * Type: suggestion
     * Recommended: false
     */
    'max-statements': 'off',

    /*
     * Enforce a particular style for multiline comments
     * https://eslint.org/docs/latest/rules/multiline-comment-style
     * Type: suggestion
     * Recommended: false
     */
    'multiline-comment-style': 'off',

    /*
     * Require constructor names to begin with a capital letter
     * https://eslint.org/docs/latest/rules/new-cap
     * Type: suggestion
     * Recommended: false
     */
    'new-cap': 'error',

    /*
     * Disallow the use of `alert`, `confirm`, and `prompt`
     * https://eslint.org/docs/latest/rules/no-alert
     * Type: suggestion
     * Recommended: false
     */
    'no-alert': 'error',

    /*
     * Disallow `Array` constructors
     * https://eslint.org/docs/latest/rules/no-array-constructor
     * Type: suggestion
     * Recommended: false
     */
    'no-array-constructor': 'error',

    /*
     * Disallow bitwise operators
     * https://eslint.org/docs/latest/rules/no-bitwise
     * Type: suggestion
     * Recommended: false
     */
    'no-bitwise': 'error',

    /*
     * Disallow the use of `arguments.caller` or `arguments.callee`
     * https://eslint.org/docs/latest/rules/no-caller
     * Type: suggestion
     * Recommended: false
     */
    'no-caller': 'error',

    /*
     * Disallow lexical declarations in case clauses
     * https://eslint.org/docs/latest/rules/no-case-declarations
     * Type: suggestion
     * Recommended: true
     */
    'no-case-declarations': 'error',

    /*
     * Disallow the use of `console`
     * https://eslint.org/docs/latest/rules/no-console
     * Type: suggestion
     * Recommended: false
     */
    'no-console': 'off',

    /*
     * Disallow `continue` statements
     * https://eslint.org/docs/latest/rules/no-continue
     * Type: suggestion
     * Recommended: false
     */
    'no-continue': 'off',

    /*
     * Disallow deleting variables
     * https://eslint.org/docs/latest/rules/no-delete-var
     * Type: suggestion
     * Recommended: true
     */
    'no-delete-var': 'error',

    /*
     * Disallow equal signs explicitly at the beginning of regular expressions
     * https://eslint.org/docs/latest/rules/no-div-regex
     * Type: suggestion
     * Recommended: false
     */
    'no-div-regex': 'error',

    /*
     * Disallow `else` blocks after `return` statements in `if` statements
     * https://eslint.org/docs/latest/rules/no-else-return
     * Type: suggestion
     * Recommended: false
     */
    'no-else-return': ['error', { allowElseIf: false }],

    /*
     * Disallow empty block statements
     * https://eslint.org/docs/latest/rules/no-empty
     * Type: suggestion
     * Recommended: true
     */
    'no-empty': 'error',

    /*
     * Disallow empty functions
     * https://eslint.org/docs/latest/rules/no-empty-function
     * Type: suggestion
     * Recommended: false
     */
    'no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],

    /*
     * Disallow empty static blocks
     * https://eslint.org/docs/latest/rules/no-empty-static-block
     * Type: suggestion
     * Recommended: false
     */
    'no-empty-static-block': 'error',

    /*
     * Disallow `null` comparisons without type-checking operators
     * https://eslint.org/docs/latest/rules/no-eq-null
     * Type: suggestion
     * Recommended: false
     */
    'no-eq-null': 'off',

    /*
     * Disallow the use of `eval()`
     * https://eslint.org/docs/latest/rules/no-eval
     * Type: suggestion
     * Recommended: false
     */
    'no-eval': 'error',

    /*
     * Disallow extending native types
     * https://eslint.org/docs/latest/rules/no-extend-native
     * Type: suggestion
     * Recommended: false
     */
    'no-extend-native': 'error',

    /*
     * Disallow unnecessary calls to `.bind()`
     * https://eslint.org/docs/latest/rules/no-extra-bind
     * Type: suggestion
     * Recommended: false
     */
    'no-extra-bind': 'error',

    /*
     * Disallow unnecessary boolean casts
     * https://eslint.org/docs/latest/rules/no-extra-boolean-cast
     * Type: suggestion
     * Recommended: true
     */
    'no-extra-boolean-cast': 'error',

    /*
     * Disallow unnecessary labels
     * https://eslint.org/docs/latest/rules/no-extra-label
     * Type: suggestion
     * Recommended: false
     */
    'no-extra-label': 'error',

    /*
     * Disallow assignments to native objects or read-only global variables
     * https://eslint.org/docs/latest/rules/no-global-assign
     * Type: suggestion
     * Recommended: true
     */
    'no-global-assign': ['error', { exceptions: [] }],

    /*
     * Disallow shorthand type conversions
     * https://eslint.org/docs/latest/rules/no-implicit-coercion
     * Type: suggestion
     * Recommended: false
     */
    'no-implicit-coercion': 'off',

    /*
     * Disallow declarations in the global scope
     * https://eslint.org/docs/latest/rules/no-implicit-globals
     * Type: suggestion
     * Recommended: false
     */
    'no-implicit-globals': 'off',

    /*
     * Disallow the use of `eval()`-like methods
     * https://eslint.org/docs/latest/rules/no-implied-eval
     * Type: suggestion
     * Recommended: false
     */
    'no-implied-eval': 'error',

    /*
     * Disallow inline comments after code
     * https://eslint.org/docs/latest/rules/no-inline-comments
     * Type: suggestion
     * Recommended: false
     */
    'no-inline-comments': 'off',

    /*
     * Disallow use of `this` in contexts where the value of `this` is `undefined`
     * https://eslint.org/docs/latest/rules/no-invalid-this
     * Type: suggestion
     * Recommended: false
     */
    'no-invalid-this': 'error',

    /*
     * Disallow the use of the `__iterator__` property
     * https://eslint.org/docs/latest/rules/no-iterator
     * Type: suggestion
     * Recommended: false
     */
    'no-iterator': 'error',

    /*
     * Disallow labels that share a name with a variable
     * https://eslint.org/docs/latest/rules/no-label-var
     * Type: suggestion
     * Recommended: false
     */
    'no-label-var': 'error',

    /*
     * Disallow labeled statements
     * https://eslint.org/docs/latest/rules/no-labels
     * Type: suggestion
     * Recommended: false
     */
    'no-labels': 'error',

    /*
     * Disallow unnecessary nested blocks
     * https://eslint.org/docs/latest/rules/no-lone-blocks
     * Type: suggestion
     * Recommended: false
     */
    'no-lone-blocks': 'error',

    /*
     * Disallow `if` statements as the only statement in `else` blocks
     * https://eslint.org/docs/latest/rules/no-lonely-if
     * Type: suggestion
     * Recommended: false
     */
    'no-lonely-if': 'error',

    /*
     * Disallow function declarations that contain unsafe references inside loop statements
     * https://eslint.org/docs/latest/rules/no-loop-func
     * Type: suggestion
     * Recommended: false
     */
    'no-loop-func': 'error',

    /*
     * Disallow magic numbers
     * https://eslint.org/docs/latest/rules/no-magic-numbers
     * Type: suggestion
     * Recommended: false
     */
    'no-magic-numbers': 'off',

    /*
     * Disallow use of chained assignment expressions
     * https://eslint.org/docs/latest/rules/no-multi-assign
     * Type: suggestion
     * Recommended: false
     */
    'no-multi-assign': 'error',

    /*
     * Disallow multiline strings
     * https://eslint.org/docs/latest/rules/no-multi-str
     * Type: suggestion
     * Recommended: false
     */
    'no-multi-str': 'error',

    /*
     * Disallow negated conditions
     * https://eslint.org/docs/latest/rules/no-negated-condition
     * Type: suggestion
     * Recommended: false
     */
    'no-negated-condition': 'error',

    /*
     * Disallow nested ternary expressions
     * https://eslint.org/docs/latest/rules/no-nested-ternary
     * Type: suggestion
     * Recommended: false
     */
    'no-nested-ternary': 'off',

    /*
     * Disallow `new` operators outside of assignments or comparisons
     * https://eslint.org/docs/latest/rules/no-new
     * Type: suggestion
     * Recommended: false
     */
    'no-new': 'error',

    /*
     * Disallow `new` operators with the `Function` object
     * https://eslint.org/docs/latest/rules/no-new-func
     * Type: suggestion
     * Recommended: false
     */
    'no-new-func': 'error',

    /*
     * Disallow `new` operators with the `String`, `Number`, and `Boolean` objects
     * https://eslint.org/docs/latest/rules/no-new-wrappers
     * Type: suggestion
     * Recommended: false
     */
    'no-new-wrappers': 'error',

    /*
     * Disallow `\\8` and `\\9` escape sequences in string literals
     * https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape
     * Type: suggestion
     * Recommended: true
     */
    'no-nonoctal-decimal-escape': 'error',

    /*
     * Disallow calls to the `Object` constructor without an argument
     * https://eslint.org/docs/latest/rules/no-object-constructor
     * Type: suggestion
     * Recommended: false
     */
    'no-object-constructor': 'off',

    /*
     * Disallow octal literals
     * https://eslint.org/docs/latest/rules/no-octal
     * Type: suggestion
     * Recommended: true
     */
    'no-octal': 'error',

    /*
     * Disallow octal escape sequences in string literals
     * https://eslint.org/docs/latest/rules/no-octal-escape
     * Type: suggestion
     * Recommended: false
     */
    'no-octal-escape': 'error',

    /*
     * Disallow reassigning `function` parameters
     * https://eslint.org/docs/latest/rules/no-param-reassign
     * Type: suggestion
     * Recommended: false
     */
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'context', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
        ],
      },
    ],

    /*
     * Disallow the unary operators `++` and `--`
     * https://eslint.org/docs/latest/rules/no-plusplus
     * Type: suggestion
     * Recommended: false
     */
    'no-plusplus': 'off',

    /*
     * Disallow the use of the `__proto__` property
     * https://eslint.org/docs/latest/rules/no-proto
     * Type: suggestion
     * Recommended: false
     */
    'no-proto': 'error',

    /*
     * Disallow variable redeclaration
     * https://eslint.org/docs/latest/rules/no-redeclare
     * Type: suggestion
     * Recommended: true
     */
    'no-redeclare': 'error',

    /*
     * Disallow multiple spaces in regular expressions
     * https://eslint.org/docs/latest/rules/no-regex-spaces
     * Type: suggestion
     * Recommended: true
     */
    'no-regex-spaces': 'error',

    /*
     * Disallow specified names in exports
     * https://eslint.org/docs/latest/rules/no-restricted-exports
     * Type: suggestion
     * Recommended: false
     */
    'no-restricted-exports': 'off',

    /*
     * Disallow specified global variables
     * https://eslint.org/docs/latest/rules/no-restricted-globals
     * Type: suggestion
     * Recommended: false
     */
    'no-restricted-globals': [
      'error',
      {
        name: 'fdescribe',
        message: 'Do not commit fdescribe. Use describe instead.',
      },
      {
        name: 'isFinite',
        message: 'Please sse Number.isFinite instead',
      },
      {
        name: 'isNaN',
        message: 'Use Number.isNaN instead',
      },
    ],

    /*
     * Disallow specified modules when loaded by `import`
     * https://eslint.org/docs/latest/rules/no-restricted-imports
     * Type: suggestion
     * Recommended: false
     */
    'no-restricted-imports': 'off',

    /*
     * Disallow certain properties on certain objects
     * https://eslint.org/docs/latest/rules/no-restricted-properties
     * Type: suggestion
     * Recommended: false
     */
    'no-restricted-properties': [
      'error',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'assert',
        property: 'deepEqual',
        message: 'Use `assert.deepStrictEqual()`.',
      },
      {
        object: 'assert',
        property: 'notDeepEqual',
        message: 'Use `assert.notDeepStrictEqual()`.',
      },
      {
        object: 'assert',
        property: 'equal',
        message: 'Use `assert.strictEqual()` rather than `assert.equal()`.',
      },
      {
        object: 'assert',
        property: 'notEqual',
        message:
          'Use `assert.notStrictEqual()` rather than `assert.notEqual()`.',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'Math',
        property: 'pow',
        message:
          'Use the exponentiation operator (**) rather than `Math.pow()`.',
      },
      {
        property: '__defineGetter__',
        message:
          '__defineGetter__ is deprecated. Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message:
          '__defineSetter__ is deprecated. Please use Object.defineProperty instead.',
      },
    ],

    /*
     * Disallow specified syntax
     * https://eslint.org/docs/latest/rules/no-restricted-syntax
     * Type: suggestion
     * Recommended: false
     */
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.name='setTimeout'][arguments.length<2]",
        message: '`setTimeout()` must be invoked with at least two arguments.',
      },
      {
        selector:
          "CallExpression[callee.name='setInterval'][arguments.length<2]",
        message: '`setInterval()` must be invoked with at least two arguments.',
      },
      {
        selector: 'ThrowStatement > CallExpression[callee.name=/Error$/]',
        message: 'Use `new` keyword when throwing an `Error`.',
      },
    ],

    /*
     * Disallow assignment operators in `return` statements
     * https://eslint.org/docs/latest/rules/no-return-assign
     * Type: suggestion
     * Recommended: false
     */
    'no-return-assign': ['error', 'always'],

    /*
     * Disallow `javascript:` urls
     * https://eslint.org/docs/latest/rules/no-script-url
     * Type: suggestion
     * Recommended: false
     */
    'no-script-url': 'error',

    /*
     * Disallow comma operators
     * https://eslint.org/docs/latest/rules/no-sequences
     * Type: suggestion
     * Recommended: false
     */
    'no-sequences': 'error',

    /*
     * Disallow variable declarations from shadowing variables declared in the outer scope
     * https://eslint.org/docs/latest/rules/no-shadow
     * Type: suggestion
     * Recommended: false
     */
    'no-shadow': 'error',

    /*
     * Disallow identifiers from shadowing restricted names
     * https://eslint.org/docs/latest/rules/no-shadow-restricted-names
     * Type: suggestion
     * Recommended: true
     */
    'no-shadow-restricted-names': 'error',

    /*
     * Disallow ternary operators
     * https://eslint.org/docs/latest/rules/no-ternary
     * Type: suggestion
     * Recommended: false
     */
    'no-ternary': 'off',

    /*
     * Disallow throwing literals as exceptions
     * https://eslint.org/docs/latest/rules/no-throw-literal
     * Type: suggestion
     * Recommended: false
     */
    'no-throw-literal': 'error',

    /*
     * Disallow initializing variables to `undefined`
     * https://eslint.org/docs/latest/rules/no-undef-init
     * Type: suggestion
     * Recommended: false
     */
    'no-undef-init': 'error',

    /*
     * Disallow the use of `undefined` as an identifier
     * https://eslint.org/docs/latest/rules/no-undefined
     * Type: suggestion
     * Recommended: false
     */
    'no-undefined': 'off',

    /*
     * Disallow dangling underscores in identifiers
     * https://eslint.org/docs/latest/rules/no-underscore-dangle
     * Type: suggestion
     * Recommended: false
     */
    'no-underscore-dangle': 'off',

    /*
     * Disallow ternary operators when simpler alternatives exist
     * https://eslint.org/docs/latest/rules/no-unneeded-ternary
     * Type: suggestion
     * Recommended: false
     */
    'no-unneeded-ternary': 'error',

    /*
     * Disallow unused expressions
     * https://eslint.org/docs/latest/rules/no-unused-expressions
     * Type: suggestion
     * Recommended: false
     */
    'no-unused-expressions': ['error', { allowShortCircuit: true }],

    /*
     * Disallow unused labels
     * https://eslint.org/docs/latest/rules/no-unused-labels
     * Type: suggestion
     * Recommended: true
     */
    'no-unused-labels': 'error',

    /*
     * Disallow unnecessary calls to `.call()` and `.apply()`
     * https://eslint.org/docs/latest/rules/no-useless-call
     * Type: suggestion
     * Recommended: false
     */
    'no-useless-call': 'error',

    /*
     * Disallow unnecessary `catch` clauses
     * https://eslint.org/docs/latest/rules/no-useless-catch
     * Type: suggestion
     * Recommended: true
     */
    'no-useless-catch': 'error',

    /*
     * Disallow unnecessary computed property keys in objects and classes
     * https://eslint.org/docs/latest/rules/no-useless-computed-key
     * Type: suggestion
     * Recommended: false
     */
    'no-useless-computed-key': 'error',

    /*
     * Disallow unnecessary concatenation of literals or template literals
     * https://eslint.org/docs/latest/rules/no-useless-concat
     * Type: suggestion
     * Recommended: false
     */
    'no-useless-concat': 'error',

    /*
     * Disallow unnecessary constructors
     * https://eslint.org/docs/latest/rules/no-useless-constructor
     * Type: suggestion
     * Recommended: false
     */
    'no-useless-constructor': 'error',

    /*
     * Disallow unnecessary escape characters
     * https://eslint.org/docs/latest/rules/no-useless-escape
     * Type: suggestion
     * Recommended: true
     */
    'no-useless-escape': 'error',

    /*
     * Disallow renaming import, export, and destructured assignments to the same name
     * https://eslint.org/docs/latest/rules/no-useless-rename
     * Type: suggestion
     * Recommended: false
     */
    'no-useless-rename': 'error',

    /*
     * Disallow redundant return statements
     * https://eslint.org/docs/latest/rules/no-useless-return
     * Type: suggestion
     * Recommended: false
     */
    'no-useless-return': 'error',

    /*
     * Require `let` or `const` instead of `var`
     * https://eslint.org/docs/latest/rules/no-var
     * Type: suggestion
     * Recommended: false
     */
    'no-var': 'off',

    /*
     * Disallow `void` operators
     * https://eslint.org/docs/latest/rules/no-void
     * Type: suggestion
     * Recommended: false
     */
    'no-void': 'error',

    /*
     * Disallow specified warning terms in comments
     * https://eslint.org/docs/latest/rules/no-warning-comments
     * Type: suggestion
     * Recommended: false
     */
    'no-warning-comments': [
      'error',
      { location: 'anywhere', terms: ['fixme'] },
    ],

    /*
     * Disallow `with` statements
     * https://eslint.org/docs/latest/rules/no-with
     * Type: suggestion
     * Recommended: true
     */
    'no-with': 'error',

    /*
     * Require or disallow method and property shorthand syntax for object literals
     * https://eslint.org/docs/latest/rules/object-shorthand
     * Type: suggestion
     * Recommended: false
     */
    'object-shorthand': ['error', 'properties'],

    /*
     * Enforce variables to be declared either together or separately in functions
     * https://eslint.org/docs/latest/rules/one-var
     * Type: suggestion
     * Recommended: false
     */
    'one-var': 'off',

    /*
     * Require or disallow assignment operator shorthand where possible
     * https://eslint.org/docs/latest/rules/operator-assignment
     * Type: suggestion
     * Recommended: false
     */
    'operator-assignment': 'off',

    /*
     * Require using arrow functions for callbacks
     * https://eslint.org/docs/latest/rules/prefer-arrow-callback
     * Type: suggestion
     * Recommended: false
     */
    'prefer-arrow-callback': 'off',

    /*
     * Require `const` declarations for variables that are never reassigned after declared
     * https://eslint.org/docs/latest/rules/prefer-const
     * Type: suggestion
     * Recommended: false
     */
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],

    /*
     * Require destructuring from arrays and/or objects
     * https://eslint.org/docs/latest/rules/prefer-destructuring
     * Type: suggestion
     * Recommended: false
     */
    'prefer-destructuring': 'off',

    /*
     * Disallow the use of `Math.pow` in favor of the `**` operator
     * https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
     * Type: suggestion
     * Recommended: false
     */
    'prefer-exponentiation-operator': 'warn',

    /*
     * Enforce using named capture group in regular expression
     * https://eslint.org/docs/latest/rules/prefer-named-capture-group
     * Type: suggestion
     * Recommended: false
     */
    'prefer-named-capture-group': 'off',

    /*
     * Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
     * https://eslint.org/docs/latest/rules/prefer-numeric-literals
     * Type: suggestion
     * Recommended: false
     */
    'prefer-numeric-literals': 'error',

    /*
     * Disallow use of `Object.prototype.hasOwnProperty.call()` and prefer use of `Object.hasOwn()`
     * https://eslint.org/docs/latest/rules/prefer-object-has-own
     * Type: suggestion
     * Recommended: false
     */
    'prefer-object-has-own': 'error',

    /*
     * Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
     * https://eslint.org/docs/latest/rules/prefer-object-spread
     * Type: suggestion
     * Recommended: false
     */
    'prefer-object-spread': 'warn',

    /*
     * Require using Error objects as Promise rejection reasons
     * https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
     * Type: suggestion
     * Recommended: false
     */
    'prefer-promise-reject-errors': 'off',

    /*
     * Disallow use of the `RegExp` constructor in favor of regular expression literals
     * https://eslint.org/docs/latest/rules/prefer-regex-literals
     * Type: suggestion
     * Recommended: false
     */
    'prefer-regex-literals': 'off',

    /*
     * Require rest parameters instead of `arguments`
     * https://eslint.org/docs/latest/rules/prefer-rest-params
     * Type: suggestion
     * Recommended: false
     */
    'prefer-rest-params': 'error',

    /*
     * Require spread operators instead of `.apply()`
     * https://eslint.org/docs/latest/rules/prefer-spread
     * Type: suggestion
     * Recommended: false
     */
    'prefer-spread': 'error',

    /*
     * Require template literals instead of string concatenation
     * https://eslint.org/docs/latest/rules/prefer-template
     * Type: suggestion
     * Recommended: false
     */
    'prefer-template': 'error',

    /*
     * Enforce the consistent use of the radix argument when using `parseInt()`
     * https://eslint.org/docs/latest/rules/radix
     * Type: suggestion
     * Recommended: false
     */
    radix: 'error',

    /*
     * Disallow async functions which have no `await` expression
     * https://eslint.org/docs/latest/rules/require-await
     * Type: suggestion
     * Recommended: false
     */
    'require-await': 'off',

    /*
     * Enforce the use of `u` or `v` flag on RegExp
     * https://eslint.org/docs/latest/rules/require-unicode-regexp
     * Type: suggestion
     * Recommended: false
     */
    'require-unicode-regexp': 'off',

    /*
     * Require generator functions to contain `yield`
     * https://eslint.org/docs/latest/rules/require-yield
     * Type: suggestion
     * Recommended: true
     */
    'require-yield': 'error',

    /*
     * Enforce sorted import declarations within modules
     * https://eslint.org/docs/latest/rules/sort-imports
     * Type: suggestion
     * Recommended: false
     */
    'sort-imports': [
      'off',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    /*
     * Require object keys to be sorted
     * https://eslint.org/docs/latest/rules/sort-keys
     * Type: suggestion
     * Recommended: false
     */
    'sort-keys': [
      'off',
      'asc',
      { caseSensitive: true, natural: true, minKeys: 2 },
    ],

    /*
     * Require variables within the same declaration block to be sorted
     * https://eslint.org/docs/latest/rules/sort-vars
     * Type: suggestion
     * Recommended: false
     */
    'sort-vars': ['error', { ignoreCase: false }],

    /*
     * Require or disallow strict mode directives
     * https://eslint.org/docs/latest/rules/strict
     * Type: suggestion
     * Recommended: false
     */
    strict: ['error', 'global'],

    /*
     * Require symbol descriptions
     * https://eslint.org/docs/latest/rules/symbol-description
     * Type: suggestion
     * Recommended: false
     */
    'symbol-description': 'error',

    /*
     * Require `var` declarations be placed at the top of their containing scope
     * https://eslint.org/docs/latest/rules/vars-on-top
     * Type: suggestion
     * Recommended: false
     */
    'vars-on-top': 'error',

    /*
     * Require or disallow "Yoda" conditions
     * https://eslint.org/docs/latest/rules/yoda
     * Type: suggestion
     * Recommended: false
     */
    yoda: 'error',

    //#endregion SUGGESTION

    //#region LAYOUT

    /*
     * Enforce position of line comments
     * https://eslint.org/docs/latest/rules/line-comment-position
     * Type: layout
     * Recommended: false
     */
    'line-comment-position': 'off',

    /*
     * Require or disallow Unicode byte order mark (BOM)
     * https://eslint.org/docs/latest/rules/unicode-bom
     * Type: layout
     * Recommended: false
     */
    'unicode-bom': 'off',

    //#endregion LAYOUT

    //#endregion ESLint Core Rules},

    //#region @microsoft/eslint-plugin-sdl

    /*
     * When calling `Buffer.allocUnsafe` and `Buffer.allocUnsafeSlow`, the allocated
     * memory is not wiped-out and can contain old, potentially sensitive data.
     * https://github.com/microsoft/eslint-plugin-sdl/blob/master/docs/rules/no-unsafe-alloc.md
     * Type: suggestion
     * Recommended: false
     */
    '@microsoft/sdl/no-unsafe-alloc': 'error',

    //#endregion @microsoft/eslint-plugin-sdl

    //#region JSDoc

    //#region SUGGESTION

    /*
     * Checks that `@access` tags have a valid value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-access.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/check-access': 'error',

    /*
     * Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-examples.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/check-examples': 'off',

    /*
     * Ensures that parameter names in JSDoc match those in the function declaration.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-param-names.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/check-param-names': 'error',

    /*
     * Ensures that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-property-names.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/check-property-names': 'error',

    /*
     * Reports against syntax not valid for the mode (e.g., Google Closure Compiler in non-Closure mode).
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/check-syntax': 'off',

    /*
     * Reports invalid block tag names.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/check-tag-names': 'error',

    /*
     * Reports invalid types.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-types.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/check-types': 'error',

    /*
     * This rule checks the values for a handful of tags: `@version`, `@since`, `@license` and `@author`.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-values.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/check-values': 'error',

    /*
     * Expects specific tags to be empty of any content.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/empty-tags.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/empty-tags': 'error',

    /*
     * Reports an issue with any non-constructor function using `@implements`.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/implements-on-classes.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/implements-on-classes': 'error',

    /*
     * Reports if JSDoc `import()` statements point to a package which is not listed in `dependencies` or `devDependencies`
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/imports-as-dependencies.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/imports-as-dependencies': 'off',

    /*
     * This rule reports doc comments that only restate their attached name.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/informative-docs.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/informative-docs': 'off',

    /*
     * Enforces a regular expression pattern on descriptions.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-description.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/match-description': 'off',

    /*
     * Reports the name portion of a JSDoc tag if matching or not matching a given regular expression.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-name.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/match-name': 'off',

    /*
     * Controls how and whether jsdoc blocks can be expressed as single or multiple line blocks.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/multiline-blocks.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/multiline-blocks': 'error',

    /*
     * Removes empty blocks with nothing but possibly line breaks
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-blocks.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/no-blank-blocks': 'off',

    /*
     * This rule reports defaults being used on the relevant portion of `@param` or `@default`.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-defaults.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/no-defaults': 'off',

    /*
     * Reports when certain comment structures are always expected.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-missing-syntax.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/no-missing-syntax': 'off',

    /*
     * Prevents use of multiple asterisks at the beginning of lines.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-multi-asterisks.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/no-multi-asterisks': 'error',

    /*
     * Reports when certain comment structures are present.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-restricted-syntax.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/no-restricted-syntax': 'off',

    /*
     * This rule reports types being used on `@param` or `@returns`.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/no-types': 'off',

    /*
     * Checks that types in jsdoc comments are defined.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/no-undefined-types': 'error',

    /*
     * Requires that all functions have a description.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/require-description': 'off',

    /*
     * Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description-complete-sentence.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/require-description-complete-sentence': 'off',

    /*
     * Requires that all functions have examples.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-example.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/require-example': 'off',

    /*
     * Checks that all files have one `@file`, `@fileoverview`, or `@overview` tag at the beginning of the file.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-file-overview.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/require-file-overview': 'off',

    /*
     * Require JSDoc comments
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md#repos-sticky-header
     * Type: suggestion
     * Category: Stylistic Issues
     * Recommended: true
     */
    'jsdoc/require-jsdoc': 'off',

    /*
     * Requires that all function parameters are documented.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-param': 'off',

    /*
     * Requires that each `@param` tag has a `description` value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-description.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-param-description': 'off',

    /*
     * Requires that all function parameters have names.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-name.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-param-name': 'error',

    /*
     * Requires that each `@param` tag has a `type` value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-type.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-param-type': 'error',

    /*
     * Requires that all `@typedef` and `@namespace` tags have `@property` when their type is a plain `object`, `Object`, or `PlainObject`.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-property': 'error',

    /*
     * Requires that each `@property` tag has a `description` value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-description.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-property-description': 'off',

    /*
     * Requires that all function `@property` tags have names.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-name.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-property-name': 'error',

    /*
     * Requires that each `@property` tag has a `type` value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-type.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-property-type': 'error',

    /*
     * Requires that returns are documented.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-returns': 'error',

    /*
     * Requires a return statement in function body if a `@returns` tag is specified in jsdoc comment.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-check.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-returns-check': 'error',

    /*
     * Requires that the `@returns` tag has a `description` value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-description.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-returns-description': 'off',

    /*
     * Requires that `@returns` tag has `type` value.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-type.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-returns-type': 'error',

    /*
     * Requires that throw statements are documented.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/require-throws': 'off',

    /*
     * Requires yields are documented.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-yields': 'error',

    /*
     * Requires a yield statement in function body if a `@yields` tag is specified in jsdoc comment.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-check.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/require-yields-check': 'error',

    /*
     * Sorts tags by a specified sequence according to tag name.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/sort-tags.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/sort-tags': 'off',

    /*
     * Enforces lines (or no lines) between tags.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],

    /*
     * This rule can auto-escape certain characters that are input within block and tag descriptions.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/text-escaping.md#repos-sticky-header
     * Type: suggestion
     * Recommended: false
     */
    'jsdoc/text-escaping': 'off',

    /*
     * Requires all types to be valid JSDoc or Closure compiler types without syntax errors.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/valid-types.md#repos-sticky-header
     * Type: suggestion
     * Recommended: true
     */
    'jsdoc/valid-types': 'error',

    //#endregion SUGGESTION

    //#region LAYOUT

    /*
     * Reports invalid alignment of JSDoc block asterisks.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-alignment.md#repos-sticky-header
     * Type: layout
     * Recommended: true
     */
    'jsdoc/check-alignment': 'error',

    /*
     * Reports invalid padding inside JSDoc blocks.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-indentation.md#repos-sticky-header
     * Type: layout
     * Recommended: false
     */
    'jsdoc/check-indentation': 'off',

    /*
     * Reports invalid alignment of JSDoc block lines.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-line-alignment.md#repos-sticky-header
     * Type: layout
     * Recommended: false
     */
    'jsdoc/check-line-alignment': 'off',

    /*
     * This rule checks for multi-line-style comments which fail to meet the criteria of a jsdoc block.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-bad-blocks.md#repos-sticky-header
     * Type: layout
     * Recommended: false
     */
    'jsdoc/no-bad-blocks': 'off',

    /*
     * Detects and removes extra lines of a blank block description
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-block-descriptions.md#repos-sticky-header
     * Type: layout
     * Recommended: false
     */
    'jsdoc/no-blank-block-descriptions': 'off',

    /*
     * Requires that each JSDoc line starts with an `*`.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-asterisk-prefix.md#repos-sticky-header
     * Type: layout
     * Recommended: false
     */
    'jsdoc/require-asterisk-prefix': 'off',

    /*
     * Requires a hyphen before the `@param` description.
     * https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-hyphen-before-param-description.md#repos-sticky-header
     * Type: layout
     * Recommended: false
     */
    'jsdoc/require-hyphen-before-param-description': 'off',

    //#endregion LAYOUT

    //#endregion JSDoc

    //#region n

    //#region PROBLEM

    /*
     * Enforce Node.js-style error-first callback pattern is followed
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-callback-literal.md
     * Type: problem
     * Recommended: false
     */
    'n/no-callback-literal': 'off',

    /*
     * Disallow deprecated APIs
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-deprecated-api.md
     * Type: problem
     * Recommended: true
     */
    'n/no-deprecated-api': 'error',

    /*
     * Disallow the assignment to `exports`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-exports-assign.md
     * Type: problem
     * Recommended: true
     */
    'n/no-exports-assign': 'error',

    /*
     * Disallow `import` declarations which import extraneous modules
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-extraneous-import.md
     * Type: problem
     * Recommended: true
     */
    'n/no-extraneous-import': 'error',

    /*
     * Disallow `require()` expressions which import extraneous modules
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-extraneous-require.md
     * Type: problem
     * Recommended: true
     */
    'n/no-extraneous-require': [
      'error',
      {
        allowModules: [],
        resolvePaths: [],
        tryExtensions: ['.js', '.json', '.node'],
      },
    ],

    /*
     * Disallow `import` declarations which import non-existence modules
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-missing-import.md
     * Type: problem
     * Recommended: true
     */
    'n/no-missing-import': 'error',

    /*
     * Disallow `require()` expressions which import non-existence modules
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-missing-require.md
     * Type: problem
     * Recommended: true
     */
    'n/no-missing-require': 'error',

    /*
     * Disallow `bin` files that npm ignores
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-unpublished-bin.md
     * Type: problem
     * Recommended: true
     */
    'n/no-unpublished-bin': 'error',

    /*
     * Disallow `import` declarations which import private modules
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-unpublished-import.md
     * Type: problem
     * Recommended: true
     */
    'n/no-unpublished-import': 'error',

    /*
     * Disallow `require()` expressions which import private modules
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-unpublished-require.md
     * Type: problem
     * Recommended: true
     */
    'n/no-unpublished-require': 'error',

    /*
     * Require that `process.exit()` expressions use the same code path as `throw`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/process-exit-as-throw.md
     * Type: problem
     * Recommended: true
     */
    'n/process-exit-as-throw': 'error',

    /*
     * Require correct usage of shebang
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/shebang.md
     * Type: problem
     * Recommended: true
     */
    'n/shebang': 'error',

    //#endregion PROBLEM

    //#region SUGGESTION

    /*
     * Require `return` statements after callbacks
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/callback-return.md
     * Type: suggestion
     * Recommended: false
     */
    'n/callback-return': 'off',

    /*
     * Enforce either `module.exports` or `exports`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/exports-style.md
     * Type: suggestion
     * Recommended: false
     */
    'n/exports-style': 'off',

    /*
     * Enforce the style of file extensions in `import` declarations
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/file-extension-in-import.md
     * Type: suggestion
     * Recommended: false
     */
    'n/file-extension-in-import': 'off',

    /*
     * Require `require()` calls to be placed at top-level module scope
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/global-require.md
     * Type: suggestion
     * Recommended: false
     */
    'n/global-require': 'off',

    /*
     * Require error handling in callbacks
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/handle-callback-err.md
     * Type: suggestion
     * Recommended: false
     */
    'n/handle-callback-err': 'off',

    /*
     * Disallow `require` calls to be mixed with regular variable declarations
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-mixed-requires.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-mixed-requires': 'off',

    /*
     * Disallow `new` operators with calls to `require`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-new-require.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-new-require': 'off',

    /*
     * Disallow string concatenation with `__dirname` and `__filename`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-path-concat.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-path-concat': 'off',

    /*
     * Disallow the use of `process.env`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-process-env.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-process-env': 'off',

    /*
     * Disallow the use of `process.exit()`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-process-exit.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-process-exit': 'off',

    /*
     * Disallow specified modules when loaded by `import` declarations
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-restricted-import.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-restricted-import': 'off',

    /*
     * Disallow specified modules when loaded by `require`
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-restricted-require.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-restricted-require': 'off',

    /*
     * Disallow synchronous methods
     * https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-sync.md
     * Type: suggestion
     * Recommended: false
     */
    'n/no-sync': 'off',

    //#endregion SUGGESTION

    //#endregion n
  },
});
