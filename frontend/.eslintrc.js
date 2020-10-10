module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'plugin:jest/recommended',
  ],
  parser: 'babel-eslint',
  rules: {
    'no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'no-console': 0,
    'react/state-in-constructor': 0,
    'react/no-did-update-set-state': 0,
    'no-use-before-define': ['error', {variables: false}],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: false,
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  plugins: ['prettier'],
};
