import { describe, expect, it } from '@jest/globals';

import * as typings from '../typings.mjs';

describe('typings', () => {
  describe('isUndefined()', () => {
    it('should return "true" when the input is of type undefined', () => {
      const expected = true;
      const output = typings.isUndefined(undefined);

      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not undefined', () => {
      const expected = false;
      let output;

      output = typings.isUndefined(null);
      expect(output).toBe(expected);

      output = typings.isUndefined(true);
      expect(output).toBe(expected);

      output = typings.isUndefined(false);
      expect(output).toBe(expected);

      output = typings.isUndefined(42);
      expect(output).toBe(expected);

      output = typings.isUndefined('foo');
      expect(output).toBe(expected);

      output = typings.isUndefined([]);
      expect(output).toBe(expected);

      output = typings.isUndefined([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isUndefined({});
      expect(output).toBe(expected);

      output = typings.isUndefined({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isUndefined(/test/);
      expect(output).toBe(expected);

      output = typings.isUndefined(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isUndefined(new Date());
      expect(output).toBe(expected);

      output = typings.isUndefined(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isUndefinedOrNull()', () => {
    it('should return "true" when the input is of type undefined or null', () => {
      const expected = true;
      let output;

      output = typings.isUndefinedOrNull(undefined);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(null);
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not undefined or null', () => {
      const expected = false;
      let output;

      output = typings.isUndefinedOrNull(true);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(false);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(42);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull('foo');
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull([]);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull({});
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(/test/);
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(new Date());
      expect(output).toBe(expected);

      output = typings.isUndefinedOrNull(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isDefined()', () => {
    it('should return "true" when the input is defined', () => {
      const expected = true;
      let output;

      output = typings.isDefined(true);
      expect(output).toBe(expected);

      output = typings.isDefined(false);
      expect(output).toBe(expected);

      output = typings.isDefined(42);
      expect(output).toBe(expected);

      output = typings.isDefined('foo');
      expect(output).toBe(expected);

      output = typings.isDefined([]);
      expect(output).toBe(expected);

      output = typings.isDefined([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isDefined({});
      expect(output).toBe(expected);

      output = typings.isDefined({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isDefined(/test/);
      expect(output).toBe(expected);

      output = typings.isDefined(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isDefined(new Date());
      expect(output).toBe(expected);

      output = typings.isDefined(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not defined', () => {
      const expected = false;
      let output;

      output = typings.isDefined(undefined);
      expect(output).toBe(expected);

      output = typings.isDefined(null);
      expect(output).toBe(expected);
    });
  });

  describe('isBoolean()', () => {
    it('should return "true" when the input is of type Boolean', () => {
      const expected = true;
      let output;

      output = typings.isBoolean(true);
      expect(output).toBe(expected);

      output = typings.isBoolean(false);
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type Boolean', () => {
      const expected = false;
      let output;

      output = typings.isBoolean(undefined);
      expect(output).toBe(expected);

      output = typings.isBoolean(null);
      expect(output).toBe(expected);

      output = typings.isBoolean(42);
      expect(output).toBe(expected);

      output = typings.isBoolean('foo');
      expect(output).toBe(expected);

      output = typings.isBoolean([]);
      expect(output).toBe(expected);

      output = typings.isBoolean([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isBoolean({});
      expect(output).toBe(expected);

      output = typings.isBoolean({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isBoolean(/test/);
      expect(output).toBe(expected);

      output = typings.isBoolean(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isBoolean(new Date());
      expect(output).toBe(expected);

      output = typings.isBoolean(function () {
        /* empty */
      });
      expect(output).toBe(expected);

      output = typings.isBoolean(0);
      expect(output).toBe(expected);

      output = typings.isBoolean(1);
      expect(output).toBe(expected);
    });
  });

  describe('isNumber()', () => {
    it('should return "true" when the input is of type Number', () => {
      const expected = true;
      const output = typings.isNumber(42);

      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type Number', () => {
      const expected = false;
      let output;

      output = typings.isNumber(undefined);
      expect(output).toBe(expected);

      output = typings.isNumber(null);
      expect(output).toBe(expected);

      output = typings.isNumber(true);
      expect(output).toBe(expected);

      output = typings.isNumber(false);
      expect(output).toBe(expected);

      output = typings.isNumber('foo');
      expect(output).toBe(expected);

      output = typings.isNumber([]);
      expect(output).toBe(expected);

      output = typings.isNumber([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isNumber({});
      expect(output).toBe(expected);

      output = typings.isNumber({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isNumber(/test/);
      expect(output).toBe(expected);

      output = typings.isNumber(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isNumber(new Date());
      expect(output).toBe(expected);

      output = typings.isNumber(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isString()', () => {
    it('should return "true" when the input is of type String', () => {
      const expected = true;

      const output = typings.isString('foo');

      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type String', () => {
      const expected = false;
      let output;

      output = typings.isString(undefined);
      expect(output).toBe(expected);

      output = typings.isString(null);
      expect(output).toBe(expected);

      output = typings.isString(true);
      expect(output).toBe(expected);

      output = typings.isString(false);
      expect(output).toBe(expected);

      output = typings.isString(42);
      expect(output).toBe(expected);

      output = typings.isString([]);
      expect(output).toBe(expected);

      output = typings.isString([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isString({});
      expect(output).toBe(expected);

      output = typings.isString({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isString(/test/);
      expect(output).toBe(expected);

      output = typings.isString(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isString(new Date());
      expect(output).toBe(expected);

      output = typings.isString(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isArray()', () => {
    it('should return "true" when the input is of type Array', () => {
      const expected = true;
      let output;

      output = typings.isArray([]);
      expect(output).toBe(expected);

      output = typings.isArray([1, 2, '3']);
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type Array', () => {
      const expected = false;
      let output;

      output = typings.isArray(undefined);
      expect(output).toBe(expected);

      output = typings.isArray(null);
      expect(output).toBe(expected);

      output = typings.isArray(true);
      expect(output).toBe(expected);

      output = typings.isArray(false);
      expect(output).toBe(expected);

      output = typings.isArray(42);
      expect(output).toBe(expected);

      output = typings.isArray('foo');
      expect(output).toBe(expected);

      output = typings.isArray({});
      expect(output).toBe(expected);

      output = typings.isArray({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isArray(/test/);
      expect(output).toBe(expected);

      output = typings.isArray(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isArray(new Date());
      expect(output).toBe(expected);

      output = typings.isArray(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isObject()', () => {
    it('should return "true" when the input is of type Object', () => {
      const expected = true;
      let output;

      output = typings.isObject({});
      expect(output).toBe(expected);

      output = typings.isObject({ foo: 'bar' });
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type Object', () => {
      const expected = false;
      let output;

      output = typings.isObject(undefined);
      expect(output).toBe(expected);

      output = typings.isObject(null);
      expect(output).toBe(expected);

      output = typings.isObject(true);
      expect(output).toBe(expected);

      output = typings.isObject(false);
      expect(output).toBe(expected);

      output = typings.isObject(42);
      expect(output).toBe(expected);

      output = typings.isObject('foo');
      expect(output).toBe(expected);

      output = typings.isObject([]);
      expect(output).toBe(expected);

      output = typings.isObject([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isObject(/test/);
      expect(output).toBe(expected);

      output = typings.isObject(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isObject(new Date());
      expect(output).toBe(expected);

      output = typings.isObject(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isEmptyObject()', () => {
    it('should return "true" when the input is an empty Object', () => {
      const expected = true;
      const output = typings.isEmptyObject({});
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not an empty Object', () => {
      const expected = false;
      let output;

      output = typings.isEmptyObject(undefined);
      expect(output).toBe(expected);

      output = typings.isEmptyObject(null);
      expect(output).toBe(expected);

      output = typings.isEmptyObject(true);
      expect(output).toBe(expected);

      output = typings.isEmptyObject(false);
      expect(output).toBe(expected);

      output = typings.isEmptyObject(42);
      expect(output).toBe(expected);

      output = typings.isEmptyObject('foo');
      expect(output).toBe(expected);

      output = typings.isEmptyObject([]);
      expect(output).toBe(expected);

      output = typings.isEmptyObject([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isEmptyObject({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isEmptyObject(/test/);
      expect(output).toBe(expected);

      output = typings.isEmptyObject(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isEmptyObject(new Date());
      expect(output).toBe(expected);

      output = typings.isEmptyObject(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isRegExp()', () => {
    it('should return "true" when the input is of type RegExp', () => {
      const expected = true;
      let output;

      output = typings.isRegExp(/test/);
      expect(output).toBe(expected);

      output = typings.isRegExp(new RegExp(''));
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type RegExp', () => {
      const expected = false;
      let output;

      output = typings.isRegExp(undefined);
      expect(output).toBe(expected);

      output = typings.isRegExp(null);
      expect(output).toBe(expected);

      output = typings.isRegExp(true);
      expect(output).toBe(expected);

      output = typings.isRegExp(false);
      expect(output).toBe(expected);

      output = typings.isRegExp(42);
      expect(output).toBe(expected);

      output = typings.isRegExp('foo');
      expect(output).toBe(expected);

      output = typings.isRegExp([]);
      expect(output).toBe(expected);

      output = typings.isRegExp([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isRegExp({});
      expect(output).toBe(expected);

      output = typings.isRegExp({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isRegExp(new Date());
      expect(output).toBe(expected);

      output = typings.isRegExp(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });

  describe('isFunction()', () => {
    it('should return "true" when the input is of type Function', () => {
      const expected = true;
      const output = typings.isFunction(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });

    it('should return "false" when the input is not of type Function', () => {
      const expected = false;
      let output;

      output = typings.isFunction(undefined);
      expect(output).toBe(expected);

      output = typings.isFunction(null);
      expect(output).toBe(expected);

      output = typings.isFunction(true);
      expect(output).toBe(expected);

      output = typings.isFunction(false);
      expect(output).toBe(expected);

      output = typings.isFunction(42);
      expect(output).toBe(expected);

      output = typings.isFunction('foo');
      expect(output).toBe(expected);

      output = typings.isFunction([]);
      expect(output).toBe(expected);

      output = typings.isFunction([1, 2, '3']);
      expect(output).toBe(expected);

      output = typings.isFunction({});
      expect(output).toBe(expected);

      output = typings.isFunction({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.isFunction(/test/);
      expect(output).toBe(expected);

      output = typings.isFunction(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.isFunction(new Date());
      expect(output).toBe(expected);
    });
  });

  describe('castAsBooleanIfPossible()', () => {
    it('should return a Boolean as-is', () => {
      let input = true;
      let expected = true;
      let output;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = false;
      expected = false;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should cast "undefined", or "null" to Boolean "false"', () => {
      const expected = false;
      let output;

      output = typings.castAsBooleanIfPossible(undefined);
      expect(output).toBe(expected);

      output = typings.castAsBooleanIfPossible(null);
      expect(output).toBe(expected);
    });

    it('should cast numeric 0 to Boolean "false"', () => {
      const input = 0;
      const expected = false;
      const output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should cast numeric 1 to Boolean "true"', () => {
      const input = 1;
      const expected = true;
      const output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should cast String "0" to Boolean "false"', () => {
      const input = '0';
      const expected = false;
      const output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should cast String "1" to Boolean "true"', () => {
      const input = '1';
      const expected = true;
      const output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should cast String "false" to Boolean "false"', () => {
      const input = 'false';
      const expected = false;
      const output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should cast String "true" to Boolean "true"', () => {
      const input = 'true';
      const expected = true;
      const output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });

    it('should return anything that makes no sense as a Boolean as-is', () => {
      let input = 42;
      let expected = 42;
      let output;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = 'foo';
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = [];
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = [1, 2, '3'];
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = {};
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = { foo: 'bar' };
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = /test/;
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = new RegExp('');
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);

      input = new Date();
      expected = input;

      output = typings.castAsBooleanIfPossible(new Date());
      expect(output).toStrictEqual(expected);

      input = function () {
        /* empty */
      };
      expected = input;

      output = typings.castAsBooleanIfPossible(input);
      expect(output).toBe(expected);
    });
  });

  describe('hasLength()', () => {
    it('should return "true" when the input any length', () => {
      let output = typings.hasLength('A string');
      expect(output).toBe(true);

      output = typings.hasLength([1, 2, '3']);
      expect(output).toBe(true);
    });

    it('should return "false" when the input has no length', () => {
      const expected = false;
      let output;

      output = typings.hasLength(undefined);
      expect(output).toBe(expected);

      output = typings.hasLength(null);
      expect(output).toBe(expected);

      output = typings.hasLength(true);
      expect(output).toBe(expected);

      output = typings.hasLength(false);
      expect(output).toBe(expected);

      output = typings.hasLength(42);
      expect(output).toBe(expected);

      output = typings.hasLength('');
      expect(output).toBe(expected);

      output = typings.hasLength([]);
      expect(output).toBe(expected);

      output = typings.hasLength({});
      expect(output).toBe(expected);

      output = typings.hasLength({ foo: 'bar' });
      expect(output).toBe(expected);

      output = typings.hasLength(/test/);
      expect(output).toBe(expected);

      output = typings.hasLength(new RegExp(''));
      expect(output).toBe(expected);

      output = typings.hasLength(new Date());
      expect(output).toBe(expected);

      output = typings.isObject(function () {
        /* empty */
      });
      expect(output).toBe(expected);
    });
  });
});
