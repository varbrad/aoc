const IGNORE = 0
const ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Plain Eslint
    'complexity': [ERROR, 5],
    // Import
    'import/no-unresolved': IGNORE,
    'import/order': [
      ERROR,
      {
        'groups': ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'never'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [ERROR, { allowExpressions: true }]
  },
}
