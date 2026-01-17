module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['react-app', 'react-app/jest'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/']
};
