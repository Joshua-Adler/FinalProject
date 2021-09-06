import React from 'react'

import Preview from '../Components/Preview'
import BlockArea from '../Components/BlockArea'
import BufferMenu from '../Components/BufferMenu'
import BlockSelector from '../Components/BlockSelector'

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

export default function Editor() {
	return (
		<div style={styles.editor}>
			<BlockSelector />
			<BlockArea />
			<div style={{...styles.vertFlex, marginLeft: 'auto'}}>
				<Preview />
				<BufferMenu />
			</div>
		</div>
	)
}
