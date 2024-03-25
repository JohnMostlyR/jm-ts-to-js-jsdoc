import * as path from 'node:path';
import { sourceFileHandler } from '../src/source-file-handler.mjs';
import transpileFile from '../src/transpile-file.mjs';
import { log } from '../src/logger/logger.mjs';

log.info('Starting with transpiling all TypeScripts in the demos folder...');

const folder = path.resolve('demos');
const input = 'input';
const output = 'output';

const inputFolder = path.join(folder, input);
const outputFolder = path.join(folder, output);

const sourceFiles = await sourceFileHandler(inputFolder, outputFolder);

for await (const sourceFile of sourceFiles) {
  const { inputFilePath, outputFileName } = sourceFile;

  await transpileFile(inputFilePath, outputFileName);
}

log.info('Finished with transpiling all TypeScripts in the demos folder.');
log.info(`You can find all transpiled files here: ${outputFolder}`);
