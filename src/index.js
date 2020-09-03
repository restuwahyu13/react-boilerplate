/**
@description  this file is entrypoint react-application and webpack
*/
import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root'
import './assets/css/index.css'
import App from './App'

/**
@description on HotReload if environment is development mode
*/
const RootComponent = (Component) => render(<Component />, document.getElementById('root'))
RootComponent(hot(App))

/**
@description on serviceWorker if environment is production mode
*/
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in window.navigator) {
	window.onload = () => window.navigator.serviceWorker.register(`/service-worker.js`)
}
