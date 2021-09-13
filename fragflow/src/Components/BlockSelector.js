import React from 'react'

import { colors } from '../global-consts'
import { changeSelectorCategory } from './BlockArea'

const styles = {
	blockSelector: {
		backgroundColor: '#151515',
		width: '200px',
		marginTop: '15px',
		marginBottom: '15px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	category: {
		height: '100px',
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontFamily: 'consolas'
	}
}

export default function BlockSelector() {
	return (
		<div style={styles.blockSelector}>
			<div onClick={() => changeSelectorCategory('functions')} style={{...styles.category, backgroundColor: colors.function}}>Functions</div>
			<div onClick={() => changeSelectorCategory('actions')} style={{...styles.category, backgroundColor: colors.action}}>Actions</div>
		</div>
	)
}
