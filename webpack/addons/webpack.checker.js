// const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { DuplicatesPlugin } = require('inspectpack/plugin')

module.exports = {
  plugins: [
    new DuplicatesPlugin({
      emitErrors: true,
      verbose: true
    })
  ]
}
