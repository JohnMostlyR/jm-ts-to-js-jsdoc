/* istanbul ignore */
import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

import { glob } from 'glob';

import { log } from './logger/logger.mjs';
import { isDefined, isString, hasLength } from './utils/typings.mjs';

/**
 * @param {string} typescriptPath The path to the typescript file to be processed.
 * @param {string} [outputDir] The directory to write the output to.
 * @returns {string} The path for the generated javascript file.
 */
function inferName(typescriptPath, outputDir) {
  const thisFunctionNameTag = '[source-file-handler.inferName()]';
  let javascriptPath;

  const { dir, name, ext } = path.parse(typescriptPath);

  if (ext === '.ts') {
    javascriptPath = path.join(outputDir ?? dir, `${name}.js`);
  } else if (ext === '.tsx') {
    javascriptPath = path.join(outputDir ?? dir, `${name}.jsx`);
  } else {
    throw new Error(
      `${thisFunctionNameTag} Unsupported file extension, ${ext}, for '${typescriptPath}'`
    );
  }

  log.trace(
    `${thisFunctionNameTag} inferred output file path is '%s'`,
    javascriptPath
  );

  return javascriptPath;
}

/**
 * @param {string} typescriptPath - A directory holding TypeScript files, or a single TypeScript file.
 * @param {string} [javascriptPath] - A directory to write the transpiled TypeScript(s) to, or a single file name.
 * @returns {Promise<{ inputFilePath: string, outputFilePath: string }[]>}
 */
export async function sourceFileHandler(typescriptPath, javascriptPath) {
  const thisFunctionNameTag = '[source-file-handler.sourceFileHandler()]';

  /**
   * @type {{ inputFilePath: string, outputFilePath: string }[]}
   */
  const returnValues = [];

  try {
    const inputStat = await fsPromises.stat(typescriptPath);

    if (inputStat.isDirectory()) {
      log.trace(`${thisFunctionNameTag} input source is a directory`);

      if (
        isString(javascriptPath) === false ||
        hasLength(javascriptPath) === false
      ) {
        throw new Error(
          `${thisFunctionNameTag} No output directory given. This is required if the input is a directory.`
        );
      }

      const inputPathWithForwardSlashes = typescriptPath.replaceAll(
        path.sep,
        '/'
      );

      const files = await glob(`${inputPathWithForwardSlashes}/**/*.{ts,tsx}`, {
        ignore: {
          ignored: (p) => {
            if (/.+\.d\.ts$/.test(p.name)) return true;
            return false;
          },
        },
      });

      log.trace(
        `${thisFunctionNameTag} '.ts' or '.tsx' files found in '${typescriptPath}': %o`,
        files
      );

      const dirs = [...new Set(files.map((file) => path.dirname(file)))].sort();

      log.trace(
        `${thisFunctionNameTag} creating the destination directory '%s', if necessary`,
        javascriptPath
      );

      await fsPromises.mkdir(path.normalize(javascriptPath), {
        recursive: true,
      });

      for await (const dir of dirs) {
        const outDir = path.join(
          javascriptPath,
          path.relative(typescriptPath, dir)
        );

        if (outDir !== javascriptPath) {
          log.trace(
            `${thisFunctionNameTag} creating the destination subdirectory '%s', if necessary`,
            outDir
          );

          await fsPromises.mkdir(path.normalize(outDir), { recursive: true });
        }
      }

      for await (const file of files) {
        const inputDir = path.dirname(path.relative(typescriptPath, file));
        const outputName = inferName(file, path.join(javascriptPath, inputDir));

        const normalizedFile = path.normalize(file);
        const normalizedOutputName = path.normalize(outputName);

        const returnValue = {
          inputFilePath: normalizedFile,
          outputFilePath: normalizedOutputName,
        };

        returnValues.push(returnValue);
      }

      log.trace(
        `${thisFunctionNameTag} files to be processed: %o`,
        returnValues
      );

      return returnValues;
    }

    log.trace(
      `${thisFunctionNameTag} input is a single file '%s'`,
      typescriptPath
    );

    let inferredOutputName;

    if (javascriptPath) {
      const outputStat = await fsPromises
        .stat(javascriptPath)
        .catch((error) => {
          if (error && error.code === 'ENOENT') {
            return null;
          }

          throw error;
        });

      if (isDefined(outputStat) && outputStat.isDirectory()) {
        inferredOutputName = inferName(typescriptPath, javascriptPath);
      }
    } else {
      inferredOutputName = inferName(typescriptPath);
    }

    const javascriptOutputDir = path.dirname(inferredOutputName);

    if (javascriptOutputDir) {
      await fsPromises.mkdir(path.normalize(javascriptOutputDir), {
        recursive: true,
      });
    }

    const returnValue = {
      inputFilePath: path.normalize(typescriptPath),
      outputFilePath: path.normalize(inferredOutputName),
    };

    returnValues.push(returnValue);

    log.trace(`${thisFunctionNameTag} file to be processed: %o`, returnValues);

    return returnValues;
  } catch (error) {
    throw new Error(error.message);
  }
}
