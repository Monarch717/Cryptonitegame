module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  globals: {
    describe: 'readonly',
    expect: 'readonly',
    it: 'readonly',
    jest: 'readonly',
    beforeEach: 'readonly',
    chrome: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    complexity: ['error', 34],
    'react/prop-types': 0
  }
}
