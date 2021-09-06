import React from 'react'

const styles = {
	viewport: {
		width: '512px',
		height: '288px',
		//borderRadius: '5px',
		backgroundColor: 'blue'
	},
	viewControls: {
		backgroundColor: 'orange',
		height: '50px'
	}
}

export default function Preview() {
	return (
		<div style={{display: 'flex', flexDirection: 'column'}}>
			<canvas style={styles.viewport} id="canvas" />
			<div style={styles.viewControls}>
				
			</div>
		</div>
	)
}
