const path = require('path')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	plugins: [
		new WebpackBundleAnalyzer({
			analyzerMode: 'static',
			reportFilename: path.resolve(process.cwd(), 'reports/stats.analyzer.html'),
			openAnalyzer: false,
		}),
	],
}
