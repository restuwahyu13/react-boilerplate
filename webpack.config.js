const WebpackCommon = require('./webpack/webpack.common')
const WebpackMerge = require('webpack-merge')

module.exports = ({ env, addon }) => {
  const WebpackAddon = (addonsArgs) => {
    const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs]
    return addons.filter(Boolean).map((name) => require(`./webpack/addons/webpack.${name}.js`))
  }

  const WebpackConfig = require(`./webpack/webpack.${env}.js`)
  return WebpackMerge.merge(WebpackCommon, WebpackConfig, ...WebpackAddon(addon))
}
