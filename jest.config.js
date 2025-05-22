module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/testing/**/*.test.js'],
  testPathIgnorePatterns: ['/src/repositories/', '/repositories/', '/src/config/', '/config/'],
  coveragePathIgnorePatterns: ['/src/repositories/', '/repositories/', '/src/config/', '/config/'],
};
