import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

/**
@description render app component
*/
ReactDOM.render(<App />, document.getElementById('root'))

/**
@description on serviceWorker if environment is production mode
*/
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in window.navigator) {
	window.onload = () => window.navigator.serviceWorker.register('/service-worker.js')
}
