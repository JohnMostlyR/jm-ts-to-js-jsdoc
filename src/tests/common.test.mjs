import { describe, expect, it } from '@jest/globals';

import * as common from '../common.mjs';

describe('common', () => {
  describe('NewLine', () => {
    it('should have a "newline" property', () => {
      const output = '\n';
      const result = common.NewLine.newLine;
      expect(result).toBeDefined();
      expect(result).toBe(output);
    });

    it('should have a "twoNewLines" property', () => {
      const output = '\n\n';
      const result = common.NewLine.twoNewLines;
      expect(result).toBeDefined();
      expect(result).toBe(output);
    });
  });

  describe('Spaces', () => {
    it('should have a "noSpace" property', () => {
      const output = '';
      const result = common.Spaces.noSpace;
      expect(result).toBeDefined();
      expect(result).toBe(output);
    });

    it('should have a "oneSpace" property', () => {
      const output = ' ';
      const result = common.Spaces.oneSpace;
      expect(result).toBeDefined();
      expect(result).toBe(output);
    });

    it('should have a "twoSpaces" property', () => {
      const output = '  ';
      const result = common.Spaces.twoSpaces;
      expect(result).toBeDefined();
      expect(result).toBe(output);
    });

    it('should have a "fourSpaces" property', () => {
      const output = '    ';
      const result = common.Spaces.fourSpaces;
      expect(result).toBeDefined();
      expect(result).toBe(output);
    });
  });

  describe('sanitizeAStringForJsDoc()', () => {
    it('should replace tabs with spaces', () => {
      const input = 'a,\tb,\tc';
      const output = 'a, b, c';
      const result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);
    });

    it('should remove JSDoc', () => {
      let inputLines;
      let input;
      let outputLines;
      let output;
      let result;

      inputLines = [
        '{',
        '    /**',
        '     * Whether the view is visible.',
        '     *',
        '     * @defaultValue `true`',
        '     */',
        '    readonly visible?: boolean;',
        '// __1234_BLANK_LINE_MARKER__ //',
        '    /**',
        '     * The size of the view.',
        '     *',
        '     * @defaultValue `true`',
        '     */',
        '    readonly size: number;',
        '  }[]',
      ];

      input = inputLines.join('\n');

      outputLines = [
        '{',
        '    readonly visible?: boolean;',
        '// __1234_BLANK_LINE_MARKER__ //',
        '    readonly size: number;',
        '  }[]',
      ];

      output = outputLines.join('\n');
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      inputLines = [
        'class PointWIthMethods {',
        '  x = 10;',
        '  y = 10;',
        '// __1234_BLANK_LINE_MARKER__ //',
        '  scale(/** @type {number} */ n: number): void {',
        '    this.x *= n;',
        '    this.y *= n;',
        '  }',
        '}',
      ];

      input = inputLines.join('\n');

      outputLines = [
        'class PointWIthMethods {',
        '  x = 10;',
        '  y = 10;',
        '// __1234_BLANK_LINE_MARKER__ //',
        '  scale(n: number): void {',
        '    this.x *= n;',
        '    this.y *= n;',
        '  }',
        '}',
      ];

      output = outputLines.join('\n');
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);
    });

    it('should remove spaces before a punctuation character', () => {
      let input;
      let output;
      let result;

      input = 'Map<string[] , string[]>';
      output = 'Map<string[], string[]>';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      input = '{ a: string ; b: string }';
      output = '{ a: string; b: string }';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      input = 'That is the whole point .';
      output = 'That is the whole point.';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);
    });

    it('should pad block contents', () => {
      let input;
      let output;
      let result;

      input = '{}';
      output = '{}';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      input = '{ }';
      output = '{}';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      input = '{a: 1, b: 2}';
      output = '{ a: 1, b: 2 }';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      input = '{ a: 1, b: 2}';
      output = '{ a: 1, b: 2 }';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);

      input = '{a: 1, b: 2 }';
      output = '{ a: 1, b: 2 }';
      result = common.sanitizeAStringForJsDoc(input);
      expect(result).toBe(output);
    });
  });

  describe('convertTypeStringToJSDocType()', () => {
    it('should return the `unknown (?)` type when the input is `undefined`', () => {
      const output = '?';
      const result = common.convertTypeStringToJSDocType();
      expect(result).toBe(output);
    });

    it('should return the `unknown (?)` type when the input is an empty string', () => {
      const input = '';
      const output = '?';
      const result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);
    });

    it('should remove JavaScript single line comments', () => {
      const lines = [
        'T extends (...args: any[]) => TargetFunctionsReturnType',
        '? // Function: add param to function',
        '  (firstArg: FirstParameter, ...args: Parameters<T>) => ReturnType<T>',
        ': // Else: just leave as is',
        '  T',
      ];
      const input = lines.join('\n');
      const output =
        'T extends (...args: any[]) => TargetFunctionsReturnType ? (firstArg: FirstParameter, ...args: Parameters<T>) => ReturnType<T> : T';
      const result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);
    });

    it('should convert `Array<[type]>` to `([type])[]`', () => {
      let input;
      let output;
      let result;

      input = 'Array<string>';
      output = 'string[]';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Array<string | number>';
      output = '(string | number)[]';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Array<{key: string, value: number}>';
      output = '{key: string, value: number}[]';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);
    });

    it('should convert the `any` type to `*`', () => {
      let input;
      let output;
      let result;

      input = 'any';
      output = '*';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'any[]';
      output = '*[]';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<any, any>';
      output = 'Map<*, *>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<any[], any>';
      output = 'Map<*[], *>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<any, any[]>';
      output = 'Map<*, *[]>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<any[], any[]>';
      output = 'Map<*[], *[]>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<any, boolean>';
      output = 'Map<*, boolean>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<boolean, any>';
      output = 'Map<boolean, *>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);
    });

    it('should convert the `unknown` type to `?`', () => {
      let input;
      let output;
      let result;

      input = 'unknown';
      output = '?';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'unknown[]';
      output = '?[]';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<unknown, unknown>';
      output = 'Map<?, ?>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<unknown[], unknown>';
      output = 'Map<?[], ?>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<unknown, unknown[]>';
      output = 'Map<?, ?[]>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<unknown[], unknown[]>';
      output = 'Map<?[], ?[]>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<unknown, boolean>';
      output = 'Map<?, boolean>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);

      input = 'Map<boolean, unknown>';
      output = 'Map<boolean, ?>';
      result = common.convertTypeStringToJSDocType(input);
      expect(result).toBe(output);
    });
  });
});
