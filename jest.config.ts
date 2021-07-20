export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.js',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/**/*.protocols.ts',
    '!**/protocols/**'
  ],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
