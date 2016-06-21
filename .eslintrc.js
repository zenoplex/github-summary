module.exports = {
  parser:  'babel-eslint',
  extends: 'airbnb-base',
  plugins: [
    'flow-vars',
  ],
  env:     {
    mocha: true
  },
  rules:   {
    'key-spacing': 0,
    'no-console':  0,
    'camelcase':   0,
    'flow-vars/define-flow-type': 1,
    'flow-vars/use-flow-type': 1,
  },
  settings: {
    'import/resolver': 'webpack',
  }
};
