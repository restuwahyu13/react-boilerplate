const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')

module.exports = {
	plugins: [
		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: [`${chalk.white.bold('You application is running on ')} ${chalk.blue('http://localhost:3000')}`],
				notes: [
					`${chalk.white.bold('Build application for production')} ${chalk.blue('npm run b')}`,
					`${chalk.white.bold('Checking file size and package bundle analyzer')} ${chalk.blue('npm run a')}`,
					`${chalk.white.bold('Generate config ServiceWorker')} ${chalk.blue('npm run g')}`,
					`${chalk.white.bold('Testing component react application')} ${chalk.blue('npm run t')}`,
				],
			},
			clearConsole: false,
		}),
	],
}
