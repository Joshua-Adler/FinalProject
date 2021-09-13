import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Preview from '../components/Preview'
import BlockArea from '../components/BlockArea'
import BufferMenu from '../components/BufferMenu'
import BlockSelector from '../components/BlockSelector'

import baseProject from '../data/test.json'

const styles = {
	editor: {
		position: 'relative',
		height: '100%',
		display: 'flex',
	},
	vertFlex: {
		display: 'flex',
		flexDirection: 'column',
		margin: '15px',
	}
}

export default function Editor(props) {
	const location = useLocation();
	const [blocks, setBlocks] = useState(baseProject);
	const [changeCount, setChangeCount] = useState(0);
	const [projID, setProjID] = useState('new');

	useEffect(() => {
		let path = location.pathname.split('/');
		setProjID(path[path.length - 1]);
	}, [location]);

	useEffect(() => {
		if (projID !== 'new') {

		}
	}, [projID]);

	return (
		<div style={styles.editor}>
			<BlockSelector />
			<BlockArea blocks={blocks} changeCount={changeCount} setChangeCount={setChangeCount} />
			<div style={{ ...styles.vertFlex, marginLeft: 'auto' }}>
				<Preview blocks={blocks} changeCount={changeCount} />
				<BufferMenu />
			</div>
		</div>
	)
}
