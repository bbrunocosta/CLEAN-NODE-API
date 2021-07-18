export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js'
  ],
  coverageDirectory: 'coverage',
  testEnviroment: 'node',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
