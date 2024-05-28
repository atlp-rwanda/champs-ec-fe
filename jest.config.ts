import type { Config } from 'jest';
import nextJest from 'next/jest.js';
const createJestConfig = nextJest({
  dir: './'
});
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**'],
  coveragePathIgnorePatterns: ['src/components/',],
  coverageReporters: [
    "json-summary", 
    "text",
    "lcov"
  ]
};

export default createJestConfig(config);