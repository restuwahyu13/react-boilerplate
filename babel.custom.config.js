/**
@description BABEL CUSTOM PLUGINS CONFIG
*/

const optionBabelStyleComponent =
  process.env.NODE_ENV !== 'production'
    ? { fileName: true, minify: false, transpileTemplateLiterals: false, pure: false }
    : { minify: true, transpileTemplateLiterals: true, pure: true }

const isDevPlugin = ['react-refresh/babel']

const isProdPlugin = [
  '@babel/plugin-proposal-nullish-coalescing-operator',
  'babel-plugin-transform-remove-console',
  'babel-plugin-transform-remove-undefined',
  'babel-plugin-minify-dead-code-elimination',
  'babel-plugin-transform-remove-strict-mode',
  ['transform-react-remove-prop-types', { mode: 'wrap', ignoreFilenames: ['node_modules'] }]
]

exports.isProdDevPlugin = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-transform-react-constant-elements',
  '@babel/plugin-transform-react-inline-elements',
  '@babel/plugin-transform-shorthand-properties',
  '@babel/plugin-transform-react-jsx-self',
  'babel-plugin-transform-inline-consecutive-adds',
  'babel-plugin-minify-constant-folding',
  'babel-plugin-minify-flip-comparisons',
  'react-html-attrs',
  ['import-graphql', { extensions: ['.graphql', '.gql'] }],
  ['@babel/plugin-transform-runtime', { corejs: 3 }],
  ['babel-plugin-graphql-tag', { onlyMatchImportSuffix: true, strip: true }],
  ['babel-plugin-styled-components', { ...optionBabelStyleComponent }],
  ['styled-jsx/babel', { optimizeForSpeed: true }]
]

exports.isPlugins = process.env.NODE_ENV !== 'production' ? isDevPlugin : isProdPlugin
