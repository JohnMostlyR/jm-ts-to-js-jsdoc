import { describe, expect, it } from '@jest/globals';

import * as arrays from '../arrays.mjs';

describe('arrays', () => {
  describe('#getLastElement()', () => {
    it('returns the last element in the array', () => {
      let input = [];
      let output;
      let result;

      input = [1, 2, 3];
      output = 3;

      result = arrays.getLastElement(input);

      expect(result).toBe(output);

      input = [1, 2, '3'];
      output = '3';

      result = arrays.getLastElement(input);

      expect(result).toBe(output);

      input = [{ one: 1 }, { two: 2 }, { three: 3 }];
      output = { three: 3 };

      result = arrays.getLastElement(input);

      expect(result).toStrictEqual(output);

      input = [{ one: 1 }];
      output = { one: 1 };

      result = arrays.getLastElement(input);

      expect(result).toStrictEqual(output);
    });

    it('returns `undefined` for an empty array', () => {
      const input = [];
      const output = undefined;

      const result = arrays.getLastElement(input);

      expect(result).toBe(output);
    });

    it('returns `undefined` if the input is not an array', () => {
      const input = '';
      const output = undefined;

      const result = arrays.getLastElement(input);

      expect(result).toBe(output);
    });
  });
});
