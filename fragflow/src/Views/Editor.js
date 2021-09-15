import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import Preview from '../components/Preview'
import BlockArea from '../components/BlockArea'
import BlockSelector from '../components/BlockSelector'

import baseProject from '../data/base.json'

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

export default function Editor(props) {
	const location = useLocation();
	const [blocks, setBlocks] = useState(baseProject);
	const [changeCount, setChangeCount] = useState(0);
	const [redir, setRedir] = useState(null);
	const needsLoading = useRef(true);

	/* eslint-disable */
	//Shut up, there is no infinite loop
	useEffect(() => {
		/*es-lint enable*/
		if (needsLoading.current) {
			needsLoading.current = false;
			console.log('test');
			let path = location.pathname.split('/');
			projID = path[path.length - 1];
			if (projID !== 'new') {
				props.setIsSaved(' ');
				props.setProjName(projID);
				let blockStr = localStorage.getItem(projID);
				setBlocks(JSON.parse(blockStr));
			} else {
				setBlocks(baseProject);
				props.setProjName('Untitled Project');
				props.setIsSaved(false);
				document.title = `Fragflow | New Project`;
			}
		}
	});

	useEffect(() => {
		const saveNewProject = () => {
			let blockStr = JSON.stringify(blocks);
			localStorage.setItem('123', blockStr);
			setRedir(123);
			needsLoading.current = true;
		}

		const save = (e) => {
			if (props.isSaved !== 'Saved' && e.ctrlKey) {
				let key = String.fromCharCode(e.keyCode).toLowerCase();
				if (key === 's') {
					e.preventDefault();
					if (props.isSaved === false) {
						if (projID === 'new') {
							let name = prompt('Project Name');
							if (name !== null && name.length > 0) {
								props.setIsSaved('Saving...');
								saveNewProject();
							}
						} else {

						}
						//props.setIsSaved('Saved');
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
			{redir ?
				<Redirect to={{ pathname: `/editor/${redir}` }} />
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
