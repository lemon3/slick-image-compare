/*
 * see: https://jestjs.io/docs/webpack
 */

/* global module */

const config = {
  verbose: true,
  modulePaths: ['src'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",

    // alias
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
};

module.exports = config;
