const { resolve } = require('path')
const zlib = require('zlib')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TenserWebpackPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const ThreeShakingWebpackPlugin = require('webpack-common-shake').Plugin
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin')
const WebpackProgressBar = require('webpackbar')

module.exports = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].bundle.[contenthash].js',
    chunkFilename: 'static/js/[id].chunk.[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: resolve(process.cwd(), 'postcss.config.js')
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jp?g|png|svg|gif|raw|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            limit: 10240
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            limit: 10240
          }
        }
      },
      {
        test: /\.(jp?g|png|svg|gif|raw|webp)$/,
        use: {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 75,
              smooth: 75
            },
            optipng: {
              enabled: true,
              optimizationLevel: 5
            },
            pngquant: {
              quality: [0.5, 0.75],
              speed: 11
            },
            gifsicle: {
              interlaced: false,
              optimizationLevel: 3
            },
            webp: {
              quality: 75,
              method: 5,
              autoFilter: true
            }
          }
        },
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new WebpackProgressBar(),
    new UnminifiedWebpackPlugin(),
    new ThreeShakingWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['build']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(process.cwd(), 'public/index.html'),
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        sortClassName: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new HtmlCriticalWebpackPlugin({
      base: resolve(process.cwd(), 'build'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: { blockJSRequests: false }
    }),
    new DynamicCdnWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].bundle.[contenthash].css',
      chunkFilename: 'static/css/[id].chunk.[contenthash].css'
    }),
    new GenerateSW({
      swDest: resolve(process.cwd(), 'build/service-worker.js'),
      runtimeCaching: [
        {
          handler: 'StaleWhileRevalidate',
          urlPattern: /\.(?:js|css|html|json)$/,
          options: {
            cacheName: 'static-assets-cache',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 24 * 60 * 60 * 30
            }
          }
        },
        {
          handler: 'CacheFirst',
          urlPattern: /\.(?:jp?g|png|svg|gif|raw|webp)$/,
          options: {
            cacheName: 'images-assets-cache',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 24 * 60 * 60 * 30
            }
          }
        },
        {
          handler: 'CacheFirst',
          urlPattern: /\.(?:woff|woff2|eot|ttf|otf)$/,
          options: {
            cacheName: 'fonts-assets-cache',
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 24 * 60 * 60 * 30
            }
          }
        }
      ],
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      test: /\.(js|css|html|json)$/,
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: zlib.constants.Z_BEST_COMPRESSION,
        strategy: zlib.constants.Z_RLE
      },
      minRatio: Number.MAX_SAFE_INTEGER,
      cache: false,
      exclude: [
        '/(node_modules|bower_components)/',
        '/.(test.js|spec.js)/$',
        resolve(process.cwd(), 'build/**/*'),
        resolve(process.cwd(), 'public/**/*'),
        resolve(process.cwd(), 'webpack/**/*'),
        resolve(process.cwd(), '.github/**/*'),
        resolve(process.cwd(), 'coverage/**/*')
      ]
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      test: /\.(jp?g|png|svg|gif|raw|webp)$/,
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: zlib.constants.Z_BEST_COMPRESSION,
        strategy: zlib.constants.Z_RLE
      },
      minRatio: Number.MAX_SAFE_INTEGER,
      cache: false,
      exclude: [
        '/(node_modules|bower_components)/',
        '/.(test.js|spec.js)/$',
        resolve(process.cwd(), 'build/**/*'),
        resolve(process.cwd(), 'public/**/*'),
        resolve(process.cwd(), 'webpack/**/*'),
        resolve(process.cwd(), '.github/**/*'),
        resolve(process.cwd(), 'coverage/**/*')
      ]
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      algorithm: 'brotliCompress',
      compressionOptions: {
        level: zlib.constants.Z_BEST_COMPRESSION,
        strategy: zlib.constants.Z_RLE
      },
      minRatio: Number.MAX_SAFE_INTEGER,
      cache: false,
      exclude: [
        '/(node_modules|bower_components)/',
        '/.(test.js|spec.js)/$',
        resolve(process.cwd(), 'build/**/*'),
        resolve(process.cwd(), 'public/**/*'),
        resolve(process.cwd(), 'webpack/**/*'),
        resolve(process.cwd(), '.github/**/*'),
        resolve(process.cwd(), 'coverage/**/*')
      ]
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TenserWebpackPlugin({
        test: /\.(js|jsx)$/,
        terserOptions: {
          parser: { ecma: 6, bare_returns: true, html5_comments: false },
          compress: { module: true, inline: 1 },
          mangle: { module: true, toplevel: true },
          output: { comments: false, preserve_annotations: true, braces: true, indent_level: 2 },
          module: false,
          keep_classnames: false,
          keep_fname: false,
          nameCache: false,
          ie8: false,
          safari10: false
        },
        parallel: require('os').cpus().length,
        extractComments: true,
        sourceMap: true,
        cache: false,
        exclude: [
          '/(node_modules|bower_components)/',
          '/.(test.js|spec.js)/$',
          resolve(process.cwd(), 'build/**/*'),
          resolve(process.cwd(), 'public/**/*'),
          resolve(process.cwd(), 'webpack/**/*'),
          resolve(process.cwd(), '.github/**/*'),
          resolve(process.cwd(), 'coverage/**/*')
        ]
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['advanced', { discardComments: { removeAll: true }, convertValues: { precision: true } }]
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: false,
          test: /\.js$/,
          chunks: 'all',
          enforce: true
        },
        styles: {
          name: false,
          test: /\.(css|sass|scss)$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    noEmitOnErrors: true,
    sideEffects: true
  },
  stats: {
    assetsSort: '!size',
    entrypoints: false,
    cached: false,
    children: false,
    modules: false,
    warnings: false
  }
}
