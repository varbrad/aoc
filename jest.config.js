module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**', '!**/node_modules/**', '!**/vendor/**'],
}
