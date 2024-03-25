import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { glob } from 'glob';

import { isString, hasLength } from './typings.mjs';

export const FIXTURE_FOLDER_PATH = path.resolve(
  path.join('.', 'src', 'tests', 'fixtures')
);
export const SOURCES_FOLDER = path.join(FIXTURE_FOLDER_PATH, 'sources');
export const EXPECTS_FOLDER = path.join(FIXTURE_FOLDER_PATH, 'expects');

export function convertBackslashesToForwardslashes(string) {
  return string.replaceAll(/\\/g, '/');
}

/**
 * @param {string} folder - Path to an existing folder
 * @returns {Promise<Set<string>>}
 */
export async function listAllFileNamesInFolder(folder) {
  const files = await glob(convertBackslashesToForwardslashes(`${folder}/*.*`));

  const fileNames = files.map((file) => {
    const { name } = path.parse(file);
    return name;
  });

  return Promise.resolve(new Set(fileNames));
}

/**
 * @param {Set<any>} setA
 * @param {Set<any>} setB
 * @returns {Set<any>} Returns all of set A that are not in set B
 */
export function differenceBetweenSets(setA, setB) {
  const difference = new Set([...setA].filter((x) => !setB.has(x)));

  return difference;
}

/**
 * @param {Set<any>} setA
 * @param {Set<any>} setB
 * @returns {Set<any>}
 */
export function intersectionBetweenSets(setA, setB) {
  const intersection = new Set([...setA].filter((x) => setB.has(x)));

  return intersection;
}

/**
 * @param {string} [sourcesFolder]
 * @param {string} [expectsFolder]
 * @returns {Promise<Set<string>>}
 */
export async function listAllSourcesWithoutAnExpect(
  sourcesFolder = SOURCES_FOLDER,
  expectsFolder = EXPECTS_FOLDER
) {
  const sourceFiles = await listAllFileNamesInFolder(sourcesFolder);
  const expectFiles = await listAllFileNamesInFolder(expectsFolder);

  const difference = differenceBetweenSets(sourceFiles, expectFiles);

  return Promise.resolve(difference);
}

/**
 * @param {string} [sourcesFolder]
 * @param {string} [expectsFolder]
 * @returns {Promise<Set<string>>}
 */
export async function listAllExpectsWithoutASource(
  sourcesFolder = SOURCES_FOLDER,
  expectsFolder = EXPECTS_FOLDER
) {
  const sourceFiles = await listAllFileNamesInFolder(sourcesFolder);
  const expectFiles = await listAllFileNamesInFolder(expectsFolder);

  const difference = differenceBetweenSets(expectFiles, sourceFiles);

  return Promise.resolve(difference);
}

/**
 * @param {string} [sourcesFolder]
 * @param {string} [expectsFolder]
 * @returns {Promise<Set<string>>}
 */
export async function listAllExistingFixtures(
  sourcesFolder = SOURCES_FOLDER,
  expectsFolder = EXPECTS_FOLDER
) {
  const sourceFiles = await listAllFileNamesInFolder(sourcesFolder);
  const expectFiles = await listAllFileNamesInFolder(expectsFolder);

  const intersection = intersectionBetweenSets(expectFiles, sourceFiles);

  return Promise.resolve(intersection);
}

async function getFileContents(filePath) {
  let fileContents = '';

  try {
    fileContents = await fsPromises.readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`fixture:\n\t'${filePath}'\ndoes not exist`);
    } else {
      throw new Error(error.message);
    }
  }

  return fileContents;
}

/**
 * @param {string} filename
 * @param {string} [sourcesFolder]
 * @param {boolean} [isJSX=false]
 * @returns {Promise<string>}
 */
function getSourceFileContents(
  filename,
  sourcesFolder = SOURCES_FOLDER,
  isJSX = false
) {
  const ext = isJSX ? 'tsx' : 'ts';
  const pathTo = path.join(sourcesFolder, `${filename}.${ext}`);

  return getFileContents(pathTo);
}

/**
 * @param {string} filename
 * @param {string} [expectsFolder]
 * @param {boolean} [isJSX=false]
 * @returns {Promise<string>}
 */
function getExpectedFileContents(
  filename,
  expectsFolder = EXPECTS_FOLDER,
  isJSX = false
) {
  const ext = isJSX ? 'jsx' : 'js';
  const pathTo = path.join(expectsFolder, `${filename}.${ext}`);

  return getFileContents(pathTo);
}

/**
 * @param {string} fileName
 * @param {boolean} [isJSX=false]
 * @param {string} [sourcesFolder]
 * @param {string} [expectsFolder]
 * @returns {Promise<{ source: string, expected: string}>}
 */
export async function getFixture(
  fileName,
  isJSX = false,
  sourcesFolder = SOURCES_FOLDER,
  expectsFolder = EXPECTS_FOLDER
) {
  let fixture = {};

  try {
    const source = await getSourceFileContents(fileName, sourcesFolder, isJSX);
    const expected = await getExpectedFileContents(
      fileName,
      expectsFolder,
      isJSX
    );

    if (
      isString(source) &&
      hasLength(source) &&
      isString(expected) &&
      hasLength(expected)
    ) {
      fixture = { source, expected };
    } else {
      console.error(
        `fixture '${fileName}' does not exist in either the sources or expects folder`
      );
    }
  } catch (error) {
    throw new Error(error);
  }

  return Promise.resolve(fixture);
}
