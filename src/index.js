import React from 'react'
import ReactDOM from 'react-dom'
import loadable from '@loadable/component'
import './index.css'

/**
@description use code splitting
*/
const App = loadable(() => import('./App'))

/**
@description render app component
*/
ReactDOM.render(<App />, document.getElementById('root'))

/**
@description on serviceWorker if environment is production mode
*/
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in window.navigator) {
  window.onload = () => window.navigator.serviceWorker.register(`/service-worker.js`)
}
