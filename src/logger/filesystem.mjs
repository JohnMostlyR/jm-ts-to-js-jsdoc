import * as path from 'node:path';
import * as process from 'node:process';

const Config = {
  logDirectory: path.join(process.cwd()),
  appName: 'jm-ts-to-js-jsdoc',
};

/**
 * @param {string} logDirectory
 * @param {string} logFileName
 * @returns {string}
 */
function getLogFilePath(
  logDirectory = Config.logDirectory,
  logFileName = Config.appName
) {
  return path.join(logDirectory, `${logFileName}.log`);
}

/**
 * Creates the directory if needed and makes a copy of the current log file.
 *
 * @param {string} [logDirectory] The directory to hold the log files
 * @param {string} [appName] The name of the log file, [name].log
 * @returns {string} Returns the path to the new log file
 */
export function createLogFile(
  logDirectory = Config.logDirectory,
  appName = Config.appName
) {
  const logFilePath = getLogFilePath(logDirectory, appName);

  return logFilePath;
}
