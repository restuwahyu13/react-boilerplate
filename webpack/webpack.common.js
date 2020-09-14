const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const isDevPlugin = ['react-refresh/babel']

const isProdPlugin = [
  '@babel/plugin-transform-block-scoping',
  'transform-remove-console',
  'babel-plugin-transform-remove-undefined',
  ['transform-react-remove-prop-types', { mode: 'wrap', ignoreFilenames: ['node_modules'] }]
]

const isProdDevPlugin = [
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: true }],
  ['styled-jsx/babel', { optimizeForSpeed: true }]
]

const isPlugins = process.env.NODE_ENV !== 'production' ? isDevPlugin : isProdPlugin

module.exports = {
  target: 'web',
  entry: {
    main: resolve(process.cwd(), 'src/index.js')
  },
  output: {
    path: resolve(process.cwd(), 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
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
              ],
              plugins: [...isProdDevPlugin, ...isPlugins]
            }
          }
        ],
        include: resolve(process.cwd(), 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sassOptions: {
                outputStyle: 'compressed'
              },
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: resolve(process.cwd(), 'public/favicon.png'),
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      async: /\.js$/,
      preload: {
        test: /\.js$/
      }
    }),
    new WebpackPwaManifest({
      name: 'Minimalize Modern React',
      short_name: 'React',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait-primary',
      theme_color: '#1a1c1b',
      background_color: '#1a1c1b',
      description: 'Minimalize Modern React Boilerplate 2020',
      icons: [
        {
          src: resolve(process.cwd(), 'public/favicon.png'),
          type: 'image/png',
          sizes: '64x64',
          purpose: 'any maskable'
        },
        {
          src: resolve(process.cwd(), 'public/logo192.png'),
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any maskable'
        },
        {
          src: resolve(process.cwd(), 'public/logo512.png'),
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any maskable'
        }
      ],
      crossorigin: 'use-credentials',
      inject: true,
      fingerprints: true
    })
  ],
  resolve: {
    modules: [resolve(process.cwd(), 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    symlinks: false,
    cacheWithContext: false
  }
}
