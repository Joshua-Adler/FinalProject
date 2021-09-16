import React, { useState } from 'react'

import { Link, useLocation, Redirect } from 'react-router-dom'

import { deleteProject } from '../views/Editor'

const styles = {
	topBar: {
		backgroundColor: '#212426',
		width: '100%',
		height: '70px',
		display: 'flex'
	},
	barItem: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: 'auto',
		marginLeft: '20px',
		textDecoration: 'none',
		color: 'white'
	},
	title: {
		marginRight: '85px',
		fontWeight: 'bold',
		fontSize: '125%'
	},
	delete: {
		position: 'absolute',
		top: '21px',
		right: '50%',
		color: '#FCC'
	}
}

export default function TopBar(props) {
	const location = useLocation();
	const [redir, setRedir] = useState(false);
	let path = location.pathname.split('/');

	const logout = () => {
		props.setToken(null);
		localStorage.removeItem('token');
		setRedir(true);
	}

	return (
		<div style={styles.topBar}>
			{redir ?
				<Redirect to={{ pathname: '/' }} />
				: ''}
			<Link to='/' style={{ ...styles.barItem, ...styles.title }}>Fragflow</Link>
			{props.isSaved !== null ?
				<>
					<div style={styles.barItem}>{props.projName}</div>
					{props.isSaved ?
						<div style={{ ...styles.barItem, color: 'dimgray' }}>{props.isSaved}</div>
						:
						<div style={{ ...styles.barItem, color: 'yellow' }}>Ctrl+S to Save</div>}
					{props.isSaved !== ' ' && !path.includes('new') ?
						<div onClick={deleteProject}
							style={{ ...styles.barItem, ...styles.delete, userSelect: 'none' }}>
							Delete Project
						</div>
						: ''}
				</>
				: ''}
			{!path.includes('editor') ?
				<Link to='/editor/new' style={{ ...styles.barItem, color: 'lightgray' }}>New Project</Link>
				: ''}
			{props.token ?
				<>
					<div style={{ margin: 'auto' }}></div>
					<div style={{ ...styles.barItem }}>{props.user.name}</div>
					<div onClick={logout} style={{ ...styles.barItem, color: 'gray', userSelect: 'none' }}>
						Log Out
					</div>
				</>
				:
				<>
					{path.includes('new') ?
						<div style={{ ...styles.barItem, color: 'orange' }}>
							You must be logged in to save a project
						</div>
						: ''}
					<div style={{ margin: 'auto' }}></div>
					<Link to='/login' style={{ ...styles.barItem, color: 'lightgray' }}>Log In</Link>
					<Link to='/register' style={{ ...styles.barItem, color: 'lightgray' }}>Register</Link>
				</>
			}
			<div style={{ margin: '20px' }}></div>
		</div>
	)
}
