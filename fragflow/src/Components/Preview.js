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
		display: 'flex',
		justifyContent: 'space-evenly',
		backgroundColor: '#404040',
		height: '50px'
	},
	controlButton: {
		backgroundColor: 'dimgray',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		border: '1px solid white',
		userSelect: 'none',
		paddingLeft: '10px',
		paddingRight: '10px',
		height: '35px',
		marginTop: 'auto',
		marginBottom: 'auto'
	}
}

// ID for the animations being requested so they can be cancelled as needed
var animReqID = null;
// Time to be marked as 0
var anchorTime = Date.now();
// Time the user paused at, used for updating anchorTime on unpause
var pauseTime = 0;
// Needs to be set in a layout effect but accessible globally
var animatePreview;

export default function Preview(props) {
	const [ratio, setRatio] = useState(window.devicePixelRatio);
	const [isPaused, setIsPaused] = useState(false);

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
		let cvs = document.getElementById('previewCanvas');
		let gl = cvs.getContext('webgl2');
		let code = transpile(props.blocks);
		console.log(code);
		let program = new Program(new FragmentShader(code, gl), gl);

		if (animReqID !== null) {
			cancelAnimationFrame(animReqID);
		}

		animatePreview = (keepGoing = true) => {
			if (program !== null) {
				program.frag.setUniform2f('_window', 512 * ratio, 288 * ratio);
				program.frag.setUniform1f('_time', (Date.now() - anchorTime) / 1000);
				program.draw();
			}
			if (keepGoing) {
				animReqID = requestAnimationFrame(animatePreview);
			}
		}

		animReqID = requestAnimationFrame(animatePreview);
	}, [props.blocks, ratio, props.changeCount]);

	const play = () => {
		if (animatePreview) {
			requestAnimationFrame(animatePreview);
		}
		anchorTime += Date.now() - pauseTime;
		setIsPaused(false);
	}

	const pause = () => {
		if (animReqID !== null) {
			cancelAnimationFrame(animReqID);
		}
		pauseTime = Date.now();
		setIsPaused(true);
	}

	const restart = () => {
		anchorTime = Date.now();
		if(isPaused) {
			animatePreview(false);
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<canvas style={styles.viewport} id='previewCanvas'
				width={`${512 * ratio}`} height={`${288 * ratio}`} />
			<div style={styles.viewControls}>
				{isPaused ?
					<div onClick={play} style={styles.controlButton}>Play</div>
					:
					<div onClick={pause} style={styles.controlButton}>Pause</div>
				}
				<div onClick={restart} style={styles.controlButton}>Restart</div>
			</div>
		</div>
	)
}
