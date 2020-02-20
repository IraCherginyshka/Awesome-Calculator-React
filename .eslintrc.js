module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': 0,
    'no-unused-vars': 2,
    'prettier/prettier': 'error',
    'import/prefer-default-export': 0,
    'global-require': 0,
    'linebreak-style': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: { minProperties: 7, consistent: false, multiline: true },
      },
    ],
    'lines-between-class-members': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
