import React, { useState, useEffect } from 'react'

import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Editor from './views/Editor'
import Register from './views/Register'
import Login from './views/Login'

import TopBar from './components/TopBar'

import './App.css'

function App() {
	const location = useLocation();
	const [isSaved, setIsSaved] = useState(null);
	const [token, setToken] = useState(null);
	const [username, setUsername] = useState('John Smith');
	const [projName, setProjName] = useState('???');

	useEffect(() => {
		let path = location.pathname.split('/');
		if(!path.includes('editor')) {
			setIsSaved(null);
		}
	}, [location]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<TopBar isSaved={isSaved} token={token} username={username}
				setUsername={setUsername} setToken={token} projName={projName} />
			<Switch>
				<Route exact path='/editor'><Redirect to={{ pathname: '/editor/new' }} /></Route>
				<Route path='/editor'>
					<Editor isSaved={isSaved} setIsSaved={setIsSaved} setProjName={setProjName} />
				</Route>
				<Route exact path='/'></Route>
				<Route exact path='/login'><Login /></Route>
				<Route exact path='/register'><Register /></Route>
			</Switch>
		</div>
	);
}

export default App;
