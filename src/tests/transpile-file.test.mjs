import { describe, expect, it } from '@jest/globals';

import transpileFile from '../transpile-file.mjs';

describe('transpile-file', function () {
  it('should, by default, export a function', function () {
    expect(typeof transpileFile).toBe('function');
  });
});
