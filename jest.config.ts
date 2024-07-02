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
  collectCoverageFrom: ['src/**', '!src/app/products/[id]/page.tsx'],
  coveragePathIgnorePatterns: ['src/components/', 'src/types/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  preset: 'ts-jest',
  setupFiles: ['./testconfig.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^swiper/react$': '<rootDir>/__mocks__/swiper-react.js',
    '^@/(.*)$': '<rootDir>/src/$1',
     'swiper/css': 'swiper/swiper.min.css'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(swiper|another-module-to-transform)/)',
    'node_modules/(?!(swiper|ssr-window|dom7)/)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
     '^.+\\.tsx?$': 'babel-jest'
  },
};

export default createJestConfig(config);
