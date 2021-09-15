import React from 'react'

import { Link, useLocation } from 'react-router-dom'

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
		textDecoration: 'none'
	},
	title: {
		marginRight: '85px',
		fontWeight: 'bold',
		fontSize: '125%'
	}
}

export default function TopBar(props) {
	const location = useLocation();
	return (
		<div style={styles.topBar}>
			<div style={{ ...styles.barItem, ...styles.title }}>Fragflow</div>
			{props.isSaved !== null ?
				<>
					<div style={styles.barItem}>{props.projName}</div>
					{props.isSaved ?
						<div style={{ ...styles.barItem, color: 'dimgray' }}>{props.isSaved}</div>
						:
						<div style={{ ...styles.barItem, color: 'yellow' }}>Ctrl+S to Save</div>}
				</>
			: ''}
			{!location.pathname.split('/').includes('editor') ? 
				<Link to='/editor/new' style={{...styles.barItem, color: 'lightgray'}}>New Project</Link>
			: ''}
			<div style={{ margin: 'auto' }}></div>
			{props.token ?
				<>
				<div style={{...styles.barItem}}>{props.username}</div>
				<div style={{...styles.barItem, color: 'gray'}}>Log Out</div>
				</>
				:
				<>
				<Link to='/login' style={{...styles.barItem, color: 'lightgray'}}>Log In</Link>
				<Link to='/register' style={{...styles.barItem, color: 'lightgray'}}>Register</Link>
				</>
			}
			<div style={{ margin: '20px' }}></div>
		</div>
	)
}
