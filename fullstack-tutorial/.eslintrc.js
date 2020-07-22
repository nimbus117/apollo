// delete as appropriate
module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    Object.assign({
      files: ['imports/startup/server/**/*.js'],
      env: { node: true },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    }),
    Object.assign({
      files: ['imports/startup/client/**', 'imports/ui/**'],
      env: {
        browser: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['react'],
      rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
      },
      extends: ['plugin:react/recommended', 'prettier/react'],
    }),
  ],
};
