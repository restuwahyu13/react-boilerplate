const { resolve } = require('path')
const webpack = require('webpack')
const { WebpackLogCompiler } = require('./addons/webpack.log')

module.exports = {
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'css-hot-loader',
					{
						loader: 'style-loader',
						options: { injectType: 'singletonStyleTag' },
					},
					{
						loader: 'css-loader',
						options: {
							localsConvention: 'camelCase',
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(jpe?g|gif|png|svg|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							limit: 10240,
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							limit: 10240,
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new WebpackLogCompiler({
			env: 'development',
			message: 'Starting the development server...',
		}),
	],
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
					reuseExistingChunk: false,
				},
				vendors: {
					name: 'vendors',
					test: /\.js$/,
					chunks: 'all',
					enforce: true,
					reuseExistingChunk: false,
				},
			},
		},
	},
	devServer: {
		port: process.env.PORT || 3000,
		compress: true,
		hot: true,
		inline: true,
		open: true,
		contentBase: resolve(process.cwd(), 'build'),
		liveReload: false,
		stats: 'none',
	},
	devtool: 'inline-source-map',
	stats: 'errors-warnings',
}
