const { resolve } = require('path')
const webpack = require('webpack')
const { WebpackLogCompiler } = require('./addons/webpack.log')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
	},
	module: {
		rules: [
			{
				test: /\.(css|scss|sass)$/,
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
				test: /\.(jp?g|png|svg|gif|raw|webp)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
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
							name: '[name].[ext]',
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
		new HtmlWebpackPlugin({
			template: resolve(process.cwd(), 'public/index.html'),
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
		open: true,
		compress: true,
		hot: true,
		inline: true,
		watchContentBase: true,
		port: process.env.PORT || 3000,
		contentBase: resolve(process.cwd(), 'build'),
		liveReload: false
	},
	devtool: 'inline-source-map',
}
