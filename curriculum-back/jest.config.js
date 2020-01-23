module.exports = {
  // bail: 0,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  timers: "fake",
  testEnvironment: "node",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: null,

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // A preset that is used as a base for Jest's configuration
  // preset: null,

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // Adds a location field to test results
  // testLocationInResults: false,

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost"
}
