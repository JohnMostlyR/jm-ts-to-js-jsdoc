/* istanbul ignore */

/**
 * @module transpileFile
 */

import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { log } from '../src/logger/logger.mjs';
import transpile from './transpile.mjs';
import { hasLength } from './utils/typings.mjs';

/**
 * @typedef {import('typescript').CompilerOptions} CompilerOptions
 */

/**
 * @typedef {import('./transpile.mjs').TranspileOptions} TranspileOptions
 */

/**
 * @async
 * @param {string} typescriptFilePath Source code to transpile
 * @param {string} javascriptFilePath
 * @param {import('./types.mjs').TranspileOptions} [options] Options for the transpiler
 * 		See https://www.typescriptlang.org/tsconfig#compilerOptions
 */
async function transpileFile(typescriptFilePath, javascriptFilePath, options) {
  log.info(`transpiling file: ${typescriptFilePath}`);

  const { ext } = path.parse(typescriptFilePath);
  const isJSX = ext.toLowerCase() === '.tsx';

  try {
    const typescript = await fsPromises.readFile(typescriptFilePath, 'utf8');
    const { javascript, error } = await transpile(typescript, isJSX, options);

    if (error) {
      log.warn(
        `An error occured while transpiling file: ${typescriptFilePath}`
      );

      const { oldText, newText } = error;
      const { name: typescriptName, ext: typescriptExt } =
        path.parse(typescriptFilePath);
      const { dir: javascriptDir } = path.parse(javascriptFilePath);

      if (hasLength(oldText)) {
        const filePathToOldText = path.join(
          javascriptDir,
          `${typescriptName}-ERROR-oldText${typescriptExt}`
        );

        await fsPromises.writeFile(filePathToOldText, oldText, 'utf8');

        log.warn(`The 'oldText' is written to: ${filePathToOldText}`);
      }

      if (hasLength(newText)) {
        const filePathToNewText = path.join(
          javascriptDir,
          `${typescriptName}-ERROR-newText${typescriptExt}`
        );

        await fsPromises.writeFile(filePathToNewText, newText, 'utf8');

        log.warn(`The 'newText' is written to: ${filePathToNewText}`);
      }
    } else {
      await fsPromises.writeFile(javascriptFilePath, javascript, 'utf8');

      log.info(`file is successfully transpiled to: ${javascriptFilePath}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export default transpileFile;
