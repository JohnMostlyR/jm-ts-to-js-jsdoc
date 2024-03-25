import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { describe, expect, it } from '@jest/globals';

import * as testing from '../testing.mjs';

const LOCAL_FIXTURE_FOLDER_PATH = path.resolve(
  path.join('.', 'src', 'utils', 'tests', 'fixtures')
);
const LOCAL_SOURCES_FOLDER = path.join(LOCAL_FIXTURE_FOLDER_PATH, 'sources');
const LOCAL_EXPECTS_FOLDER = path.join(LOCAL_FIXTURE_FOLDER_PATH, 'expects');

describe('testing', function () {
  it("should have a constant that holds an existing path to a 'fixtures' folder", async function () {
    const input = testing.FIXTURE_FOLDER_PATH;
    const inputStat = await fsPromises.stat(input);
    const output = inputStat.isDirectory();

    expect(output).toBe(true);
  });

  it("should have a constant that holds an existing path to a 'sources' folder", async function () {
    const input = testing.SOURCES_FOLDER;
    const inputStat = await fsPromises.stat(input);
    const output = inputStat.isDirectory();

    expect(output).toBe(true);
  });

  it("should have a constant that holds an existing path to an 'expects' folder", async function () {
    const input = testing.EXPECTS_FOLDER;
    const inputStat = await fsPromises.stat(input);
    const output = inputStat.isDirectory();

    expect(output).toBe(true);
  });

  describe('#convertBackslashesToForwardslashes()', function () {
    it('should convert all backslashes in a string to forward slashes', function () {
      const input = 'C:\\\\some\\windows\\path\\to\\knowwhere';
      const expected = 'C://some/windows/path/to/knowwhere';
      const output = testing.convertBackslashesToForwardslashes(input);

      expect(output).toBe(expected);
    });
  });

  describe('#listAllFileNamesInFolder()', function () {
    it('should return a list of all files in a folder', async function () {
      const input = LOCAL_SOURCES_FOLDER;
      const output = await testing.listAllFileNamesInFolder(input);

      expect(output.size).toBe(4);
    });

    it('should not throw an error when the folder does not exist', async function () {
      const input = 'path/to/knowwhere/';

      expect(
        async () => await testing.listAllFileNamesInFolder(input)
      ).not.toThrowError();
    });
  });

  describe('#listAllSourcesWithoutAnExpect()', function () {
    it('should return a set of source files that do not have an accompanied expect file', async function () {
      const output = await testing.listAllSourcesWithoutAnExpect(
        LOCAL_SOURCES_FOLDER,
        LOCAL_EXPECTS_FOLDER
      );

      expect(output.size).toBe(2);
    });

    it('should not throw an error when the folder(s) does(do) not exist', async function () {
      expect(
        async () => await testing.listAllSourcesWithoutAnExpect()
      ).not.toThrowError();
    });
  });

  describe('#listAllExpectsWithoutASource()', function () {
    it('should return a set of expect files that do not have an accompanied source file', async function () {
      const output = await testing.listAllExpectsWithoutASource(
        LOCAL_SOURCES_FOLDER,
        LOCAL_EXPECTS_FOLDER
      );

      expect(output.size).toBe(1);
    });

    it('should not throw an error when the folder(s) does(do) not exist', async function () {
      expect(
        async () => await testing.listAllExpectsWithoutASource()
      ).not.toThrowError();
    });
  });

  describe('#listAllExistingFixtures()', function () {
    it('should return a set of files names that have a source and expect pair', async function () {
      const output = await testing.listAllExistingFixtures(
        LOCAL_SOURCES_FOLDER,
        LOCAL_EXPECTS_FOLDER
      );

      expect(output.size).toBe(2);
    });

    it('should not throw an error when the folder(s) does(do) not exist', async function () {
      expect(
        async () => await testing.listAllExistingFixtures()
      ).not.toThrowError();
    });
  });

  describe('#getFixture()', function () {
    it('should return the source, and expected code for a given file name', async function () {
      const input = 'fixture-two';
      const sourceFileContents = await fsPromises.readFile(
        path.join(LOCAL_SOURCES_FOLDER, `${input}.ts`),
        'utf8'
      );
      const expectFileContents = await fsPromises.readFile(
        path.join(LOCAL_EXPECTS_FOLDER, `${input}.js`),
        'utf8'
      );

      const output = await testing.getFixture(
        input,
        false,
        LOCAL_SOURCES_FOLDER,
        LOCAL_EXPECTS_FOLDER
      );

      expect(output).toStrictEqual({
        source: sourceFileContents,
        expected: expectFileContents,
      });
    });

    it('should support "jsx" files', async function () {
      const input = 'fixture-tsx';
      const sourceFileContents = await fsPromises.readFile(
        path.join(LOCAL_SOURCES_FOLDER, `${input}.tsx`),
        'utf8'
      );
      const expectFileContents = await fsPromises.readFile(
        path.join(LOCAL_EXPECTS_FOLDER, `${input}.jsx`),
        'utf8'
      );

      const output = await testing.getFixture(
        input,
        true,
        LOCAL_SOURCES_FOLDER,
        LOCAL_EXPECTS_FOLDER
      );

      expect(output).toStrictEqual({
        source: sourceFileContents,
        expected: expectFileContents,
      });
    });
  });
});
