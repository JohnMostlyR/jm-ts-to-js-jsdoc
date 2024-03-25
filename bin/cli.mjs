#!/usr/bin/env node
import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';

import { Command, Option } from 'commander';

import { log } from '../src/logger/logger.mjs';
import { sourceFileHandler } from '../src/source-file-handler.mjs';
import transpileFile from '../src/transpile-file.mjs';

/**
 * @typedef {import('../src/logger/logger.mjs').levels} levels
 * @typedef {import('../src/types.mjs').TranspileOptions} TranspileOptions
 */

const program = new Command();

let packageJson = {};

try {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const packageJsonString = await readFile(
    resolve(__dirname, '..', 'package.json'),
    {
      encoding: 'utf8',
    }
  );
  packageJson = JSON.parse(packageJsonString);
} catch (error) {
  program.error(error.message);
}

/**
 * @param {string} typescriptPath - The path to the typescript source directory or file.
 * @param {string} [javascriptPath] - The path to the javascript destination directory or file.
 * @param {TranspileOptions & { logLevel: levels }} [options] - Options
 * @returns {Promise<boolean>}
 */
const actionHandler = async function actionHandler(
  typescriptPath,
  javascriptPath,
  options = { logLevel: 'warn' }
) {
  const { logLevel, ...restOptions } = options;

  log.level = logLevel;
  log.trace('entered options: %o', options);

  try {
    const sourceFiles = await sourceFileHandler(typescriptPath, javascriptPath);

    for await (const sourceFile of sourceFiles) {
      const { inputFilePath, outputFilePath } = sourceFile;

      await transpileFile(inputFilePath, outputFilePath, restOptions);
    }

    log.end();

    return true;
  } catch (error) {
    program.error(error.message);
  }
};

program
  .name(packageJson.name.replace(/\W/g, '-').replace(/^\W/, ''))
  .version(packageJson.version, '-v, --version', 'display the version number')
  .addOption(
    new Option('-l, --log-level <level>', 'the level of logging to use')
      .choices(['error', 'warn', 'info', 'debug', 'trace'])
      .default('warn')
  )
  .option('--add-type-documentation', 'Add type documentation as JSDoc', true)
  .option(
    '-p, --ts-config-file-path [tsConfigFilePath]',
    'The path to a tsconfig.json file'
  )
  .argument('<input>', 'Input file or directory')
  .argument(
    '[output]',
    'Output file or directory, (optional if it can be inferred)'
  )
  .action(actionHandler)
  .showHelpAfterError();

await program.parseAsync(process.argv);
