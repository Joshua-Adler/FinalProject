import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { baseURL } from '../global-consts'

const loginSchema = Yup.object().shape({
	username: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
});

const loginInitVals = {
	username: '',
	password: '',
}

export default function Login(props) {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('')

	useEffect(() => {
		document.title = 'Fragflow | Login';
	});

	const handleSubmit = (username, password) => {
		setError('');
		axios.post('http://localhost:5000/api/register', {
			username: username,
			password: password
		}).then((response) => {
			props.setToken(response.data.token);
			localStorage.setItem('token', response.data.token);
			setRedirect(true);
		}).catch((error) => {
			switch (error.response.status) {
				case 400:
					setError('Username and password are required');
					break;
				case 409:
					setError('That username is taken');
					break;
				default:
					setError('Unknown error');
					break;
			}
		});
	}

	const styles = {
		error: {
			color: '#F76356',
			position: 'absolute'
		},
		spaced: {
			marginTop: '40px'
		},
		// Form styles modified from w3schools
		field: {
			width: '100%',
			padding: '12px 20px',
			margin: '8px 0',
			display: 'inline-block',
			border: '1px solid dimgray',
			borderRadius: '4px',
			boxSizing: 'border-box',
			backgroundColor: '#131313',
			color: 'white'
		},
		button: {
			width: '100%',
			backgroundColor: '#4CAF50',
			color: 'white',
			padding: '14px 20px',
			margin: '8px 0',
			border: 'none',
			borderRadius: '4px',
			cursor: 'pointer'
		}
	}

	return (
		<div style={{ margin: 'auto', marginTop: '100px', width: '50vw' }}>
			{redirect ? <Redirect to={{ pathname: '/' }} /> : null}
			<h1 style={{ textAlign: 'center' }}>Login</h1>
			<Formik initialValues={loginInitVals} validationSchema={loginSchema}
				onSubmit={(values) => handleSubmit(values.username, values.password)}>
				{({ errors, touched }) => (
					<Form>
						<label style={styles.spaced} htmlFor='username'>Username: </label>
						<Field style={styles.field} name='username' />
						{errors.username && touched.username ?
							<div style={styles.error}>{errors.username}</div> : null}
						<br />
						<br />
						<br />
						<label style={styles.spaced} htmlFor='password'>Password: </label>
						<Field style={styles.field} type='password' name='password' />
						{errors.password && touched.password ?
							<div style={styles.error}>{errors.password}</div> : null}
						<br />
						<br />
						<br />
						<button style={{ ...styles.button, fontSize: '100%' }} type='submit'>Log In</button>
					</Form>
				)}
			</Formik>
			<h5 style={{ ...styles.error, ...styles.spaced }}>{error}</h5>
		</div>
	)
}
