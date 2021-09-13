import React, { useState, useEffect, useLayoutEffect } from 'react'

import { transpile } from '../transpiler'
import { Program, FragmentShader } from '../gl-types'

const styles = {
	viewport: {
		width: '512px',
		height: '288px',
		backgroundColor: 'black'
	},
	viewControls: {
		backgroundColor: 'orange',
		height: '50px'
	}
}

var animReqID = null;
var anchorTime = Date.now();

export default function Preview(props) {
	const [ratio, setRatio] = useState(window.devicePixelRatio);

	const updateRatio = () => {
		setRatio(window.devicePixelRatio);
	}

	useEffect(() => {
		window.addEventListener('resize', updateRatio);
		return () => {
			window.removeEventListener('resize', updateRatio);
		}
	}, [])

	useLayoutEffect(() => {
		// Build the shader from the blocks and makes it render in the canvas
		let gl = document.getElementById('previewCanvas').getContext('webgl2');
		let code = transpile(props.blocks);
		console.log(code);
		let program = new Program(new FragmentShader(code, gl), gl);

		if(animReqID !== null) {
			cancelAnimationFrame(animReqID);
		}

		const animatePreview = () => {
			if (program !== null) {
				program.frag.setUniform2f('_window', 512 * ratio, 288 * ratio);
				program.frag.setUniform1f('_time', (Date.now() - anchorTime) / 1000);
				program.draw();
			}
			animReqID = requestAnimationFrame(animatePreview);
		}

		animReqID = requestAnimationFrame(animatePreview);
	}, [props.blocks, ratio, props.changeCount]);


	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<canvas style={styles.viewport} id='previewCanvas'
				width={`${512 * ratio}`} height={`${288 * ratio}`} />
			<div style={styles.viewControls}>

			</div>
		</div>
	)
}
