module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['@antfu'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/quotes': 'off',
    'unused-imports/no-unused-imports': 'off',
    'curly': 'off',
  },
}
