import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Editor from './views/Editor'

import TopBar from './components/TopBar'

import './App.css'

function App() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<TopBar />
			<Switch>
				<Route exact path='/editor'><Redirect to={{ pathname: '/editor/new' }} /></Route>
				<Route path='/editor'><Editor /></Route>
				<Route path='/'><Redirect to={{ pathname: '/editor/new' }} /></Route>
			</Switch>
		</div>
	);
}

export default App;
