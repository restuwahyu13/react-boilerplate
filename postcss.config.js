const path = require('path')
const postcssImport = require('postcss-import')
const postcssFlexbox = require('postcss-flexbugs-fixes')
const postcssPresetEnv = require('postcss-preset-env')
const postcssNano = require('cssnano')
const postcssStyleLint = require('stylelint')
const postcssClean = require('postcss-clean')

module.exports = {
  plugins: [
    postcssFlexbox({ bug4: false }),
    postcssImport({ root: process.cwd(), path: path.resolve(process.cwd(), 'src') }),
    postcssPresetEnv({
      stages: 3,
      features: {
        'nesting-rules': true,
        'media-query-ranges': true,
        'color-mod-function': true
      },
      autoprefixer: { grid: 'autoplace', flexbox: 'no-2009' }
    }),
    postcssNano({
      preset: ['advanced', { discardComments: { removeAll: true }, convertValues: { precision: true } }]
    }),
    postcssStyleLint({
      fix: true,
      configFile: path.resolve(__dirname, '.stylelintrc')
    }),
    postcssClean({
      format: 'beautify',
      level: {
        2: {
          all: true
        }
      }
    })
  ]
}
