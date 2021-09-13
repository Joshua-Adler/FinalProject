import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { mathFuncs, colors, dispNames } from '../global-consts'

const styles = {
	blockArea: {
		marginTop: '15px',
		marginBottom: '15px',
		width: '100%',
		display: 'block',
	},
	anchor: {
		width: '1000000px',
		height: '1000000px',
		position: 'relative',
		left: '-500000px',
		top: '-500000px',
	},
	canvas: {
		width: '100%',
		height: '100%'
	}
}

// The canvas 2d context
var ctx = null;
// The context for the stencil canvas used to determine what the user is clicking
// Not quite the same as an actual stencil buffer, but similar
var stencil = null;
// Variables for controlling the display, no re-rendering necessary
var panX = 0;
var panY = 0;
var zoom = 0;
var isPanning;
// Determines which block selection category to show
var selectorCategory = 'none';
// Keep the blocks in a place that can be globally accessed
var blocks = null;
// Mouse coordinates
var mouseX = 0;
var mouseY = 0;
// Behavior of event.movement<XY> is different in Chrome and Firefox
var isChrome = navigator.userAgent.indexOf('Chrome') !== -1;

// The ID system is merely for identifying a given block or group of blocks
// at a given time, it does not guarantee any consistency over time

// Primary and argument IDs, to be drawn onto the stencil
var primID = 0;
var argID = 0;
// ID of the block currently being dragged
// Positive values are functions, negative values are free blocks
var dragID = null;

export function changeSelectorCategory(category) {
	selectorCategory = category;
	drawBlocks();
}

// Returns the display name for a variable,
// which is sometimes different from the actual name
function dispName(name) {
	if (name in dispNames) {
		return dispNames[name];
	}
	return name;
}

// Convert the primID and argID into a color
function IDColor(override = argID) {
	return `rgb(${Math.floor(primID / 256)}, ${primID % 256}, ${override})`;
}

function drawVar(varName) {
	if (isNaN(varName)) {
		if (varName in dispNames) {
			drawText(dispName(varName), colors.input, true);
		} else {
			drawText(varName, colors.variable, true);
		}
	} else {
		drawText(varName, colors.raw, true);
	}
}

// Draws text in the given color so it looks like an action block
// Will also translate the canvas for repeated calls to keep working
function drawText(text, color, isField = false) {
	ctx.save();
	stencil.save();

	let width = ctx.measureText(text).width;
	ctx.fillStyle = color;
	ctx.fillRect(0, 14, width + 20, -50);
	if (isField) {
		stencil.fillStyle = IDColor();
		stencil.fillRect(0, 14, width + 20, -50);
		argID++;
	} else {
		stencil.fillStyle = IDColor(0);
		stencil.fillRect(0, 14, width + 20, -50);
	}
	ctx.strokeStyle = colors.border;
	ctx.strokeRect(0, 14, width + 20, -50);
	ctx.fillStyle = colors.text;
	ctx.fillText(text, 10, 0);

	ctx.restore();
	stencil.restore();

	ctx.translate(width + 20, 0);
	stencil.translate(width + 20, 0);
}

function drawAssignMathAction(txt1, variable, txt2, args) {
	drawText(txt1, colors.action);
	drawVar(dispName(variable));
	drawText(txt2, colors.action);
	for (let arg of args) {
		drawVar(arg);
	}
}

function drawAction(action) {
	argID++;
	ctx.save();
	stencil.save();
	switch (action.type) {
		case 'assign':
			drawAssignMathAction('set', action.variable, 'to', action.args);
			break;
		case 'add':
			drawAssignMathAction('add to', action.variable, 'by', action.args);
			break;
		case 'subtract':
			drawAssignMathAction('subtract from', action.variable, 'by', action.args);
			break;
		case 'multiply':
			drawAssignMathAction('multiply', action.variable, 'by', action.args);
			break;
		case 'divide':
			drawAssignMathAction('divide', action.variable, 'by', action.args);
			break;
		case 'power':
			drawAssignMathAction('raise', action.variable, 'to the power of', action.args);
			break;
		case 'function':
			drawText('run', colors.action);
			drawText(dispName(action.name), colors.function, true);
			drawVar(action.args[0]);
			drawText(action.args[0] === 1 ? 'time' : 'times', colors.action);
			break;
		case 'output':
			drawText('output color', colors.output);
			drawText('R:', '#A00000');
			drawVar(action.args[0]);
			drawText('G:', '#00A000');
			drawVar(action.args[1]);
			drawText('B:', '#0000A0');
			drawVar(action.args[2]);
			break;
		case 'math':
			drawText('set', colors.action);
			drawVar(action.variable);
			let func = mathFuncs[action.name];
			if (typeof func === 'string') {
				drawText(`to the ${func} of`, colors.math);
				drawVar(action.args[0]);
			} else {
				drawText(`to the ${func[0]} of`, colors.math);
				for (let i = 0; i < func[1]; i++) {
					drawVar(action.args[i]);
					if (i !== func[i] - 1) {
						drawText('and', colors.math);
					}
				}
			}
			break;
		default:
			alert('Error: unrecognized action type ' + action.type);
			break;
	}
	ctx.restore();
	stencil.restore();

	ctx.translate(0, 50);
	stencil.translate(0, 50);
	primID++;
	argID = 0;
}

