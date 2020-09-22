const { resolve } = require('path')
const { existsSync } = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackLogCompiler } = require('./addons/webpack.log')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const DotEnv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'css-hot-loader',
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(jp?g|png|svg|gif|raw|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new DotEnv({
      expand: true,
      systemvars: true,
      silent: true
    }),
    new WebpackLogCompiler({
      env: 'development',
      message: 'Starting the development server...'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(process.cwd(), 'public/index.html'),
      inject: true
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.(css|sass|scss)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  devServer: {
    open: true,
    compress: true,
    hot: true,
    inline: true,
    watchContentBase: true,
    contentBase: resolve(process.cwd(), 'build'),
    historyApiFallback: true,
    before: (app, server, compiler) => {
      const fileExist = existsSync('./src/setupProxy.js')
      if (fileExist) {
        const pathProxy = resolve(process.cwd(), 'src/setupProxy')
        return require(`${pathProxy}`)(app)
      }
    },
    port: process.env.PORT || 3000,
    liveReload: false
  }
}
