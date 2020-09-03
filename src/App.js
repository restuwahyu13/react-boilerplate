import React from 'react'
import logo from './assets/images/logo.svg'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<code>Modern React Boilerplate 2020</code>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					<code>Edit src/App.js and save to reload.</code>
				</p>
				<code>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'>
						Learn React
					</a>
				</code>
				<p>
					<code>React Boilerplate Powered By Coding Street Art Team &copy;2020</code>
				</p>
			</header>
		</div>
	)
}
export default App
