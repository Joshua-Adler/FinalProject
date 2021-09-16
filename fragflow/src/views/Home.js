import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import { baseURL } from './../global-consts'

export default function Home(props) {
	const [projects, setProjects] = useState([]);
	const [redir, setRedir] = useState(null);

	useEffect(() => {
		document.title = 'Fragflow | Home'
		if (projects.length === 0) {
			axios.get(`${baseURL}/api/projects`)
				.then((response) => {
					setProjects(response.data.projects);
				}).catch((error) => {
					console.error(error);
				});
		}
	}, [projects]);

	return (
		<div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '100px' }}>
			{redir ? <Redirect to={{ pathname: `editor/${redir}` }} /> : ''}
			<table>
				<thead>
					<tr>
						<th>Author</th>
						<th style={{ width: '50%' }}>Name</th>
						<th>Date Created</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((proj) => {
						let date = new Date(proj.created).toLocaleDateString();
						let nameCol = 'white';
						if (props.token && props.user.name === proj.user_name) {
							nameCol = '#4F4';
						}
						return (
							<tr key={proj.id} onClick={() => setRedir(proj.id)} className='projectData'>
								<td style={{ color: nameCol }}>{proj.user_name}</td>
								<td>{proj.name}</td>
								<td>{date}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