function drawFunc(func) {
	ctx.save();
	stencil.save();

	ctx.translate(func.x, func.y);
	stencil.translate(func.x, func.y);
	let metric = ctx.measureText(func.name);
	ctx.fillStyle = func.name === 'main' ? colors.main : colors.function;
	let rightX = metric.width + 20;
	stencil.fillStyle = IDColor();
	ctx.beginPath();
	stencil.beginPath();

	ctx.moveTo(0, -40);
	stencil.moveTo(0, -40);

	ctx.quadraticCurveTo(rightX / 2, -50 - rightX / 10, rightX, -40);
	stencil.quadraticCurveTo(rightX / 2, -50 - rightX / 10, rightX, -40);

	ctx.lineTo(rightX, 10);
	stencil.lineTo(rightX, 10);

	ctx.lineTo(0, 10);
	stencil.lineTo(0, 10);

	ctx.closePath();
	stencil.closePath();

	ctx.fill();
	stencil.fill();

	ctx.strokeStyle = colors.border;
	ctx.stroke();
	ctx.fillStyle = colors.text;
	ctx.fillText(func.name, 10, -4);
	ctx.save();
	stencil.save();

	ctx.translate(0, 46);
	stencil.translate(0, 46);
	primID++;
	argID = 0;
	for (let action of func.actions) {
		drawAction(action);
	}
	ctx.restore();
	ctx.restore();
	stencil.restore();
	stencil.restore();
}

// Draws everything that needs to be drawn in the block area canvas
// Also draws the stencil map for clicking
function drawBlocks() {
	primID = 0;
	argID = 0;
	ctx.resetTransform();
	stencil.resetTransform();
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	stencil.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.translate(panX, panY);
	stencil.translate(panX, panY);
	let scale = 2 ** zoom;
	ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
	stencil.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
	ctx.scale(scale, scale);
	stencil.scale(scale, scale);
	ctx.font = '36px consolas';
	for (let func of blocks.functions) {
		drawFunc(func);
	}
	//let link = document.createElement('a');
	//link.download = 'filename.png';
	//link.href = stencil.canvas.toDataURL();
	//link.click();
}

function newStencil() {
	stencil = document.createElement('canvas');
	stencil.width = ctx.canvas.width;
	stencil.height = ctx.canvas.height;
	stencil = stencil.getContext('2d');
}

// Recalculates the mouse position
function updateMouse(e) {
	let bounds = ctx.canvas.getBoundingClientRect();
	mouseX = (e.x - bounds.left) * window.devicePixelRatio;
	mouseY = (e.y - bounds.top) * window.devicePixelRatio;
}

// Gets the block ID at the given coordinates
function getPositionSelection(x, y) {
	let pixels = stencil.getImageData(x - 2, y - 2, 5, 5);
	if (!pixels || !pixels.data) {
		return null;
	}
	let freq = {};
	for (let i = 0; i < pixels.data.length; i += 4) {
		if (pixels.data[i + 3] === 255) {
			let primary = pixels.data[i] * 256 + pixels.data[i + 1];
			let argument = pixels.data[i + 2];
			let key = primary + argument * 65536;
			freq[key] = freq[key] ? freq[key] + 1 : 1;
		}
	}
	let primary = -1;
	let argument = 0;
	let best = 0;
	for (let key in freq) {
		if (freq[key] > best) {
			best = freq[key];
			primary = key % 65536;
			argument = Math.floor(key / 65536);
		}
	}
	return primary > -1 ? { primary, argument } : null;
}

