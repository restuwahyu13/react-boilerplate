const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')

module.exports = {
	plugins: [
		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: [`${chalk.white.bold('You application is running on ')} ${chalk.blue('http://localhost:3000')}`],
				notes: [
					`${chalk.white.bold('Build application for production')} ${chalk.blue('npm run b')}`,
					`${chalk.white.bold('Build application for production && bundle file analyzer')} ${chalk.blue('npm run ba')}`,
					`${chalk.white.bold('Testing component react application')} ${chalk.blue('npm run t')}`,
					`${chalk.white.bold('Testing component react application watch')} ${chalk.blue('npm run t:watch')}`,
					`${chalk.white.bold('Testing component react application converage')} ${chalk.blue('npm run t:converage')}`,
					`${chalk.yellow.bold('For production mode')} ${chalk.white.bold(
						'add vendors used in application, into vendors.js to reduce the bundle size'
					)}`
				]
			},
			clearConsole: false
		})
	]
}
