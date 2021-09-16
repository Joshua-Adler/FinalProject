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

export const styles = {
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
		boxSizing: 'border-box',
		backgroundColor: '#131313',
		color: 'white'
	},
	button: {
		width: '50%',
		backgroundColor: '#4d54d6',
		color: 'white',
		padding: '14px 20px',
		border: 'none',
		cursor: 'pointer',
		fontSize: '100%'
	}
}

export default function Login(props) {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('')

	useEffect(() => {
		document.title = 'Fragflow | Login';
	});

	const handleSubmit = (username, password) => {
		setError('');
		axios.post(`${baseURL}/api/login`, {
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
				case 401:
					setError('Incorrect password');
					break;
				case 404:
					setError('User does not exist');
					break;
				default:
					setError('Unknown error');
					break;
			}
		});
	}

	return (
		<div style={{ margin: 'auto', marginTop: '100px', width: '50vw' }}>
			{redirect ? <Redirect to={{ pathname: '/' }} /> : null}
			<h1 style={{ textAlign: 'center' }}>Login</h1>
			<Formik initialValues={loginInitVals} validationSchema={loginSchema}
				onSubmit={(values) => handleSubmit(values.username, values.password)}>
				{({ errors, touched }) => (
					<Form>
						<label style={styles.spaced} htmlFor='username'>Username </label>
						<Field style={styles.field} name='username' />
						{errors.username && touched.username ?
							<div style={styles.error}>{errors.username}</div> : null}
						<br />
						<br />
						<br />
						<label style={styles.spaced} htmlFor='password'>Password </label>
						<Field style={styles.field} type='password' name='password' />
						{errors.password && touched.password ?
							<div style={styles.error}>{errors.password}</div> : null}
						<br />
						<br />
						<br />
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<button style={{ ...styles.button }} type='submit'>Log In</button>
						</div>
					</Form>
				)}
			</Formik>
			<h5 style={{ ...styles.error, ...styles.spaced }}>{error}</h5>
		</div>
	)
}
