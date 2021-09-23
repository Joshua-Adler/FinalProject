import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Editor from './views/Editor'
import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

import TopBar from './components/TopBar'

import { baseURL } from './global-consts'

import './App.css'

function App() {
	const location = useLocation();
	const [isSaved, setIsSaved] = useState(null);
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [user, setUser] = useState({ name: '...', id: -1 });
	const [projName, setProjName] = useState('...');
	// Don't show the page until we've determined whether or not the user's token is valid
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		let path = location.pathname.split('/');
		if (!path.includes('editor')) {
			setIsSaved(null);
		}
	}, [location]);

	useEffect(() => {
		if (token) {
			axios.get(`${baseURL}/api/user?token=${token}`).then((response) => {
				setUser(response.data);
				setIsLoaded(true);
			}).catch((error) => {
				setToken(null);
				setIsLoaded(true);
			});
		} else {
			setIsLoaded(true);
		}
	}, [token]);

	if (isLoaded) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
				<TopBar isSaved={isSaved} token={token} user={user}
					setToken={setToken} projName={projName} />
				<Switch>
					<Route exact path='/FinalProject/editor'><Redirect to={{ pathname: '/FinalProject/editor/new' }} /></Route>
					<Route path='/FinalProject/editor'>
						<Editor isSaved={isSaved} setIsSaved={setIsSaved} setProjName={setProjName}
							token={token} user={user} projName={projName} />
					</Route>
					<Route exact path='/FinalProject/'><Home token={token} user={user} /></Route>
					<Route exact path='/FinalProject/login'><Login setToken={setToken} /></Route>
					<Route exact path='/FinalProject/register'><Register setToken={setToken} /></Route>
				</Switch>
			</div>
		);
	}
	return (
		<div />
	)
}

export default App;
