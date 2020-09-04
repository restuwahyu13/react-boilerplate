const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		'/api/*',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			secure: false,
			changeOrigin: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': '*',
				'Access-Control-Allow-Methods': '*'
			}
		})
	)
}
