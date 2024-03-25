import 'dotenv/config';

import * as process from 'node:process';
import { Command } from 'commander';

import { testing } from '../src/utils/index.mjs';

const program = new Command();

async function actionHandler(options) {
  const { missingExpectFiles, missingSourceFiles, unusedSourceFiles } = options;

  if (missingExpectFiles) {
    const sourcesWithoutAnExpect =
      await testing.listAllSourcesWithoutAnExpect();

    for (const fileName of sourcesWithoutAnExpect) {
      console.log(`source file: ${fileName}, does not have an expect file.`);
    }
  }

  if (missingSourceFiles) {
    const expectsWithoutASource = await testing.listAllExpectsWithoutASource();

    for (const fileName of expectsWithoutASource) {
      console.log(`expect file: ${fileName}, does not have a source file.`);
    }
  }

  if (unusedSourceFiles) {
    // console.log(`unused source files: ${listAllUnusedSourceFiles}, are unused.`);
    console.log('not implemented yet');
  }
}

program
  .option(
    '--missing-expect-files',
    'report file names for all source files that do not have an accompanied expect file'
  )
  .option(
    '--missing-source-files',
    'report file names for all expect files that do not have an accompanied source file'
  )
  .option('--unused-source-files', 'report unused source files')
  .action(actionHandler)
  .showHelpAfterError();

await program.parseAsync(process.argv);
