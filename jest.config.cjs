'use strict';

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  /*
   * All imported modules in your tests should be mocked automatically.
   * Default: false
   */
  // automock: false,

  /*
   * Stop running tests after `n` failures.
   * Default: 0
   */
  // bail: 0,

  /*
   * The directory where Jest should store its cached dependency information.
   * Default: '/tmp/<path>'
   */
  // cacheDirectory: '/tmp/<path>',

  /*
   * Automatically clear mock calls, instances and results before every test.
   * Default: false
   */
  // clearMocks: true,

  /*
   * Indicates whether the coverage information should be collected while
   * executing the test.
   * Default: false
   */
  collectCoverage: true,

  /*
   * An array of glob patterns indicating a set of files for which coverage
   * information should be collected.
   * Default: undefined
   */
  collectCoverageFrom: ['./src/*.mjs', './src/**/*.mjs', '!**/index.mjs'],

  /*
   * The directory where Jest should output its coverage files.
   * Default: undefined
   */
  coverageDirectory: 'test-reports',

  /*
   * An array of regexp pattern strings used to skip coverage collection.
   * Default: ['/node_modules/']
   */
  coveragePathIgnorePatterns: ['/node_modules/', '/vendor/', '/tests/'],

  /*
   * Indicates which provider should be used to instrument code for coverage.
   * Default: 'babel'
   */
  coverageProvider: 'v8',

  /*
   * A list of reporter names that Jest uses when writing coverage reports.
   * Default: ['json', 'text', 'lcov', 'clover']
   */
  // coverageReporters: ['json', 'text', 'lcov', 'clover'],

  /*
   * An object that configures minimum threshold enforcement for coverage
   * results.
   * Default: undefined
   */
  // coverageThreshold: undefined,

  /*
   * A path to a custom dependency extractor.
   * Default: undefined
   */
  // dependencyExtractor: undefined,

  /*
   * Allows for a label to be printed alongside a test while it is running.
   * Default: undefined
   */
  // displayName: '',

  /*
   * Make calling deprecated APIs throw helpful error messages. Default: false
   */
  // errorOnDeprecated: false,

  /*
   * The default configuration for fake timers.
   * Default: {}
   */
  // fakeTimers: {
  //   enableGlobally: false,
  // },

  /*
   * Force coverage collection from ignored files using an array of glob
   * patterns.
   * Default: []
   */
  // forceCoverageMatch: [],

  /*
   * A path to a module which exports an async function that is triggered
   * once before all test suites.
   * Default: undefined
   */
  // globalSetup: undefined,

  /*
   * A path to a module which exports an async function that is triggered
   * once after all test suites.
   * Default: undefined
   */
  // globalTeardown: undefined,

  /*
   * A set of global variables that need to be available in all test
   * environments.
   * Default: {}
   */
  // globals: {},

  /*
   * Insert Jest's globals (expect, test, describe, beforeEach etc.) into the
   * global environment.
   * If you set this to false, you should import from @jest/globals, e.g.
   * Default: true
   */
  injectGlobals: true,

  /*
   * The maximum amount of workers used to run your tests. Can be specified as
   * % or a number.
   * E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum
   * worker number. maxWorkers: 2 will use a maximum of 2 workers.
   * Default: '50%'
   */
  // maxWorkers: "50%",

  /*
   * An array of directory names to be searched recursively up from the
   * requiring module's location.
   * Default: ['node_modules']
   */
  // moduleDirectories: ['node_modules', 'testing', __dirname],

  /*
   * An array of file extensions your modules use.
   * Default:
   *   [
   *     'js',
   *     'mjs',
   *     'cjs',
   *     'jsx',
   *     'ts',
   *     'tsx',
   *     'json',
   *     'node',
   *   ]
   */
  // moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],

  /*
   * A map from regular expressions to module names or to arrays of module
   * names that allow to stub out resources with a single module.
   * Default: {}
   */
  // moduleNameMapper: {},

  /*
   * An array of regexp pattern strings, matched against all module paths
   * before considered 'visible' to the module loader.
   * Default: []
   */
  // modulePathIgnorePatterns: [],

  /*
   * Activates notifications for test results.
   * Default: false
   */
  // notify: false,

  /*
   * An enum that specifies notification mode. Requires { notify: true }.
   * Default: 'failure-change'
   */
  // notifyMode: 'failure-change',

  /*
   * A preset that is used as a base for Jest's configuration.
   * Default: undefined
   */
  // preset: undefined,

  /*
   * Run tests from one or more projects.
   * Default: undefined
   */
  // projects: undefined,

  /*
   * Use this configuration option to add custom reporters to Jest.
   * Default: undefined
   */
  // reporters: undefined,

  /*
   * Automatically reset mock state before every test.
   * Default: false
   */
  // resetMocks: true,

  /*
   * Reset the module registry before running each individual test.
   * Default: false
   */
  // resetModules: true,

  /*
   * A path to a custom resolver.
   * Default: undefined
   */
  // resolver: 'path/to/resolver',

  /*
   * Automatically restore mock state and implementation before every test.
   * Default: false
   */
  // restoreMocks: true,

  /*
   * The root directory that Jest should scan for tests and modules within.
   * Default: undefined
   */
  // rootDir: undefined,

  /*
   * A list of paths to directories that Jest should use to search for files
   * in.
   * Default: ['<rootDir>']
   */
  // roots: ['<rootDir>/src/app/'],

  /*
   * Allows you to use a custom runner instead of Jest's default test runner.
   * Default: 'jest-runner'
   */
  // runner: 'jest-runner',

  /*
   * The paths to modules that run some code to configure or set up the
   * testing environment before each test.
   * Default: []
   */
  // setupFiles: ['path/to/config.js'],

  /*
   * A list of paths to modules that run some code to configure or set up the
   * testing framework before each test.
   * Default: []
   */
  // setupFilesAfterEnv: ['path/to/config.js'],

  /*
   * The number of seconds after which a test is considered as slow and
   * reported as such in the results.
   * Default: 5
   */
  // slowTestThreshold: 5,

  /*
   * A list of paths to snapshot serializer modules Jest should use for
   * snapshot testing.
   * Default: []
   */
  // snapshotSerializers: [],

  /*
   * The test environment that will be used for testing.
   * Default: 'node'
   */
  // testEnvironment: 'jsdom',

  /*
   * Options that will be passed to the testEnvironment.
   * Default: {}
   */
  // testEnvironmentOptions: {},

  /*
   * Adds a location field to test results.
   * Default: false
   */
  // testLocationInResults: true,

  /*
   * The glob patterns Jest uses to detect test files.
   */
  testMatch: ['**/tests/**/*.test.[cm]js'],

  /*
   * An array of regexp pattern strings that are matched against all test
   * paths, matched tests are skipped.
   * Default: ['/node_modules/']
   */
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  /*
   * The regexp pattern or array of patterns that Jest uses to detect test
   * files.
   * Default: []
   */
  // testRegex: [],

  /*
   * This option allows the use of a custom results processor.
   * Default: undefined
   */
  // testResultsProcessor: undefined,

  /*
   * This option allows use of a custom test runner.
   * Default: 'jest-circus/runner'
   */
  // testRunner: 'jest-circus/runner',

  /*
   * A map from regular expressions to paths to transformers.
   * Default: undefined
   */
  transform: {},

  /*
   * An array of regexp pattern strings that are matched against all source
   * file paths, matched files will skip transformation.
   * Default: ['/node_modules/', '\\.pnp\\.[^\\/]+$']
   */
  // transformIgnorePatterns: [/node_modules/", "\\.pnp\\.[^\\\/]+$],

  /*
   * An array of regexp pattern strings that are matched against all modules
   * before the module loader will automatically return a mock for them.
   * Default: undefined
   */
  // unmockedModulePathPatterns: undefined,

  /*
   * Indicates whether each individual test should be reported during the run.
   * Default: undefined
   */
  // verbose: false,

  /*
   * An array of regexp patterns that are matched against all source file
   * paths before re-running tests in watch mode.
   * Default: []
   */
  // watchPathIgnorePatterns: [],

  /*
   * Whether to use watchman for file crawling.
   * Default: true
   */
  // watchman: false
};

module.exports = config;
