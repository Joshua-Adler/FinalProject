import React from 'react'

import { colors } from '../global-consts'
import { changeSelectorCategory, newVariable, deleteVariable, newFunction } from './BlockArea'

const styles = {
	blockSelector: {
		backgroundColor: '#151515',
		width: '200px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
	},
	category: {
		height: '100px',
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		fontFamily: 'consolas',
		userSelect: 'none',
		border: '1px solid white'
	},
	button: {
		height: '50px',
		border: '1px solid white',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		userSelect: 'none'
	},
	buttons: {
		marginBottom: 'auto',
		justifyContent: 'space-between',
		border: 'none',
		height: '200px'
	}
}

export default function BlockSelector() {
	return (
		<div style={styles.blockSelector}>
			<div style={{ ...styles.category, ...styles.buttons}}>
				<div style={{ ...styles.button, backgroundColor: colors.variable }} onClick={newVariable}>New Variable</div>
				<div style={{ ...styles.button, backgroundColor: colors.function }} onClick={newFunction}>New Function</div>
				<div style={{ ...styles.button, backgroundColor: colors.variable }} onClick={deleteVariable}>Delete Variable</div>
			</div>
			<div onClick={() => changeSelectorCategory('function')} style={{
				...styles.category,
				backgroundColor: colors.function
			}}>Functions</div>
			<div onClick={() => changeSelectorCategory('action')} style={{
				...styles.category,
				backgroundColor: colors.action
			}}>Actions</div>
			<div onClick={() => changeSelectorCategory('variable')} style={{
				...styles.category,
				backgroundColor: colors.variable
			}}>Variables</div>
			<div onClick={() => changeSelectorCategory('math')} style={{
				...styles.category,
				backgroundColor: colors.math
			}}>Math</div>
		</div>
	)
}
