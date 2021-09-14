import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { mathFuncs, colors, dispNames, keywords } from '../global-consts'

const styles = {
	blockArea: {
		marginBottom: '5px',
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
// Variables for controlling the display
var panX = 0;
var panY = 0;
var zoom = 0;
var isPanning;
// For the block selector
var scroll = 0;
// Determines which block selection category to show
var selectorCategory = 'variable';
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
// (Primary) ID of the block currently being dragged
var dragID = null;

// The block that the mouse is over in the selector
var curSelectorBlock = null;

// Indices for the last ID handled
var lastFuncIndex = 0;
var lastActIndex = 0;

export function changeSelectorCategory(category) {
	selectorCategory = category;
	scroll = 0;
	drawBlocks();
}

export function newVariable() {
	let name = prompt(`Variables must
-Start with a letter
-Only contain numbers and letters
-Be unique
-Not be a reserved GLSL keyword`);
	if (checkName(name)) {
		blocks.variables.push(name);
		drawBlocks();
	}
}

export function deleteVariable() {
	let name = prompt(`Variable name to delete`);
	let index = blocks.variables.indexOf(name);
	if (index === -1) {
		return;
	}
	blocks.variables.splice(index, 1);
	for (let func of blocks.functions) {
		for (let act of func.actions) {
			wipeAction(act, name);
		}
	}
	let i = 0;
	for (let block of blocks.freeBlocks) {
		if (Array.isArray(block)) {
			for (let act of block) {
				wipeAction(act, name);
			}
		} else if (block.name === name) {
			blocks.freeBlocks.splice(i, 1);
		}
		i++;
	}
	drawBlocks();
}

function wipeAction(act, name) {
	if (act.variable === name) {
		act.variable = '_';
	}
	if (act.name === name) {
		act.name = '_';
	}
	for (let i = 0; i < act.args.length; i++) {
		if (act.args[i] === name) {
			act.args[i] = 1;
		}
	}
}

export function newFunction() {
	let name = prompt(`Functions must
-Start with a letter
-Only contain numbers and letters
-Be unique
-Not be a reserved GLSL keyword`);
	if (checkName(name)) {
		blocks.functions.push({
			name,
			x: panX,
			y: panY,
			actions: []
		});
		drawBlocks();
	}
}

function checkName(name) {
	if (validateName(name) && !blocks.variables.includes(name) && !keywords.has(name)) {
		for (let func of blocks.functions) {
			if (func.name === name) {
				return false;
			}
		}
		return true;
	}
	return false;
}

function validateName(str) {
	return str !== null && str.match('^[a-zA-Z][a-zA-Z0-9]*$') !== null;
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

function drawVar(varName, isField = true) {
	if (isNaN(varName)) {
		if (varName in dispNames) {
			drawText(dispName(varName), colors.input, isField);
		} else {
			drawText(varName, colors.variable, isField);
		}
	} else {
		drawText(varName, colors.raw, isField);
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
	if (primID !== dragID) {
		if (isField) {
			stencil.fillStyle = IDColor();
			stencil.fillRect(0, 14, width + 20, -50);
			argID++;
		} else {
			stencil.fillStyle = IDColor(0);
			stencil.fillRect(0, 14, width + 20, -50);
		}
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
	drawVar(variable);
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
			drawText(action.name, colors.function, true);
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
			drawText('set', colors.math);
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
	if (primID !== dragID) {
		stencil.fill();
	}

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

function drawFreeBlock(freeBlock) {
	ctx.save();
	stencil.save();

	if (Array.isArray(freeBlock)) {
		ctx.translate(freeBlock[0].x, freeBlock[0].y);
		stencil.translate(freeBlock[0].x, freeBlock[0].y);
		for (let action of freeBlock) {
			drawAction(action);
		}
	} else {
		ctx.translate(freeBlock.x, freeBlock.y);
		stencil.translate(freeBlock.x, freeBlock.y);
		if (freeBlock.type === 'variable') {
			drawVar(freeBlock.name, false);
		} else {
			drawText(freeBlock.name, colors.function);
		}
		primID++;
	}

	ctx.restore();
	stencil.restore();
}

// This also handles figuring out what the mouse is over in the selector
function drawSelector() {
	ctx.fillStyle = '#303030';
	let width = 512 * window.devicePixelRatio;
	let height = ctx.canvas.height - 333 * window.devicePixelRatio;
	ctx.fillRect(ctx.canvas.width, ctx.canvas.height, -width, -height);
	ctx.globalAlpha = 1;
	let transY = ctx.canvas.height - height;
	ctx.translate(ctx.canvas.width - width, ctx.canvas.height - height);
	ctx.translate(20, 65);
	transY += 65;
	ctx.translate(0, scroll);
	transY += scroll;
	curSelectorBlock = null;
	if (selectorCategory === 'variable') {
		for (let variable of ['gl_FragCoord.x', 'gl_FragCoord.y', '_time', '_window.x', '_window.y']
				.concat(blocks.variables)) {
			ctx.save();
			drawVar(variable);
			ctx.restore();
			let rel = transY - mouseY;
			if (rel < 35 && rel > -17) {
				let pos = mouseToCanvas(mouseX, mouseY);
				pos.x -= ctx.measureText(dispName(variable)).width / 2;
				pos.y += 10;
				curSelectorBlock = {
					...pos,
					type: 'variable',
					name: variable
				}
			}
			ctx.translate(0, 60);
			transY += 60;
		}
	} else if (selectorCategory === 'math') {
		for (let mathFunc in mathFuncs) {
			ctx.save();
			let act = {
				variable: '_',
				name: mathFunc,
				type: 'math',
				args: Array.isArray(mathFuncs[mathFunc]) ? [1, 1] : [1]
			}
			drawAction(act);
			ctx.restore();
			let rel = transY - mouseY;
			if (rel < 35 && rel > -17) {
				let pos = mouseToCanvas(mouseX, mouseY);
				pos.x -= 50;
				pos.y += 15;
				act.x = pos.x;
				act.y = pos.y;
				curSelectorBlock = [act];
			}
			ctx.translate(0, 60);
			transY += 60;
		}
	} else if (selectorCategory === 'action') {
		let acts = [
			{
				type: 'output',
				args: [0, 0, 0]
			},
			{
				type: 'assign',
				variable: '_',
				args: [0]
			},
			{
				type: 'add',
				variable: '_',
				args: [0]
			},
			{
				type: 'subtract',
				variable: '_',
				args: [0]
			},
			{
				type: 'multiply',
				variable: '_',
				args: [1]
			},
			{
				type: 'divide',
				variable: '_',
				args: [1]
			},
			{
				type: 'power',
				variable: '_',
				args: [1]
			},
			{
				type: 'function',
				name: '_',
				args: [1]
			}
		]
		for (let act of acts) {
			ctx.save();
			drawAction(act);
			ctx.restore();
			let rel = transY - mouseY;
			if (rel < 35 && rel > -17) {
				let pos = mouseToCanvas(mouseX, mouseY);
				pos.x -= 50;
				pos.y += 15;
				act.x = pos.x;
				act.y = pos.y;
				curSelectorBlock = [act];
			}
			ctx.translate(0, 60);
			transY += 60;
		}
	} else {
		for (let func of blocks.functions) {
			func = func.name;
			if (func !== 'main') {
				ctx.save();
				drawText(func, colors.function);
				ctx.restore();
				let rel = transY - mouseY;
				if (rel < 35 && rel > -17) {
					let pos = mouseToCanvas(mouseX, mouseY);
					pos.x -= ctx.measureText(dispName(func)).width / 2;
					pos.y += 10;
					curSelectorBlock = {
						...pos,
						type: 'function',
						name: func
					}
				}
				ctx.translate(0, 60);
				transY += 60;
			}
		}
	}
}

// Draws everything that needs to be drawn in the block area canvas
// Also draws the stencil map for clicking
function drawBlocks() {
	primID = 0;
	argID = 0;
	ctx.resetTransform();
	stencil.resetTransform();
	ctx.globalAlpha = 1;
	stencil.globalAlpha = 1;
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
	ctx.globalAlpha = 0.7;
	for (let freeBlock of blocks.freeBlocks) {
		drawFreeBlock(freeBlock);
	}
	ctx.resetTransform();
	stencil.globalAlpha = 0;
	drawSelector();
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

function handleSelectionAction(action, argument, value) {
	if (argument === 0) {
		return action;
	}
	if (action.type === 'output') {
		action.args[argument - 1] = value !== null ? value : action.args[argument - 1];
		return action.args[argument - 1];
	} else if (action.type === 'function') {
		if (argument === 1) {
			action.name = value !== null ? value : action.name;
			return action.name;
		} else {
			action.args[argument - 2] = value !== null ? value : action.args[argument - 2];
			return action.args[argument - 2];
		}
	} else if (action.type === 'math') {
		if (argument === 1) {
			action.variable = value !== null ? value : action.variable;
			return action.variable;
		} else {
			action.args[argument - 2] = value !== null ? value : action.args[argument - 2];
			return action.args[argument - 2];
		}
	} else {
		if (argument === 1) {
			action.variable = value !== null ? value : action.variable;
			return action.variable;
		} else {
			action.args[argument - 2] = value !== null ? value : action.args[argument - 2];
			return action.args[argument - 2];
		}
	}
}

// Convert mouse coordinates to canvas/block coordinates
function mouseToCanvas(x, y) {
	return {
		x: (x - ctx.canvas.width / 2 - panX) / 2 ** zoom,
		y: (y - ctx.canvas.height / 2 - panY) / 2 ** zoom
	}
}

// Returns the selection and changes to value if not null
function handleSelection({ primary, argument }, value = null) {
	let counter = 0;
	lastFuncIndex = 0;
	for (let func of blocks.functions) {
		if (primary === counter) {
			lastActIndex = -1;
			return func;
		}
		if (primary > counter && primary <= counter + func.actions.length) {
			let action = func.actions[primary - 1 - counter];
			lastActIndex = primary - 1 - counter;
			let ret = handleSelectionAction(action, argument, value);
			if (ret !== undefined) {
				return ret;
			}
		}
		counter += func.actions.length + 1;
		lastFuncIndex++;
	}
	lastFuncIndex = -1;
	for (let freeBlock of blocks.freeBlocks) {
		lastFuncIndex--;
		if (primary === counter && !Array.isArray(freeBlock)) {
			lastActIndex = -1;
			return freeBlock;
		}
		if (Array.isArray(freeBlock) && primary >= counter
			&& primary < counter + freeBlock.length) {
			let action = freeBlock[primary - counter];
			lastActIndex = primary - counter;
			let ret = handleSelectionAction(action, argument, value);
			if (ret !== undefined) {
				return ret;
			}
		}
		counter += Array.isArray(freeBlock) ? freeBlock.length : 1;
	}
}

function deleteFreeBlock(block) {
	let i = 0;
	for (let freeBlock of blocks.freeBlocks) {
		let b = Array.isArray(freeBlock) ? freeBlock[0] : freeBlock;
		if (b === block) {
			blocks.freeBlocks.splice(i, 1);
			return;
		}
		i++;
	}
}

function deleteFunc(func) {
	if (func.name === 'main') {
		return;
	}
	let index = -1;
	for (let i = 0; i < blocks.functions.length; i++) {
		if (blocks.functions[i].name === func.name) {
			index = i;
			break;
		}
	}
	console.log(index);
	if (index === -1) {
		return;
	}
	blocks.functions.splice(index, 1);
	for (let f of blocks.functions) {
		for (let act of f.actions) {
			wipeAction(act, func.name);
		}
	}
	let i = 0;
	for (let block of blocks.freeBlocks) {
		if (Array.isArray(block)) {
			for (let act of block) {
				wipeAction(act, func.name);
			}
		} else if (block.name === func.name) {
			blocks.freeBlocks.splice(i, 1);
		}
		i++;
	}
	i++;
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

		window.download = () => {
			let link = document.createElement('a');
			link.download = 'filename.png';
			link.href = stencil.canvas.toDataURL();
			link.click();
		}
	}, [width, height]);

	useLayoutEffect(() => {

		const updateWindow = () => {
			setWidth(ref.current.clientWidth);
			setHeight(ref.current.clientHeight);
		}

		const changeZoom = (e) => {
			updateMouse(e);
			if ((ctx.canvas.width - mouseX) / window.devicePixelRatio < 512) {
				let newScroll = scroll + e.wheelDeltaY / 1;
				if (newScroll <= 0) {
					scroll = newScroll;
					drawBlocks();
				}
				return;
			}
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

		const selectorClick = (e) => {
			if (curSelectorBlock !== null) {
				blocks.freeBlocks.push(curSelectorBlock);
				drawBlocks();
				dragID = getPositionSelection(mouseX, mouseY).primary;
			}
		}

		const mousedown = (e) => {
			updateMouse(e);
			drawSelector();
			if ((ctx.canvas.width - mouseX) / window.devicePixelRatio < 512) {
				selectorClick(e);
				return;
			}
			let id = getPositionSelection(mouseX, mouseY);
			if (id != null) {
				let sel = handleSelection(id);
				if (typeof sel !== 'object' && !isNaN(sel)) {
					let value = prompt('Edit Field', sel);
					if (!isNaN(value) && !isNaN(parseFloat(value))) {
						handleSelection(id, value);
						drawBlocks();
						props.setChangeCount(props.changeCount + 1);
					}
				} else {
					if (id.argument === 0) {
						if (sel.x !== undefined) {
							dragID = id.primary;
						} else {
							let pos = mouseToCanvas(mouseX, mouseY);
							pos.x -= 50;
							pos.y += 15;
							sel.x = pos.x;
							sel.y = pos.y;
							if (lastFuncIndex >= 0) {
								blocks.freeBlocks.push(
									blocks.functions[lastFuncIndex].actions.splice(lastActIndex));
							} else {
								blocks.freeBlocks.push(
									blocks.freeBlocks[-lastFuncIndex - 2].splice(lastActIndex));
							}
							drawBlocks();
							dragID = getPositionSelection(mouseX, mouseY).primary;
							drawBlocks();
							props.setChangeCount(props.changeCount + 1);
						}
					} else if (sel !== '_') {
						let type = 'variable';
						let action = handleSelection({ primary: id.primary, argument: 0 });
						if (action.type === 'function' && id.argument === 1) {
							type = 'function';
						}
						let pos = mouseToCanvas(mouseX, mouseY);
						pos.x -= ctx.measureText(dispName(sel)).width / 2;
						pos.y += 10;
						blocks.freeBlocks.push({
							type,
							name: sel,
							...pos
						});
						drawBlocks();
						dragID = getPositionSelection(mouseX, mouseY).primary;
						if (action.type === 'output' || id.argument > 1) {
							handleSelection(id, 1);
						}
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
			} else if (dragID !== null) {
				let block = handleSelection({ primary: dragID, argument: 0 });
				if (isChrome) {
					block.x += e.movementX / 2 ** zoom;
					block.y += e.movementY / 2 ** zoom;
				} else {
					block.x += e.movementX * window.devicePixelRatio / 2 ** zoom;
					block.y += e.movementY * window.devicePixelRatio / 2 ** zoom;
				}
				drawBlocks();
			}
		}

		const mouseup = (e) => {
			updateMouse(e);
			isPanning = false;
			if (dragID !== null) {
				let block = handleSelection({ primary: dragID, argument: 0 });
				if (block.args) {
					if (mouseX < 0) {
						deleteFreeBlock(block);
					}
					let upY = mouseY - 50 * 2 ** zoom;
					let aboveID = getPositionSelection(mouseX, upY);
					if (aboveID !== null) {
						let above = handleSelection(aboveID);
						if (above !== null) {
							let freeBlock = null;
							let index = 0;
							for (let blk of blocks.freeBlocks) {
								if (Array.isArray(blk) && blk[0] === block) {
									freeBlock = blk;
									break;
								}
								index++;
							}
							if (lastFuncIndex >= 0) {
								blocks.functions[lastFuncIndex].actions.push(...freeBlock);
								blocks.freeBlocks.splice(index, 1);
								props.setChangeCount(props.changeCount + 1);
								delete block.x;
								delete block.y;
							} else if (Array.isArray(blocks.freeBlocks[-lastFuncIndex - 2])) {
								blocks.freeBlocks[-lastFuncIndex - 2].push(...freeBlock);
								blocks.freeBlocks.splice(index, 1);
								props.setChangeCount(props.changeCount + 1);
								delete block.x;
								delete block.y;
							}

						}
					}
				} else if (block.actions) {
					if (mouseX < 0) {
						deleteFunc(block);
						props.setChangeCount(props.changeCount + 1);
					}
				} else {
					let id = getPositionSelection(mouseX, mouseY);
					if (id !== null) {
						if (id.argument > 0) {
							let action = handleSelection({ primary: id.primary, argument: 0 });
							if (block.type === 'function'
								&& action.type === 'function' && id.argument === 1) {
								action.name = block.name;
								deleteFreeBlock(block);
								props.setChangeCount(props.changeCount + 1);
							} else if (block.type === 'variable'
								&& (!(block.name in dispNames || action.type === 'function')
									|| id.argument > 1)) {
								handleSelection(id, block.name);
								deleteFreeBlock(block);
								props.setChangeCount(props.changeCount + 1);
							}
						}
					}
					if (mouseX < 0) {
						deleteFreeBlock(block);
					}
				}
			}
			dragID = null;
			drawBlocks();
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
