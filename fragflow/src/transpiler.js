export function transpile(blockData) {
	let code = '#version 300 es\nprecision highp float;\n\n';
	code += 'out vec4 _outColor;\n\n';
	code += 'uniform float _time;\n';
	code += 'uniform vec2 _window;\n\n';
	for (let variable of blockData.variables) {
		code += `float ${variable};\n`;
	}
	code += '\n';
	for (let func of blockData.functions) {
		if (func.name !== 'main')
			code += `void ${func.name}(int _count);\n`;
	}
	code += '\n';
	for (let func of blockData.functions) {
		code += funcToString(func);
	}
	return code;
}

function indent(n) {
	return '\t'.repeat(n);
}

function funcToString(func) {
	let code = null;
	
	if (func.name === 'main') {
		code = `void ${func.name}() {\n`;
		for (let action of func.actions) {
			code += actionToString(action, 1);
		}
	} else {
		code = `void ${func.name}(int _count) {\n`;
		code += 'for(int i = 0; i < _count; i++) {\n';
		for (let action of func.actions) {
			code += actionToString(action, 2);
		}
		code += '\t}\n';
	}
	code += '}\n\n';
	return code;
}

let actStrFuncs = {
	assign: (action, indentation) => {
		return `${indent(indentation)}${action.variable} = ${argToString(action.args[0])};\n`;
	},
	add: (action, indentation) => {
		return `${indent(indentation)}${action.variable} += ${argToString(action.args[0])};\n`;
	},
	subtract: (action, indentation) => {
		return `${indent(indentation)}${action.variable} -= ${argToString(action.args[0])};\n`;
	},
	multiply: (action, indentation) => {
		return `${indent(indentation)}${action.variable} *= ${argToString(action.args[0])};\n`;
	},
	divide: (action, indentation) => {
		return `${indent(indentation)}${action.variable} /= ${argToString(action.args[0])};\n`;
	},
	power: (action, indentation) => {
		return `${indent(indentation)}${action.variable} = pow(${action.variable}, ${argToString(action.args[0])});\n`;
	},
	function: (action, indentation) => {
		return `${indent(indentation)}${action.name}(int(${action.args[0]}));\n`
	},
	output: (action, indentation) => {
		return `${indent(indentation)}_outColor = vec4(${argsToString(action.args)}, 1.);\n`;
	},
	math: (action, indentation) => {
		return `${indent(indentation)}${action.variable} = ${action.name}(${argsToString(action.args)});\n`;
	}
}

function actionToString(action, indentation) {
	return actStrFuncs[action.type](action, indentation);
}

// Returns all the args separated by commas
function argsToString(args) {
	args = args.map(argToString);
	return args.join(', ');
}

function argToString(arg) {
	if (!isNaN(arg) && arg.toString().indexOf('.') === -1) {
		return `${arg}.`;
	}
	return arg;
}