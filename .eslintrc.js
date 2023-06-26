module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/quotes': ['error', 'single', { 'avoidEscape': true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/keyword-spacing': 'error',
    '@typescript-eslint/space-before-blocks': 'error',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-throw-literal': 'error',
    'no-irregular-whitespace': ['error', { 'skipRegExps': true }],
    'eqeqeq': 'error',
    'block-spacing': 'error',
    'arrow-spacing': 'error',
    'space-in-parens': ['error', 'never']
  },
};
