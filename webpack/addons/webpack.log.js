const chalk = require('chalk')

class WebpackLogCompiler {
	constructor(options) {
		this.options = options
	}

	apply(compiler) {
		return this.options.mode !== 'production'
			? this.devCompile(compiler)
			: this.prodCompile(compiler)
	}

	devCompile(compiler) {
		compiler.hooks.compile.tap('before compile', () => {
			// eslint-disable-next-line no-console
			console.log(`${chalk.blue.bold(`${this.options.message} \n`)}`)
		})
		compiler.hooks.done.tap('after compile', () => {
			this.options.message = ''
			// eslint-disable-next-line no-console
			console.clear()
		})
	}

	prodCompile(compiler) {
		compiler.hooks.compile.tap('before compile', () => {
			// eslint-disable-next-line no-console
			console.log(`${chalk.white(`${this.options.message} \n`)}`)
		})
		compiler.hooks.done.tap('after compile', () => {
			this.options.message = ''
			// eslint-disable-next-line no-console
			console.clear()
		})
	}
}

module.exports = { WebpackLogCompiler }