function getSelection({ primary, argument }) {
	let counter = 0;
	for (let func of blocks.functions) {
		if (primary === counter) {
			return func;
		}
		if (primary > counter && primary <= counter + func.actions.length) {
			let action = func.actions[primary - 1 - counter];
			if (argument === 0) {
				return action;
			}
			if (action.type === 'output') {
				return action.args[argument - 1];
			}
			if (action.type === 'function' || action.type === 'math') {
				return argument === 1 ? action.name : action.args[argument - 2];
			}
			return argument === 1 ? action.variable : action.args[argument - 2];
		}
		counter += func.actions.length + 1;
	}
}

function setSelection({ primary, argument }, value) {
	let counter = 0;
	for (let func of blocks.functions) {
		if (primary === counter) {
			return;
		}
		if (primary > counter && primary <= counter + func.actions.length) {
			let action = func.actions[primary - 1 - counter];
			if (argument === 0) {
				return;
			}
			if (action.type === 'output') {
				action.args[argument - 1] = value;
			} else if (action.type === 'function' || action.type === 'math') {
				if (argument === 1) {
					action.name = value;
				} else {
					action.args[argument - 2] = value;
				}
			} else {
				if (argument === 1) {
					action.variable = value;
				} else {
					action.args[argument - 2] = value;
				}
			}
		}
		counter += func.actions.length + 1;
	}
}

export default function BlockArea(props) {
	const ref = useRef(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	blocks = props.blocks;

	useLayoutEffect(() => {
		ctx = document.getElementById('blockCanvas').getContext('2d');
		ctx.canvas.width = width * window.devicePixelRatio;
		ctx.canvas.height = height * window.devicePixelRatio;
		newStencil();
		requestAnimationFrame(() => drawBlocks());
	}, [width, height]);

	useLayoutEffect(() => {

		const updateWindow = () => {
			setWidth(ref.current.clientWidth);
			setHeight(ref.current.clientHeight);
		}

		const changeZoom = (e) => {
			updateMouse(e);
			let newZoom = zoom + e.wheelDeltaY / 500;
			if (newZoom <= 3 && newZoom >= -3) {
				let panScale = 2 ** newZoom - 2 ** zoom;
				let relX = -panX;
				let relY = -panY;
				relX += (mouseX - ctx.canvas.width / 2);
				relY += (mouseY - ctx.canvas.height / 2);
				panX -= relX * panScale / 2 ** zoom;
				panY -= relY * panScale / 2 ** zoom;
				zoom = newZoom;
				drawBlocks();
			}
		}

		const mousedown = (e) => {
			updateMouse(e);
			let id = getPositionSelection(mouseX, mouseY);
			if (id != null) {
				let sel = getSelection(id);
				if (typeof sel !== 'object' && !isNaN(sel)) {
					let value = prompt('Edit Field', sel);
					if (value != null) {
						setSelection(id, value);
						drawBlocks();
						props.setChangeCount(props.changeCount + 1);
					}
				}
			} else {
				isPanning = true;
			}
		}

		const mousemove = (e) => {
			updateMouse(e);
			if (isPanning) {
				if (isChrome) {
					panX += e.movementX;
					panY += e.movementY;
				} else {
					panX += e.movementX * window.devicePixelRatio;
					panY += e.movementY * window.devicePixelRatio;
				}
				drawBlocks();
			}
		}

		const mouseup = (e) => {
			updateMouse(e);
			isPanning = false;
		}

		window.addEventListener('resize', updateWindow);
		ctx.canvas.addEventListener('wheel', changeZoom);
		document.addEventListener('mousemove', mousemove);
		ctx.canvas.addEventListener('mousedown', mousedown);
		document.addEventListener('mouseup', mouseup);
		updateWindow();
		return () => {
			window.removeEventListener('resize', updateWindow);
			ctx.canvas.removeEventListener('wheel', changeZoom);
			document.removeEventListener('mousemove', mousemove);
			ctx.canvas.removeEventListener('mousedown', mousedown);
			document.removeEventListener('mouseup', mouseup);
		}
	}, [props])

	return (
		<div ref={ref} style={styles.blockArea}>
			<canvas id="blockCanvas" style={styles.canvas} />
		</div>
	)
}
