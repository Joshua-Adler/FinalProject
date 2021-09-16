import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import axios from 'axios'

import Preview from '../components/Preview'
import BlockArea from '../components/BlockArea'
import BlockSelector from '../components/BlockSelector'

import baseProject from '../data/base.json'

import { baseURL } from './../global-consts'

const styles = {
	editor: {
		position: 'relative',
		height: '100%',
		display: 'flex',
		fontFamily: 'consolas',
		overflow: 'hidden'
	},
	previewWrapper: {
		position: 'absolute',
		right: '0px',
		top: '0px'
	}
}

var projID = 'new';

export var deleteProject;

export default function Editor(props) {
	const location = useLocation();
	const [blocks, setBlocks] = useState(baseProject);
	const [changeCount, setChangeCount] = useState(0);
	const [redir, setRedir] = useState(null);
	const needsLoading = useRef(true);

	deleteProject = () => {
		if(window.confirm(`Delete ${props.projName}? This action can not be undone.`)) {
			axios.delete(`${baseURL}/api/project?id=${projID}&token=${props.token}`)
			.then((response) => {
				setRedir('');
			}).catch((error) => {
				alert('There was an error deleting the project.');
				console.error(error);
			})
		}
	}

	// Shut up, there is no infinite loop
	// eslint-disable-next-line
	useEffect(() => {
		if (needsLoading.current) {
			needsLoading.current = false;
			let path = location.pathname.split('/');
			projID = path[path.length - 1];
			if (projID !== 'new') {
				axios.get(`${baseURL}/api/project?id=${projID}`).then((response) => {
					props.setProjName(response.data.name);
					setBlocks(JSON.parse(response.data.blocks));
					document.title = `Fragflow | ${response.data.name}`;
					if (props.token && props.user.id === response.data.author_id) {
						props.setIsSaved('Saved');
					} else {
						props.setIsSaved(' ');
					}
				}).catch((error) => {
					setRedir('editor/new');
					needsLoading.current = true;
				})
				document.title = 'Fragflow | Loading...';
			} else {
				setBlocks(baseProject);
				props.setProjName('Untitled Project');
				if (props.token) {
					props.setIsSaved(false);
				} else {
					props.setIsSaved(' ');
				}
				document.title = `Fragflow | Untitled Project`;
			}
		}
	});

	useEffect(() => {
		const saveNewProject = (name) => {
			let blockStr = JSON.stringify(blocks);
			axios.post(`${baseURL}/api/project`, {
				token: props.token,
				blocks: blockStr,
				name
			}).then((response) => {
				setRedir(`editor/${response.data.id}`);
				needsLoading.current = true;
			}).catch((error) => {
				alert('There was an error saving your project.');
				console.log(error);
			})
		}

		const saveProject = () => {
			axios.patch(`${baseURL}/api/project`, {
				token: props.token,
				project_id: projID,
				blocks: JSON.stringify(blocks)
			}).then((response) => {
				props.setIsSaved('Saved');
			}).catch((error) => {
				alert('There was an error saving your project.');
				props.setIsSaved(null);
				console.log(error);
			})
		}

		const save = (e) => {
			let key = String.fromCharCode(e.keyCode).toLowerCase();
			if (key === 's') {
				e.preventDefault();
				if (props.isSaved !== 'Saved' && e.ctrlKey) {
					if (props.isSaved === false) {
						if (projID === 'new') {
							let name = prompt('Project Name');
							if (name !== null && name.length > 0) {
								while (name === null || name.length > 32) {
									name = prompt('Project Name (less than 33 characters)');
								}
								props.setIsSaved('Saving...');
								saveNewProject(name);
							}
						} else {
							props.setIsSaved('Saving...');
							saveProject();
						}
					}
				}
			}
		}

		window.addEventListener('keydown', save);
		return () => {
			window.removeEventListener('keydown', save);
		}
	});

	return (
		<div style={styles.editor}>
			{redir !== null ?
				<Redirect to={{ pathname: `/${redir}` }} />
				: ''}
			<BlockSelector />
			<BlockArea blocks={blocks} changeCount={changeCount} setChangeCount={setChangeCount}
				isSaved={props.isSaved} setIsSaved={props.setIsSaved} />
			<div style={styles.previewWrapper}>
				<Preview blocks={blocks} changeCount={changeCount} />
			</div>
		</div>
	)
}
