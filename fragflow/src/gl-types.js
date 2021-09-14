export class Program {

	constructor(frag, gl) {
		// Make the vertex shader, it's the same every single time
		let vert = new VertexShader('#version 300 es\nprecision highp float;in vec3 _coord;void main(void) {gl_Position = vec4(_coord, 1.0);}', gl)
		this.gl = gl;
		// Make program
		this.program = gl.createProgram();
		// Attach shaders
		gl.attachShader(this.program, vert.shader);
		gl.attachShader(this.program, frag.shader);
		// Link program
		gl.linkProgram(this.program);
		// Set the program to be used
		gl.useProgram(this.program);
		// Build the shape (just a square, made of 2 triangles) to be drawn
		this.buildShape();
		// Make sure that the shader can access the program and vice versa,
		// for uniform setting
		this.frag = frag;
		frag.program = this.program;
	}

	// Code in this method has been copied from tutorialspoint
	// It's not like there's a unique way to do this, anyway
	draw() {
		// Clear the canvas
		this.gl.clearColor(0.2, 0, 0.2, 1);
		// Clear the color buffer bit
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		// Set the view port
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		// Draw the triangle
		this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
	}

	// Code in this method has been stitched together from tutorialspoint
	// It's not like there's a unique way to do this, anyway
	buildShape() {
		let vertices = [
			-1, 1, 0,
			-1, -1, 0,
			1, -1, 0,
			1, 1, 0
		];
		this.indices = [3, 2, 1, 3, 1, 0];
		// Create an empty buffer object to store vertex buffer
		let vertex_buffer = this.gl.createBuffer();
		// Bind appropriate array buffer to it
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
		// Pass the vertex data to the buffer
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		// Unbind the buffer
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		// Create an empty buffer object to store Index buffer
		let Index_Buffer = this.gl.createBuffer();
		// Bind appropriate array buffer to it
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
		// Pass the vertex data to the buffer
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
		// Unbind the buffer
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

		// Bind vertex buffer object
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
		// Bind index buffer object
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
		// Get the attribute location
		let coord = this.gl.getAttribLocation(this.program, '_coord');
		// Point an attribute to the currently bound VBO
		this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
		// Enable the attribute
		this.gl.enableVertexAttribArray(coord);
	}
}

class Shader {

	constructor(code, shader, gl) {
		this.shader = shader;
		gl.shaderSource(shader, code);
		gl.compileShader(shader);
		this.gl = gl;
		this.errorCheck();
	}

	// Gets the info log and uses it to see if there are any errors
	errorCheck() {
		let err = this.gl.getShaderInfoLog(this.shader);
		if (err.length > 0) {
			console.error('There was a shader error!');
			console.error(err);
		}
	}

	setUniform1f(name, v) {
		let loc = this.gl.getUniformLocation(this.program, name);
		this.gl.uniform1f(loc, v);
	}

	setUniform2f(name, v0, v1) {
		let loc = this.gl.getUniformLocation(this.program, name);
		this.gl.uniform2f(loc, v0, v1);
	}

	setUniform3f(name, v0, v1, v2) {
		let loc = this.gl.getUniformLocation(this.program, name);
		this.gl.uniform3f(loc, v0, v1, v2);
	}

	setUniform4f(name, v0, v1, v2, v3) {
		let loc = this.gl.getUniformLocation(this.program, name);
		this.gl.uniform4f(loc, v0, v1, v2, v3);
	}
}

class VertexShader extends Shader {

	constructor(code, gl) {
		super(code, gl.createShader(gl.VERTEX_SHADER), gl);
	}
}

export class FragmentShader extends Shader {

	constructor(code, gl) {
		super(code, gl.createShader(gl.FRAGMENT_SHADER), gl);
	}
}