import babelParser from '@babel/eslint-parser'

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'semi': ['error', 'never'],
    },
  },
]
