const { resolve } = require('path')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

module.exports = {
	target: 'web',
	entry: {
		main: resolve(process.cwd(), 'src/index.js'),
	},
	output: {
		path: resolve(process.cwd(), 'build'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
				include: resolve(process.cwd(), 'src'),
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					{
						loader: 'sass-loader',
						options: {
							implementation: require('node-sass'),
							sassOptions: {
								outputStyle: 'compressed',
							},
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
		}),
		new FixStyleOnlyEntriesPlugin(),
		new WebpackPwaManifest({
			name: 'Modern React Proggresive Web Apps',
			short_name: 'React PWA',
			start_url: '/',
			display: 'standalone',
			orientation: 'portrait-primary',
			theme_color: '#1a1c1b',
			background_color: '#1a1c1b',
			description: 'Modern React PWA Boilerplate 2020',
			icons: [
				{
					src: resolve(process.cwd(), 'public/favicon.png'),
					type: 'image/png',
					sizes: '64x64',
					purpose: 'any maskable',
				},
				{
					src: resolve(process.cwd(), 'public/logo192.png'),
					type: 'image/png',
					sizes: '192x192',
					purpose: 'any maskable',
				},
				{
					src: resolve(process.cwd(), 'public/logo512.png'),
					type: 'image/png',
					sizes: '512x512',
					purpose: 'any maskable',
				},
			],
			crossorigin: 'use-credentials',
			inject: true,
			fingerprints: true,
		}),
		new FaviconsWebpackPlugin({
			mode: 'light',
			devMode: 'light',
			logo: resolve(process.cwd(), 'public/favicon.png'),
			inject: true,
			cache: false,
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'async',
		}),
	],
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json'],
		symlinks: false,
		cacheWithContext: false,
	},
	node: {
		global: false,
		__filename: false,
		__dirname: false,
		process: false,
		exports: false,
		module: false,
	},
}
