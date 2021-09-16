import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { baseURL } from '../global-consts'
import { styles } from './Login'

const registerSchema = Yup.object().shape({
	username: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
	confirm: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Must match password')
});

const registerInitVals = {
	username: '',
	password: '',
	confirm: ''
}

export default function Register(props) {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('')

	useEffect(() => {
		document.title = 'Fragflow | Register';
	});

	const handleSubmit = (username, password) => {
		setError('');
		axios.post(`${baseURL}/api/register`, {
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

	return (
		<div style={{ margin: 'auto', marginTop: '100px', width: '50vw' }}>
			{redirect ? <Redirect to={{ pathname: '/' }} /> : null}
			<h1 style={{ textAlign: 'center' }}>Registration</h1>
			<Formik initialValues={registerInitVals}
				validationSchema={registerSchema}
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
						<label style={styles.spaced} htmlFor='confirm'>Confirm Password </label>
						<Field style={styles.field} type='password' name='confirm' />
						{errors.confirm && touched.confirm ?
							<div style={styles.error}>{errors.confirm}</div> : null}
						<br />
						<br />
						<br />
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<button style={{ ...styles.button, fontSize: '100%' }} type='submit'>Register</button>
						</div>
					</Form>
				)}
			</Formik>
			<h5 style={{ ...styles.error, ...styles.spaced }}>{error}</h5>
		</div>
	)
}
