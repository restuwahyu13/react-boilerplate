/**
@description BABEL CUSTOM PRESETS CONFIG
*/

const isDevPresets = []

const isProdPresets = [
  [
    'minify',
    {
      keepFnName: true,
      keepClassName: true,
      removeConsole: true,
      removeDebugger: true
    }
  ]
]

exports.isProdDevPresets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
      loose: true,
      bugfixes: true,
      modules: false
    }
  ],
  ['@babel/preset-react', { useBuiltIns: true }]
]

exports.isPresets = process.env.NODE_ENV !== 'production' ? isDevPresets : isProdPresets

/**
@description BABEL CUSTOM PLUGINS CONFIG
*/

const isDevPlugin = ['react-refresh/babel']

const isProdPlugin = [['transform-react-remove-prop-types', { mode: 'wrap', ignoreFilenames: ['node_modules'] }]]

exports.isProdDevPlugin = [
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }],
  ['styled-jsx/babel', { optimizeForSpeed: true }]
]

exports.isPlugins = process.env.NODE_ENV !== 'production' ? isDevPlugin : isProdPlugin
