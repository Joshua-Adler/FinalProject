import React, { useState, useEffect } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Editor from './Views/Editor'

import TopBar from './Components/TopBar'

import './App.css'

function App() {
	return (
		<div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
			<TopBar />
			<Switch>
				<Route exact path='/editor'><Editor /></Route>
				<Route path='/'><Redirect to={{ pathname: '/editor' }} /></Route>
			</Switch>
		</div>
	);
}

export default App;
