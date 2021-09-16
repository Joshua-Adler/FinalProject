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
		width: '150px',
		height: '35px',
		marginTop: 'auto',
		marginBottom: 'auto',
		textAlign: 'center'
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
		animatePreview(false);
	}

	useEffect(() => {
		let cvs = document.getElementById('previewCanvas');

		const updateCanvasDims = () => {
			let dims = cvs.getBoundingClientRect();
			// Rounding to resolve truncation issues
			cvs.width = Math.round(dims.width * ratio);
			cvs.height = Math.round(dims.height * ratio);
		}

		window.addEventListener('resize', updateRatio);
		cvs.addEventListener('fullscreenchange', updateCanvasDims);
		return () => {
			window.removeEventListener('resize', updateRatio);
			cvs.removeEventListener('fullscreenchange', updateCanvasDims);
		}
	}, [ratio]);

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
				program.frag.setUniform2f('_window', cvs.width, cvs.height);
				if (isPaused) {
					program.frag.setUniform1f('_time', (pauseTime - anchorTime) / 1000);
				} else {
					program.frag.setUniform1f('_time', (Date.now() - anchorTime) / 1000);
				}
				program.draw();
			}
			if (!isPaused && keepGoing) {
				animReqID = requestAnimationFrame(animatePreview);
			}
		}

		animReqID = requestAnimationFrame(animatePreview);
	}, [props.blocks, ratio, props.changeCount, isPaused]);

	useEffect(() => {
		anchorTime = Date.now();
	}, [props.blocks]);

	const play = () => {
		if (animatePreview) {
			//animReqID = requestAnimationFrame(animatePreview);
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

	const fullscreen = async () => {
		let cvs = document.getElementById('previewCanvas');
		await cvs.requestFullscreen();
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
				<div onClick={fullscreen} style={styles.controlButton}>Full Screen</div>
			</div>
		</div>
	)
}
