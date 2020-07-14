const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
	plugins: [
		new Visualizer({
			filename: `../reports/stats.visualyzer.html`,
		}),
	],
}
