/**
 * @module Logger
 * @description Outputs logging to the console as well as to a file.
 * The level of logging to a file is determined by setting the log.level.
 * The level of logging to the console is fixed at 'info' level.
 * @example
 * ```js
 * import { log } from '../src/logger/logger.mjs';
 *
 * log.level = 'debug'; // set level for the file transport
 * log.debug('Transpiling all in demos folder');
 * ```
 */

import * as fs from 'node:fs';

import memoizeOne from 'memoize-one';
import * as winston from 'winston';

import { createLogFile } from './filesystem.mjs';

const { format, transports } = winston;

/**
 * @typedef {import('winston').Logform.TransformableInfo} TransformableInfo
 * @typedef {import('winston').transports.ConsoleTransportOptions} ConsoleTransportOptions
 * @typedef {import('winston').transports.FileTransportOptions} FileTransportOptions
 */

/**
 * @typedef {'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'} levels
 */

const winstonConfig = {
  levels: {
    /**
     * Events that prevent crucial business functions from working.
     * In situations like this, the application cannot usually recover, so
     * immediate attention is required to fix such issues.
     */
    fatal: 0,

    /**
     * Any error that prevents normal program execution.
     * The application can usually continue to function, but the error must be
     * addressed if it persists.
     */
    error: 1,

    /**
     * Events that are unexpected but recoverable.
     * You can also use it to indicate potential problems in the system that need
     * to be mitigated before they become actual errors.
     */
    warn: 2,

    /**
     * Capture typical or expected events that occurred during normal program
     * execution, usually things that are notable from a business logic perspective.
     */
    info: 3,

    /**
     * Any messages that may be needed for troubleshooting or diagnosing issues
     * should be logged at this level.
     */
    debug: 4,

    /**
     * This level should be used when tracing the path of a program's execution.
     */
    trace: 5,
  },

  colors: {
    fatal: 'bold black redBG',
    error: 'brightRed',
    warn: 'brightYellow',
    info: 'brightBlue',
    debug: 'yellow',
    trace: 'cyan',
  },
};

winston.addColors(winstonConfig.colors);

/**
 * @param {TransformableInfo} info
 * @returns {string}
 */
function consoleLogFormatter(info) {
  const { level, message } = info;

  return `${level}\t${message}`;
}

/**
 * @param {TransformableInfo} info
 * @returns {string}
 */
function fileLogFormatter(info) {
  const { level, message, ...metadata } = info;
  const { timestamp } = metadata;

  return `${timestamp}\t${level.toUpperCase()}\t${message}`;
}

function consoleTransport() {
  /**
   * @type {ConsoleTransportOptions}
   */
  const consoleTransportConfig = {
    format: format.combine(
      format.colorize(),
      format.errors({ stack: true }),
      format.align(),
      format.printf(consoleLogFormatter)
    ),
    handleExceptions: true,
    level: 'info', // fixed at this level
  };

  return new transports.Console(consoleTransportConfig);
}

/**
 * @param {string} logFile - the path to the log file
 */
function removeEmptyLogFile(logFile) {
  try {
    fs.readFile(logFile, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return;
        }

        throw err;
      }

      if (data.length === 0) {
        // eslint-disable-next-line no-shadow
        fs.unlink(logFile, (err) => {
          if (err) throw err;
        });
      } else {
        console.log('log-file created at: %s', logFile);
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

function fileTransport(logFile) {
  /**
   * @type {FileTransportOptions}
   */
  const fileTransportptions = {
    eol: '\n',
    filename: logFile,
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      format.splat(),
      format.printf(fileLogFormatter)
    ),
    options: { encoding: 'utf8', flags: 'w' },
  };

  return new transports.File(fileTransportptions)
    .on('error', () => {
      /* noop */
    })
    .on('finish', () => {
      removeEmptyLogFile(logFile);
    });
}

function init(id) {
  const logFile = createLogFile();

  winston.loggers.add(id, {
    format: winston.format.simple(),
    levels: winstonConfig.levels,
    level: 'info',
    transports: [consoleTransport(), fileTransport(logFile)],
    exceptionHandlers: [
      new transports.Console({ consoleWarnLevels: ['error'] }),
    ],
    rejectionHandlers: [
      new transports.Console({ consoleWarnLevels: ['error'] }),
    ],
  });
}

memoizeOne(init('default'));

const log = winston.loggers.get('default');

export { log };
