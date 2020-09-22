const { resolve } = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { isPlugins, isProdDevPlugin } = require('../babel.custom.config')

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
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    bugfixes: true,
                    forceAllTransforms: true,
                    modules: false
                  }
                ],
                ['@babel/preset-react', { useBuiltIns: true, throwIfNamespace: false }]
              ],
              plugins: [...isProdDevPlugin, ...isPlugins],
              cacheDirectory: process.env.NODE_ENV !== 'production' ? true : false,
              comments: process.env.NODE_ENV !== 'production' ? true : false,
              minified: process.env.NODE_ENV !== 'production' ? false : true,
              babelrc: false
            }
          }
        ],
        include: resolve(process.cwd(), 'src'),
        exclude: [
          '/(node_modules|bower_components)/',
          '/.(test.js|spec.js)/$',
          resolve(process.cwd(), 'build/**/*'),
          resolve(process.cwd(), 'public/**/*'),
          resolve(process.cwd(), 'webpack/**/*'),
          resolve(process.cwd(), '.github/**/*'),
          resolve(process.cwd(), 'coverage/**/*')
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        use: [
          {
            loader: 'webpack-graphql-loader',
            options: {
              validate: true,
              removeUnusedFragments: true,
              minify: process.env.NODE_ENV !== 'production' ? false : true
            }
          }
        ]
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
    new FaviconsWebpackPlugin({
      logo: resolve(process.cwd(), 'public/favicon.png'),
      mode: 'light',
      devMode: 'light',
      inject: true
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
    }),
    new ScriptExtHtmlWebpackPlugin({
      async: /\.js$/,
      preload: /\.js$/
    })
  ],
  resolve: {
    modules: [resolve(process.cwd(), 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss'],
    symlinks: false,
    cacheWithContext: false
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-cheap-source-map' : 'source-map'
}
