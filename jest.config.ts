import type { Config } from 'jest';
import nextJest from 'next/jest.js';
const createJestConfig = nextJest({
  dir: './',
});
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**'],
  coveragePathIgnorePatterns: ['src/components/', 'src/types/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  preset: 'ts-jest',
  setupFiles: ['./testconfig.js'],
};

export default createJestConfig(config);
