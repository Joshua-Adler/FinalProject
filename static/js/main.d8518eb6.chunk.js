(this.webpackJsonpfragblocks=this.webpackJsonpfragblocks||[]).push([[0],{231:function(e,t,a){},232:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(96),i=a.n(r),o=a(4),c=a(16),s=a.n(c),l=a(8),u=a(61),d=a.n(u),f=a(97),h=a(3);function b(e){return"\t".repeat(e)}function v(e){var t=null;if("main"===e.name){t="void ".concat(e.name,"() {\n");var a,n=Object(h.a)(e.actions);try{for(n.s();!(a=n.n()).done;){t+=j(a.value,1)}}catch(o){n.e(o)}finally{n.f()}}else{t="void ".concat(e.name,"(int _count) {\n"),t+="\tfor(int _i = 0; _i < _count; _i++) {\n";var r,i=Object(h.a)(e.actions);try{for(i.s();!(r=i.n()).done;){t+=j(r.value,2)}}catch(o){i.e(o)}finally{i.f()}t+="\t}\n"}return t+="}\n\n"}var m={assign:function(e,t){return"".concat(b(t)).concat(e.variable," = ").concat(p(e.args[0]),";\n")},add:function(e,t){return"".concat(b(t)).concat(e.variable," += ").concat(p(e.args[0]),";\n")},subtract:function(e,t){return"".concat(b(t)).concat(e.variable," -= ").concat(p(e.args[0]),";\n")},multiply:function(e,t){return"".concat(b(t)).concat(e.variable," *= ").concat(p(e.args[0]),";\n")},divide:function(e,t){return"".concat(b(t)).concat(e.variable," /= ").concat(p(e.args[0]),";\n")},power:function(e,t){return"".concat(b(t)).concat(e.variable," = pow(").concat(e.variable,", ").concat(p(e.args[0]),");\n")},function:function(e,t){return"".concat(b(t)).concat(e.name,"(int(").concat(e.args[0],"));\n")},output:function(e,t){return"".concat(b(t),"_outColor = vec4(").concat(g(e.args),", 1.);\n")},math:function(e,t){return"".concat(b(t)).concat(e.variable," = ").concat(e.name,"(").concat(g(e.args),");\n")}};function j(e,t){if("_"===e.name||"_"===e.variable)return"";var a,n=Object(h.a)(e.args);try{for(n.s();!(a=n.n()).done;){if("_"===a.value)return""}}catch(r){n.e(r)}finally{n.f()}return m[e.type](e,t)}function g(e){return(e=e.map(p)).join(", ")}function p(e){return isNaN(e)||-1!==e.toString().indexOf(".")?e:"".concat(e,".")}var y,O=a(11),x=a(12),w=a(5),k=a(6),S=function(){function e(t,a){Object(w.a)(this,e);var n=new A("#version 300 es\nprecision highp float;in vec3 _coord;void main(void) {gl_Position = vec4(_coord, 1.0);}",a);this.gl=a,this.program=a.createProgram(),a.attachShader(this.program,n.shader),a.attachShader(this.program,t.shader),a.linkProgram(this.program),a.useProgram(this.program),this.buildShape(),this.frag=t,t.program=this.program}return Object(k.a)(e,[{key:"draw",value:function(){this.gl.clearColor(.2,0,.2,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.drawElements(this.gl.TRIANGLES,this.indices.length,this.gl.UNSIGNED_SHORT,0)}},{key:"buildShape",value:function(){this.indices=[3,2,1,3,1,0];var e=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,1,0,-1,-1,0,1,-1,0,1,1,0]),this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);var t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.indices),this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t);var a=this.gl.getAttribLocation(this.program,"_coord");this.gl.vertexAttribPointer(a,3,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(a)}}]),e}(),C=function(){function e(t,a,n){Object(w.a)(this,e),this.shader=a,n.shaderSource(a,t),n.compileShader(a),this.gl=n,this.errorCheck()}return Object(k.a)(e,[{key:"errorCheck",value:function(){var e=this.gl.getShaderInfoLog(this.shader);e.length>0&&(console.error("There was a shader error!"),console.error(e))}},{key:"setUniform1f",value:function(e,t){var a=this.gl.getUniformLocation(this.program,e);this.gl.uniform1f(a,t)}},{key:"setUniform2f",value:function(e,t,a){var n=this.gl.getUniformLocation(this.program,e);this.gl.uniform2f(n,t,a)}},{key:"setUniform3f",value:function(e,t,a,n){var r=this.gl.getUniformLocation(this.program,e);this.gl.uniform3f(r,t,a,n)}},{key:"setUniform4f",value:function(e,t,a,n,r){var i=this.gl.getUniformLocation(this.program,e);this.gl.uniform4f(i,t,a,n,r)}}]),e}(),A=function(e){Object(O.a)(a,e);var t=Object(x.a)(a);function a(e,n){return Object(w.a)(this,a),t.call(this,e,n.createShader(n.VERTEX_SHADER),n)}return a}(C),D=function(e){Object(O.a)(a,e);var t=Object(x.a)(a);function a(e,n){return Object(w.a)(this,a),t.call(this,e,n.createShader(n.FRAGMENT_SHADER),n)}return a}(C),R=a(1),E={viewport:{width:"512px",height:"288px",backgroundColor:"black"},viewControls:{display:"flex",justifyContent:"space-evenly",backgroundColor:"#404040",height:"50px"},controlButton:{backgroundColor:"dimgray",display:"flex",justifyContent:"center",flexDirection:"column",border:"1px solid white",userSelect:"none",width:"150px",height:"35px",marginTop:"auto",marginBottom:"auto",textAlign:"center"}},_=null,B=Date.now(),F=0;function T(e){var t=Object(n.useState)(window.devicePixelRatio),a=Object(o.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(!1),s=Object(o.a)(c,2),l=s[0],u=s[1],b=function(){i(window.devicePixelRatio),y(!1)};Object(n.useEffect)((function(){var e=document.getElementById("previewCanvas"),t=function(){var t=e.getBoundingClientRect();e.width=Math.round(t.width*r),e.height=Math.round(t.height*r)};return window.addEventListener("resize",b),e.addEventListener("fullscreenchange",t),function(){window.removeEventListener("resize",b),e.removeEventListener("fullscreenchange",t)}}),[r]),Object(n.useLayoutEffect)((function(){var t=document.getElementById("previewCanvas"),a=t.getContext("webgl2"),n=function(e){var t="#version 300 es\nprecision highp float;\n\n";t+="out vec4 _outColor;\n\n",t+="uniform float _time;\n",t+="uniform vec2 _window;\n\n";var a,n=Object(h.a)(e.variables);try{for(n.s();!(a=n.n()).done;){var r=a.value;t+="float ".concat(r,";\n")}}catch(u){n.e(u)}finally{n.f()}t+="\n";var i,o=Object(h.a)(e.functions);try{for(o.s();!(i=o.n()).done;){var c=i.value;"main"!==c.name&&(t+="void ".concat(c.name,"(int _count);\n"))}}catch(u){o.e(u)}finally{o.f()}t+="\n";var s,l=Object(h.a)(e.functions);try{for(l.s();!(s=l.n()).done;)t+=v(s.value)}catch(u){l.e(u)}finally{l.f()}return t}(e.blocks);console.log(n);var r=new S(new D(n,a),a);null!==_&&cancelAnimationFrame(_),y=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];null!==r&&(r.frag.setUniform2f("_window",t.width,t.height),l?r.frag.setUniform1f("_time",(F-B)/1e3):r.frag.setUniform1f("_time",(Date.now()-B)/1e3),r.draw()),!l&&e&&(_=requestAnimationFrame(y))},_=requestAnimationFrame(y)}),[e.blocks,r,e.changeCount,l]),Object(n.useEffect)((function(){B=Date.now()}),[e.blocks]);var m=function(){var e=Object(f.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("previewCanvas"),e.next=3,t.requestFullscreen();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(R.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(R.jsx)("canvas",{style:E.viewport,id:"previewCanvas",width:"".concat(512*r),height:"".concat(288*r)}),Object(R.jsxs)("div",{style:E.viewControls,children:[l?Object(R.jsx)("div",{onClick:function(){B+=Date.now()-F,u(!1)},style:E.controlButton,children:"Play"}):Object(R.jsx)("div",{onClick:function(){null!==_&&cancelAnimationFrame(_),F=Date.now(),u(!0)},style:E.controlButton,children:"Pause"}),Object(R.jsx)("div",{onClick:function(){B=Date.now(),l&&y(!1)},style:E.controlButton,children:"Restart"}),Object(R.jsx)("div",{onClick:m,style:E.controlButton,children:"Full Screen"})]})]})}var L,I=a(13),N=a(2),P="https://fragflow.herokuapp.com",U="darkcyan",M="blueviolet",q="midnightblue",Y="white",z="dimgray",V="darkorange",W="orangered",G="mediumblue",H="white",J="green",X={_outColor:"outputColor","gl_FragCoord.x":"pixelX","gl_FragCoord.y":"pixelY","_window.x":"windowWidth","_window.y":"windowHeight",_time:"time"},Z={abs:"absolute value",sign:"sign",floor:"floor",ceil:"ceiling",fract:"fractional part",min:["minimum",2],max:["maximum",2],sin:"sine",cos:"cosine",tan:"tangent",asin:"arcsine",acos:"arccosine",atan:["arctangent",2],log:"natural logarithm"},K=new Set(["attributeq","uniform","varying","layout","centroid","flat","smooth","noperspective","patch","sample","subroutine","in","out","inout","invariant","discard","mat2","mat3","mat4","dmat2","dmat3","dmat4","mat2x2","mat2x3","mat2x4","dmat2x2","dmat2x3","dmat2x4","mat3x2","mat3x3","mat3x4","dmat3x2","dmat3x3","dmat3x4","mat4x2","mat4x3","mat4x4","dmat4x2","dmat4x3","dmat4x4","vec2","vec3","vec4","ivec2","ivec3","ivec4","bvec2","bvec3","bvec4","dvec2","dvec3","dvec4","uvec2","uvec3","uvec4","lowp","mediump","highp","precision","sampler1D","sampler2D","sampler3D","samplerCube","sampler1DShadow","sampler2DShadow","samplerCubeShadow","sampler1DArray","sampler2DArray","sampler1DArrayShadow","sampler2DArrayShadow","isampler1D","isampler2D","isampler3D","isamplerCube","isampler1DArray","isampler2DArray","usampler1D","usampler2D","usampler3D","usamplerCube","usampler1DArray","usampler2DArray","sampler2DRect","sampler2DRectShadow","isampler2DRect","usampler2DRect","samplerBuffer","isamplerBuffer","usamplerBuffer","sampler2DMS","isampler2DMS","usampler2DMS","sampler2DMSArray","isampler2DMSArray","usampler2DMSArray","samplerCubeArray","samplerCubeArrayShadow","isamplerCubeArray","usamplerCubeArray","common","partition","active","asm","class","union","enum","typedef","template","this","packed","goto","inline","noinline","volatile","public","static","extern","external","interface","long","short","half","fixed","unsigned","superp","input","output","hvec2","hvec3","hvec4","fvec2","fvec3","fvec4","sampler3DRect","filter","image1D","image2D","image3D","imageCube","iimage1D","iimage2D","iimage3D","iimageCube","uimage1D","uimage2D","uimage3D","uimageCube","image1DArray","image2DArray","iimage1DArray","iimage2DArray","uimage1DArray","uimage2DArray","image1DShadow","image2DShadow","image1DArrayShadow","image2DArrayShadow","imageBuffer","iimageBuffer","uimageBuffer","sizeof","cast","namespace","using","row_major"]),$={blockArea:{width:"100%",display:"block"},canvas:{width:"100%",height:"100%"}},Q=null,ee=null,te=0,ae=0,ne=0,re=0,ie="action",oe=null,ce=0,se=0,le=-1!==navigator.userAgent.indexOf("Chrome"),ue=0,de=0,fe=null,he=null,be=0,ve=0,me=null;function je(e){ie=e,re=0,Be()}function ge(){var e=prompt("Variables must\n-Start with a letter\n-Only contain numbers and letters\n-Be unique\n-Not be a reserved GLSL keyword");xe(e)&&(oe.variables.push(e),Be(),me())}function pe(){var e=prompt("Variable name to delete"),t=oe.variables.indexOf(e);if(-1!==t){oe.variables.splice(t,1);var a,n=Object(h.a)(oe.functions);try{for(n.s();!(a=n.n()).done;){var r,i=a.value,o=Object(h.a)(i.actions);try{for(o.s();!(r=o.n()).done;){ye(r.value,e)}}catch(b){o.e(b)}finally{o.f()}}}catch(b){n.e(b)}finally{n.f()}var c,s=0,l=Object(h.a)(oe.freeBlocks);try{for(l.s();!(c=l.n()).done;){var u=c.value;if(Array.isArray(u)){var d,f=Object(h.a)(u);try{for(f.s();!(d=f.n()).done;){ye(d.value,e)}}catch(b){f.e(b)}finally{f.f()}}else u.name===e&&oe.freeBlocks.splice(s,1);s++}}catch(b){l.e(b)}finally{l.f()}Be(),me()}}function ye(e,t){e.variable===t&&(e.variable="_"),e.name===t&&(e.name="_");for(var a=0;a<e.args.length;a++)e.args[a]===t&&(e.args[a]=1)}function Oe(){var e=prompt("Functions must\n-Start with a letter\n-Only contain numbers and letters\n-Be unique\n-Not be a reserved GLSL keyword");xe(e)&&(oe.functions.push({name:e,x:-te/Math.pow(2,ne),y:-ae/Math.pow(2,ne),actions:[]}),Be(),me())}function xe(e){if(null!==(n=e)&&null!==n.match("^[a-zA-Z][a-zA-Z0-9]*$")&&!oe.variables.includes(e)&&!K.has(e)){var t,a=Object(h.a)(oe.functions);try{for(a.s();!(t=a.n()).done;){if(t.value.name===e)return!1}}catch(r){a.e(r)}finally{a.f()}return!0}var n;return!1}function we(e){return e in X?X[e]:e}function ke(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de;return"rgb(".concat(Math.floor(ue/256),", ").concat(ue%256,", ").concat(e,")")}function Se(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];isNaN(e)?e in X?Ce(we(e),W,t):Ce(e,V,t):Ce(e,z,t)}function Ce(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Q.save(),ee.save();var n=Q.measureText(e).width;Q.fillStyle=t,Q.fillRect(0,14,n+20,-50),ue!==fe&&(a?(ee.fillStyle=ke(),ee.fillRect(0,14,n+20,-50),de++):(ee.fillStyle=ke(0),ee.fillRect(0,14,n+20,-50))),Q.strokeStyle=H,Q.strokeRect(0,14,n+20,-50),Q.fillStyle=Y,Q.fillText(e,10,0),Q.restore(),ee.restore(),Q.translate(n+20,0),ee.translate(n+20,0)}function Ae(e,t,a,n){Ce(e,q),Se(t),Ce(a,q);var r,i=Object(h.a)(n);try{for(i.s();!(r=i.n()).done;){Se(r.value)}}catch(o){i.e(o)}finally{i.f()}}function De(e){switch(de++,Q.save(),ee.save(),e.type){case"assign":Ae("set",e.variable,"to",e.args);break;case"add":Ae("add to",e.variable,"by",e.args);break;case"subtract":Ae("subtract from",e.variable,"by",e.args);break;case"multiply":Ae("multiply",e.variable,"by",e.args);break;case"divide":Ae("divide",e.variable,"by",e.args);break;case"power":Ae("raise",e.variable,"to the power of",e.args);break;case"function":Ce("run",q),Ce(e.name,U,!0),Se(e.args[0]),Ce(1===e.args[0]?"time":"times",q);break;case"output":Ce("output color",G),Ce("R:","#A00000"),Se(e.args[0]),Ce("G:","#00A000"),Se(e.args[1]),Ce("B:","#0000A0"),Se(e.args[2]);break;case"math":Ce("set",J),Se(e.variable);var t=Z[e.name];if("string"===typeof t)Ce("to the ".concat(t," of"),J),Se(e.args[0]);else{Ce("to the ".concat(t[0]," of"),J);for(var a=0;a<t[1];a++)Se(e.args[a]),a!==t[a]-1&&Ce("and",J)}break;default:alert("Error: unrecognized action type "+e.type)}Q.restore(),ee.restore(),Q.translate(0,50),ee.translate(0,50),ue++,de=0}function Re(e){Q.save(),ee.save(),Q.translate(e.x,e.y),ee.translate(e.x,e.y);var t=Q.measureText(e.name);Q.fillStyle="main"===e.name?M:U;var a=t.width+20;ee.fillStyle=ke(),Q.beginPath(),ee.beginPath(),Q.moveTo(0,-40),ee.moveTo(0,-40),Q.quadraticCurveTo(a/2,-50-a/10,a,-40),ee.quadraticCurveTo(a/2,-50-a/10,a,-40),Q.lineTo(a,10),ee.lineTo(a,10),Q.lineTo(0,10),ee.lineTo(0,10),Q.closePath(),ee.closePath(),Q.fill(),ue!==fe&&ee.fill(),Q.strokeStyle=H,Q.stroke(),Q.fillStyle=Y,Q.fillText(e.name,10,-4),Q.save(),ee.save(),Q.translate(0,46),ee.translate(0,46),ue++,de=0;var n,r=Object(h.a)(e.actions);try{for(r.s();!(n=r.n()).done;){De(n.value)}}catch(i){r.e(i)}finally{r.f()}Q.restore(),Q.restore(),ee.restore(),ee.restore()}function Ee(e){if(Q.save(),ee.save(),Array.isArray(e)){Q.translate(e[0].x,e[0].y),ee.translate(e[0].x,e[0].y);var t,a=Object(h.a)(e);try{for(a.s();!(t=a.n()).done;){De(t.value)}}catch(n){a.e(n)}finally{a.f()}}else Q.translate(e.x,e.y),ee.translate(e.x,e.y),"variable"===e.type?Se(e.name,!1):Ce(e.name,U),ue++;Q.restore(),ee.restore()}function _e(){Q.fillStyle="#303030";var e=512*window.devicePixelRatio,t=Q.canvas.height-333*window.devicePixelRatio;Q.fillRect(Q.canvas.width,Q.canvas.height,-e,-t),Q.globalAlpha=1;var a=Q.canvas.height-t;if(Q.translate(Q.canvas.width-e,Q.canvas.height-t),Q.translate(20,65),a+=65,Q.translate(0,re),a+=re,he=null,"variable"===ie){var n,r=Object(h.a)(["gl_FragCoord.x","gl_FragCoord.y","_time","_window.x","_window.y"].concat(oe.variables));try{for(r.s();!(n=r.n()).done;){var i=n.value;Q.save(),Se(i),Q.restore();var o=a-se;if(o<35&&o>-17){var c=Ie(ce,se);c.x-=Q.measureText(we(i)).width/2,c.y+=10,he=Object(N.a)(Object(N.a)({},c),{},{type:"variable",name:i})}Q.translate(0,60),a+=60}}catch(w){r.e(w)}finally{r.f()}}else if("math"===ie)for(var s in Z){Q.save();var l={variable:"_",name:s,type:"math",args:Array.isArray(Z[s])?[1,1]:[1]};De(l),Q.restore();var u=a-se;if(u<35&&u>-17){var d=Ie(ce,se);d.x-=50,d.y+=15,l.x=d.x,l.y=d.y,he=[l]}Q.translate(0,60),a+=60}else if("action"===ie)for(var f=0,b=[{type:"output",args:[0,0,0]},{type:"assign",variable:"_",args:[0]},{type:"add",variable:"_",args:[0]},{type:"subtract",variable:"_",args:[0]},{type:"multiply",variable:"_",args:[1]},{type:"divide",variable:"_",args:[1]},{type:"power",variable:"_",args:[1]},{type:"function",name:"_",args:[1]}];f<b.length;f++){var v=b[f];Q.save(),De(v),Q.restore();var m=a-se;if(m<35&&m>-17){var j=Ie(ce,se);j.x-=50,j.y+=15,v.x=j.x,v.y=j.y,he=[v]}Q.translate(0,60),a+=60}else{var g,p=Object(h.a)(oe.functions);try{for(p.s();!(g=p.n()).done;){var y=g.value;if("main"!==(y=y.name)){Q.save(),Ce(y,U),Q.restore();var O=a-se;if(O<35&&O>-17){var x=Ie(ce,se);x.x-=Q.measureText(we(y)).width/2,x.y+=10,he=Object(N.a)(Object(N.a)({},x),{},{type:"function",name:y})}Q.translate(0,60),a+=60}}}catch(w){p.e(w)}finally{p.f()}}}function Be(){ue=0,de=0,Q.resetTransform(),ee.resetTransform(),Q.globalAlpha=1,ee.globalAlpha=1,Q.clearRect(0,0,Q.canvas.width,Q.canvas.height),ee.clearRect(0,0,Q.canvas.width,Q.canvas.height),Q.translate(te,ae),ee.translate(te,ae);var e=Math.pow(2,ne);Q.translate(Q.canvas.width/2,Q.canvas.height/2),ee.translate(Q.canvas.width/2,Q.canvas.height/2),Q.scale(e,e),ee.scale(e,e),Q.font="36px consolas";var t,a=Object(h.a)(oe.functions);try{for(a.s();!(t=a.n()).done;){Re(t.value)}}catch(i){a.e(i)}finally{a.f()}Q.globalAlpha=.7;var n,r=Object(h.a)(oe.freeBlocks);try{for(r.s();!(n=r.n()).done;){Ee(n.value)}}catch(i){r.e(i)}finally{r.f()}Q.resetTransform(),ee.globalAlpha=0,_e()}function Fe(e){var t=Q.canvas.getBoundingClientRect();ce=(e.x-t.left)*window.devicePixelRatio,se=(e.y-t.top)*window.devicePixelRatio}function Te(e,t){var a=ee.getImageData(e-2,t-2,5,5);if(!a||!a.data)return null;for(var n={},r=0;r<a.data.length;r+=4)if(255===a.data[r+3]){var i=256*a.data[r]+a.data[r+1]+65536*a.data[r+2];n[i]=n[i]?n[i]+1:1}var o=-1,c=0,s=0;for(var l in n)n[l]>s&&(s=n[l],o=l%65536,c=Math.floor(l/65536));return o>-1?{primary:o,argument:c}:null}function Le(e,t,a){return 0===t?e:"output"===e.type?(e.args[t-1]=null!==a?a:e.args[t-1],e.args[t-1]):"function"===e.type?1===t?(e.name=null!==a?a:e.name,e.name):(e.args[t-2]=null!==a?a:e.args[t-2],e.args[t-2]):(e.type,1===t?(e.variable=null!==a?a:e.variable,e.variable):(e.args[t-2]=null!==a?a:e.args[t-2],e.args[t-2]))}function Ie(e,t){return{x:(e-Q.canvas.width/2-te)/Math.pow(2,ne),y:(t-Q.canvas.height/2-ae)/Math.pow(2,ne)}}function Ne(e){var t=e.primary,a=e.argument,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=0;be=0;var i,o=Object(h.a)(oe.functions);try{for(o.s();!(i=o.n()).done;){var c=i.value;if(t===r)return ve=-1,c;if(t>r&&t<=r+c.actions.length){var s=c.actions[t-1-r];ve=t-1-r;var l=Le(s,a,n);if(void 0!==l)return l}r+=c.actions.length+1,be++}}catch(m){o.e(m)}finally{o.f()}be=-1;var u,d=Object(h.a)(oe.freeBlocks);try{for(d.s();!(u=d.n()).done;){var f=u.value;if(be--,t===r&&!Array.isArray(f))return ve=-1,f;if(Array.isArray(f)&&t>=r&&t<r+f.length){var b=f[t-r];ve=t-r;var v=Le(b,a,n);if(void 0!==v)return v}r+=Array.isArray(f)?f.length:1}}catch(m){d.e(m)}finally{d.f()}}function Pe(e){var t,a=0,n=Object(h.a)(oe.freeBlocks);try{for(n.s();!(t=n.n()).done;){var r=t.value;if((Array.isArray(r)?r[0]:r)===e)return void oe.freeBlocks.splice(a,1);a++}}catch(i){n.e(i)}finally{n.f()}}function Ue(e){var t=Object(n.useRef)(null),a=Object(n.useState)(0),r=Object(o.a)(a,2),i=r[0],c=r[1],s=Object(n.useState)(0),l=Object(o.a)(s,2),u=l[0],d=l[1];return oe=e.blocks,Object(n.useLayoutEffect)((function(){(Q=document.getElementById("blockCanvas").getContext("2d")).canvas.width=i*window.devicePixelRatio,Q.canvas.height=u*window.devicePixelRatio,(ee=document.createElement("canvas")).width=Q.canvas.width,ee.height=Q.canvas.height,ee=ee.getContext("2d"),requestAnimationFrame((function(){return Be()})),window.download=function(){var e=document.createElement("a");e.download="filename.png",e.href=ee.canvas.toDataURL(),e.click()}}),[i,u]),Object(n.useLayoutEffect)((function(){var a=function(){c(t.current.clientWidth),d(t.current.clientHeight)},n=function(e){if(Fe(e),(Q.canvas.width-ce)/window.devicePixelRatio<512){var t=re+e.wheelDeltaY/1;t<=0&&(re=t,Be())}else{var a=ne+e.wheelDeltaY/500;if(a<=3&&a>=-3){var n=Math.pow(2,a)-Math.pow(2,ne),r=-te,i=-ae;r+=ce-Q.canvas.width/2,i+=se-Q.canvas.height/2,te-=r*n/Math.pow(2,ne),ae-=i*n/Math.pow(2,ne),ne=a,Be()}}};me=function(){" "!==e.isSaved&&e.setIsSaved(!1)};var r=function(t){if(Fe(t),_e(),(Q.canvas.width-ce)/window.devicePixelRatio<512)null!==he&&(oe.freeBlocks.push(he),Be(),fe=Te(ce,se).primary);else{var a=Te(ce,se);if(null!=a){var n=Ne(a);if("object"===typeof n||isNaN(n)){if(0===a.argument)if(void 0!==n.x)fe=a.primary;else{var r=Ie(ce,se);r.x-=50,r.y+=15,n.x=r.x,n.y=r.y,be>=0?oe.freeBlocks.push(oe.functions[be].actions.splice(ve)):oe.freeBlocks.push(oe.freeBlocks[-be-2].splice(ve)),Be(),fe=Te(ce,se).primary,Be(),e.setChangeCount(e.changeCount+1)}else if("_"!==n){var i="variable",o=Ne({primary:a.primary,argument:0});"function"===o.type&&1===a.argument&&(i="function");var c=Ie(ce,se);c.x-=Q.measureText(we(n)).width/2,c.y+=10,oe.freeBlocks.push(Object(N.a)({type:i,name:n},c)),Be(),fe=Te(ce,se).primary,("output"===o.type||a.argument>1)&&Ne(a,1),Be(),e.setChangeCount(e.changeCount+1)}}else{var s=prompt("Edit Field",n);isNaN(s)||isNaN(parseFloat(s))||(Ne(a,s),Be(),e.setChangeCount(e.changeCount+1))}}else L=!0;null!==fe&&me()}},i=function(e){if(Fe(e),L)le?(te+=e.movementX,ae+=e.movementY):(te+=e.movementX*window.devicePixelRatio,ae+=e.movementY*window.devicePixelRatio),Be();else if(null!==fe){me();var t=Ne({primary:fe,argument:0});le?(t.x+=e.movementX/Math.pow(2,ne),t.y+=e.movementY/Math.pow(2,ne)):(t.x+=e.movementX*window.devicePixelRatio/Math.pow(2,ne),t.y+=e.movementY*window.devicePixelRatio/Math.pow(2,ne)),Be()}},o=function(t){if(Fe(t),L=!1,null!==fe){me();var a=Ne({primary:fe,argument:0});if(a.args){ce<0&&Pe(a);var n=se-50*Math.pow(2,ne),r=Te(ce,n);if(null!==r)if(null!==Ne(r)){var i,o,c=null,s=0,l=Object(h.a)(oe.freeBlocks);try{for(l.s();!(i=l.n()).done;){var u=i.value;if(Array.isArray(u)&&u[0]===a){c=u;break}s++}}catch(v){l.e(v)}finally{l.f()}if(be>=0)(o=oe.functions[be].actions).push.apply(o,Object(I.a)(c)),oe.freeBlocks.splice(s,1),e.setChangeCount(e.changeCount+1),delete a.x,delete a.y;else if(Array.isArray(oe.freeBlocks[-be-2])){var d;(d=oe.freeBlocks[-be-2]).push.apply(d,Object(I.a)(c)),oe.freeBlocks.splice(s,1),e.setChangeCount(e.changeCount+1),delete a.x,delete a.y}}}else if(a.actions)ce<0&&(!function(e){if("main"!==e.name){for(var t=-1,a=0;a<oe.functions.length;a++)if(oe.functions[a].name===e.name){t=a;break}if(-1!==t){oe.functions.splice(t,1);var n,r=Object(h.a)(oe.functions);try{for(r.s();!(n=r.n()).done;){var i,o=n.value,c=Object(h.a)(o.actions);try{for(c.s();!(i=c.n()).done;)ye(i.value,e.name)}catch(v){c.e(v)}finally{c.f()}}}catch(v){r.e(v)}finally{r.f()}var s,l=0,u=Object(h.a)(oe.freeBlocks);try{for(u.s();!(s=u.n()).done;){var d=s.value;if(Array.isArray(d)){var f,b=Object(h.a)(d);try{for(b.s();!(f=b.n()).done;)ye(f.value,e.name)}catch(v){b.e(v)}finally{b.f()}}else d.name===e.name&&oe.freeBlocks.splice(l,1);l++}}catch(v){u.e(v)}finally{u.f()}l++}}}(a),e.setChangeCount(e.changeCount+1));else{var f=Te(ce,se);if(null!==f){var b=Ne({primary:f.primary,argument:0});f.argument>0&&("function"===a.type&&"function"===b.type&&1===f.argument?(b.name=a.name,Pe(a),e.setChangeCount(e.changeCount+1)):("variable"===a.type&&(!(a.name in X)&&"function"!==b.type||f.argument>1)||"variable"===a.type&&"output"===b.type)&&(Ne(f,a.name),Pe(a),e.setChangeCount(e.changeCount+1)))}ce<0&&Pe(a)}}fe=null,Be()};return window.addEventListener("resize",a),Q.canvas.addEventListener("wheel",n),document.addEventListener("mousemove",i),Q.canvas.addEventListener("mousedown",r),document.addEventListener("mouseup",o),a(),function(){window.removeEventListener("resize",a),Q.canvas.removeEventListener("wheel",n),document.removeEventListener("mousemove",i),Q.canvas.removeEventListener("mousedown",r),document.removeEventListener("mouseup",o)}}),[e]),Object(n.useLayoutEffect)((function(){oe=e.blocks,te=0,ae=0,ne=0,Be()}),[e.blocks]),Object(R.jsx)("div",{ref:t,style:$.blockArea,children:Object(R.jsx)("canvas",{id:"blockCanvas",style:$.canvas})})}var Me={blockSelector:{backgroundColor:"#151515",width:"200px",display:"flex",flexDirection:"column",justifyContent:"end"},category:{height:"100px",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center",fontFamily:"consolas",userSelect:"none",border:"1px solid white"},button:{height:"50px",border:"1px solid white",display:"flex",flexDirection:"column",justifyContent:"center",userSelect:"none"},buttons:{marginBottom:"auto",justifyContent:"space-between",border:"none",height:"200px"}};function qe(){return Object(R.jsxs)("div",{style:Me.blockSelector,children:[Object(R.jsxs)("div",{style:Object(N.a)(Object(N.a)({},Me.category),Me.buttons),children:[Object(R.jsx)("div",{style:Object(N.a)(Object(N.a)({},Me.button),{},{backgroundColor:V}),onClick:ge,children:"New Variable"}),Object(R.jsx)("div",{style:Object(N.a)(Object(N.a)({},Me.button),{},{backgroundColor:U}),onClick:Oe,children:"New Function"}),Object(R.jsx)("div",{style:Object(N.a)(Object(N.a)({},Me.button),{},{backgroundColor:V}),onClick:pe,children:"Delete Variable"})]}),Object(R.jsx)("div",{onClick:function(){return je("function")},style:Object(N.a)(Object(N.a)({},Me.category),{},{backgroundColor:U}),children:"Functions"}),Object(R.jsx)("div",{onClick:function(){return je("action")},style:Object(N.a)(Object(N.a)({},Me.category),{},{backgroundColor:q}),children:"Actions"}),Object(R.jsx)("div",{onClick:function(){return je("variable")},style:Object(N.a)(Object(N.a)({},Me.category),{},{backgroundColor:V}),children:"Variables"}),Object(R.jsx)("div",{onClick:function(){return je("math")},style:Object(N.a)(Object(N.a)({},Me.category),{},{backgroundColor:J}),children:"Math"})]})}var Ye,ze=a(62),Ve={editor:{position:"relative",height:"100%",display:"flex",fontFamily:"consolas",overflow:"hidden"},previewWrapper:{position:"absolute",right:"0px",top:"0px"}},We="new";function Ge(e){var t=Object(l.g)(),a=Object(n.useState)(ze),r=Object(o.a)(a,2),i=r[0],c=r[1],u=Object(n.useState)(0),d=Object(o.a)(u,2),f=d[0],h=d[1],b=Object(n.useState)(null),v=Object(o.a)(b,2),m=v[0],j=v[1],g=Object(n.useRef)(!0);return Ye=function(){window.confirm("Delete ".concat(e.projName,"? This action can not be undone."))&&s.a.delete("".concat(P,"/api/project?id=").concat(We,"&token=").concat(e.token)).then((function(e){j("")})).catch((function(e){alert("There was an error deleting the project."),console.error(e)}))},Object(n.useEffect)((function(){if(g.current){g.current=!1;var a=t.pathname.split("/");"new"!==(We=a[a.length-1])?(s.a.get("".concat(P,"/api/project?id=").concat(We)).then((function(t){e.setProjName(t.data.name),c(JSON.parse(t.data.blocks)),document.title="Fragflow | ".concat(t.data.name),e.token&&e.user.id===t.data.author_id?e.setIsSaved("Saved"):e.setIsSaved(" ")})).catch((function(e){j("editor/new"),g.current=!0})),document.title="Fragflow | Loading..."):(c(ze),e.setProjName("Untitled Project"),e.token?e.setIsSaved(!1):e.setIsSaved(" "),document.title="Fragflow | Untitled Project")}})),Object(n.useEffect)((function(){var t=function(t){if("s"===String.fromCharCode(t.keyCode).toLowerCase()&&(t.preventDefault(),"Saved"!==e.isSaved&&t.ctrlKey&&!1===e.isSaved))if("new"===We){var a=prompt("Project Name");if(null!==a&&a.length>0){for(;null===a||a.length>32;)a=prompt("Project Name (less than 33 characters)");e.setIsSaved("Saving..."),function(t){var a=JSON.stringify(i);s.a.post("".concat(P,"/api/project"),{token:e.token,blocks:a,name:t}).then((function(e){j("editor/".concat(e.data.id)),g.current=!0})).catch((function(e){alert("There was an error saving your project."),console.log(e)}))}(a)}}else e.setIsSaved("Saving..."),s.a.patch("".concat(P,"/api/project"),{token:e.token,project_id:We,blocks:JSON.stringify(i)}).then((function(t){e.setIsSaved("Saved")})).catch((function(t){alert("There was an error saving your project."),e.setIsSaved(null),console.log(t)}))};return window.addEventListener("keydown",t),function(){window.removeEventListener("keydown",t)}})),Object(R.jsxs)("div",{style:Ve.editor,children:[null!==m?Object(R.jsx)(l.a,{to:{pathname:"/".concat(m)}}):"",Object(R.jsx)(qe,{}),Object(R.jsx)(Ue,{blocks:i,changeCount:f,setChangeCount:h,isSaved:e.isSaved,setIsSaved:e.setIsSaved}),Object(R.jsx)("div",{style:Ve.previewWrapper,children:Object(R.jsx)(T,{blocks:i,changeCount:f})})]})}var He=a(22),Je=a(21),Xe=He.a().shape({username:He.c().required("Required"),password:He.c().required("Required")}),Ze={username:"",password:""},Ke={error:{color:"#F76356",position:"absolute"},spaced:{marginTop:"40px"},field:{width:"100%",padding:"12px 20px",margin:"8px 0",display:"inline-block",border:"1px solid dimgray",boxSizing:"border-box",backgroundColor:"#131313",color:"white"},button:{width:"50%",backgroundColor:"#4d54d6",color:"white",padding:"14px 20px",border:"none",cursor:"pointer",fontSize:"100%"}};function $e(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(""),u=Object(o.a)(c,2),d=u[0],f=u[1];Object(n.useEffect)((function(){document.title="Fragflow | Login"}));return Object(R.jsxs)("div",{style:{margin:"auto",marginTop:"100px",width:"50vw"},children:[r?Object(R.jsx)(l.a,{to:{pathname:"/"}}):null,Object(R.jsx)("h1",{style:{textAlign:"center"},children:"Login"}),Object(R.jsx)(Je.c,{initialValues:Ze,validationSchema:Xe,onSubmit:function(t){return a=t.username,n=t.password,f(""),void s.a.post("".concat(P,"/api/login"),{username:a,password:n}).then((function(t){e.setToken(t.data.token),localStorage.setItem("token",t.data.token),i(!0)})).catch((function(e){switch(e.response.status){case 400:f("Username and password are required");break;case 401:f("Incorrect password");break;case 404:f("User does not exist");break;default:f("Unknown error")}}));var a,n},children:function(e){var t=e.errors,a=e.touched;return Object(R.jsxs)(Je.b,{children:[Object(R.jsx)("label",{style:Ke.spaced,htmlFor:"username",children:"Username "}),Object(R.jsx)(Je.a,{style:Ke.field,name:"username"}),t.username&&a.username?Object(R.jsx)("div",{style:Ke.error,children:t.username}):null,Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("label",{style:Ke.spaced,htmlFor:"password",children:"Password "}),Object(R.jsx)(Je.a,{style:Ke.field,type:"password",name:"password"}),t.password&&a.password?Object(R.jsx)("div",{style:Ke.error,children:t.password}):null,Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(R.jsx)("button",{style:Object(N.a)({},Ke.button),type:"submit",children:"Log In"})})]})}}),Object(R.jsx)("h5",{style:Object(N.a)(Object(N.a)({},Ke.error),Ke.spaced),children:d})]})}var Qe=He.a().shape({username:He.c().required("Required"),password:He.c().required("Required"),confirm:He.c().required("Required").oneOf([He.b("password")],"Must match password")}),et={username:"",password:"",confirm:""};function tt(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(""),u=Object(o.a)(c,2),d=u[0],f=u[1];Object(n.useEffect)((function(){document.title="Fragflow | Register"}));return Object(R.jsxs)("div",{style:{margin:"auto",marginTop:"100px",width:"50vw"},children:[r?Object(R.jsx)(l.a,{to:{pathname:"/"}}):null,Object(R.jsx)("h1",{style:{textAlign:"center"},children:"Registration"}),Object(R.jsx)(Je.c,{initialValues:et,validationSchema:Qe,onSubmit:function(t){return a=t.username,n=t.password,f(""),void s.a.post("".concat(P,"/api/register"),{username:a,password:n}).then((function(t){e.setToken(t.data.token),localStorage.setItem("token",t.data.token),i(!0)})).catch((function(e){switch(e.response.status){case 400:f("Username and password are required");break;case 409:f("That username is taken");break;default:f("Unknown error")}}));var a,n},children:function(e){var t=e.errors,a=e.touched;return Object(R.jsxs)(Je.b,{children:[Object(R.jsx)("label",{style:Ke.spaced,htmlFor:"username",children:"Username "}),Object(R.jsx)(Je.a,{style:Ke.field,name:"username"}),t.username&&a.username?Object(R.jsx)("div",{style:Ke.error,children:t.username}):null,Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("label",{style:Ke.spaced,htmlFor:"password",children:"Password "}),Object(R.jsx)(Je.a,{style:Ke.field,type:"password",name:"password"}),t.password&&a.password?Object(R.jsx)("div",{style:Ke.error,children:t.password}):null,Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("label",{style:Ke.spaced,htmlFor:"confirm",children:"Confirm Password "}),Object(R.jsx)(Je.a,{style:Ke.field,type:"password",name:"confirm"}),t.confirm&&a.confirm?Object(R.jsx)("div",{style:Ke.error,children:t.confirm}):null,Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("br",{}),Object(R.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(R.jsx)("button",{style:Object(N.a)(Object(N.a)({},Ke.button),{},{fontSize:"100%"}),type:"submit",children:"Register"})})]})}}),Object(R.jsx)("h5",{style:Object(N.a)(Object(N.a)({},Ke.error),Ke.spaced),children:d})]})}function at(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(null),u=Object(o.a)(c,2),d=u[0],f=u[1];return Object(n.useEffect)((function(){document.title="Fragflow | Home",0===r.length&&s.a.get("".concat(P,"/api/projects")).then((function(e){i(e.data.projects)})).catch((function(e){console.error(e)}))}),[r]),Object(R.jsxs)("div",{style:{marginLeft:"auto",marginRight:"auto",marginTop:"100px"},children:[d?Object(R.jsx)(l.a,{to:{pathname:"editor/".concat(d)}}):"",Object(R.jsxs)("table",{children:[Object(R.jsx)("thead",{children:Object(R.jsxs)("tr",{children:[Object(R.jsx)("th",{children:"Author"}),Object(R.jsx)("th",{style:{width:"50%"},children:"Name"}),Object(R.jsx)("th",{children:"Date Created"})]})}),Object(R.jsx)("tbody",{children:r.map((function(t){var a=new Date(t.created).toLocaleDateString(),n="white";return e.token&&e.user.name===t.user_name&&(n="#4F4"),Object(R.jsxs)("tr",{onClick:function(){return f(t.id)},className:"projectData",children:[Object(R.jsx)("td",{style:{color:n},children:t.user_name}),Object(R.jsx)("td",{children:t.name}),Object(R.jsx)("td",{children:a})]},t.id)}))})]})]})}var nt=a(20),rt={topBar:{backgroundColor:"#212426",width:"100%",height:"70px",display:"flex"},barItem:{display:"flex",flexDirection:"column",justifyContent:"center",height:"auto",marginLeft:"20px",textDecoration:"none",color:"white"},title:{marginRight:"85px",fontWeight:"bold",fontSize:"125%"},delete:{position:"absolute",top:"21px",right:"50%",color:"#FCC"}};function it(e){var t=Object(l.g)(),a=Object(n.useState)(!1),r=Object(o.a)(a,2),i=r[0],c=r[1],s=t.pathname.split("/");return Object(R.jsxs)("div",{style:rt.topBar,children:[i?Object(R.jsx)(l.a,{to:{pathname:"/"}}):"",Object(R.jsx)(nt.b,{to:"/",style:Object(N.a)(Object(N.a)({},rt.barItem),rt.title),children:"Fragflow"}),null!==e.isSaved?Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)("div",{style:rt.barItem,children:e.projName}),e.isSaved?Object(R.jsx)("div",{style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"dimgray"}),children:e.isSaved}):Object(R.jsx)("div",{style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"yellow"}),children:"Ctrl+S to Save"})," "===e.isSaved||s.includes("new")?"":Object(R.jsx)("div",{onClick:Ye,style:Object(N.a)(Object(N.a)(Object(N.a)({},rt.barItem),rt.delete),{},{userSelect:"none"}),children:"Delete Project"})]}):"",s.includes("editor")?"":Object(R.jsx)(nt.b,{to:"/editor/new",style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"lightgray"}),children:"New Project"}),e.token?Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)("div",{style:{margin:"auto"}}),Object(R.jsx)("div",{style:Object(N.a)({},rt.barItem),children:e.user.name}),Object(R.jsx)("div",{onClick:function(){e.setToken(null),localStorage.removeItem("token"),c(!0)},style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"gray",userSelect:"none"}),children:"Log Out"})]}):Object(R.jsxs)(R.Fragment,{children:[s.includes("new")?Object(R.jsx)("div",{style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"orange"}),children:"You must be logged in to save a project"}):"",Object(R.jsx)("div",{style:{margin:"auto"}}),Object(R.jsx)(nt.b,{to:"/login",style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"lightgray"}),children:"Log In"}),Object(R.jsx)(nt.b,{to:"/register",style:Object(N.a)(Object(N.a)({},rt.barItem),{},{color:"lightgray"}),children:"Register"})]}),Object(R.jsx)("div",{style:{margin:"20px"}})]})}a(231);var ot=function(){var e=Object(l.g)(),t=Object(n.useState)(null),a=Object(o.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(localStorage.getItem("token")),u=Object(o.a)(c,2),d=u[0],f=u[1],h=Object(n.useState)({name:"...",id:-1}),b=Object(o.a)(h,2),v=b[0],m=b[1],j=Object(n.useState)("..."),g=Object(o.a)(j,2),p=g[0],y=g[1],O=Object(n.useState)(!1),x=Object(o.a)(O,2),w=x[0],k=x[1];return Object(n.useEffect)((function(){e.pathname.split("/").includes("editor")||i(null)}),[e]),Object(n.useEffect)((function(){d?s.a.get("".concat(P,"/api/user?token=").concat(d)).then((function(e){m(e.data),k(!0)})).catch((function(e){f(null),k(!0)})):k(!0)}),[d]),w?Object(R.jsxs)("div",{style:{display:"flex",flexDirection:"column",height:"100vh"},children:[Object(R.jsx)(it,{isSaved:r,token:d,user:v,setToken:f,projName:p}),Object(R.jsxs)(l.d,{children:[Object(R.jsx)(l.b,{exact:!0,path:"/editor",children:Object(R.jsx)(l.a,{to:{pathname:"/editor/new"}})}),Object(R.jsx)(l.b,{path:"/editor",children:Object(R.jsx)(Ge,{isSaved:r,setIsSaved:i,setProjName:y,token:d,user:v,projName:p})}),Object(R.jsx)(l.b,{exact:!0,path:"/",children:Object(R.jsx)(at,{token:d,user:v})}),Object(R.jsx)(l.b,{exact:!0,path:"/login",children:Object(R.jsx)($e,{setToken:f})}),Object(R.jsx)(l.b,{exact:!0,path:"/register",children:Object(R.jsx)(tt,{setToken:f})})]})]}):Object(R.jsx)("div",{})};i.a.render(Object(R.jsx)(nt.a,{children:Object(R.jsx)(ot,{})}),document.getElementById("root"))},62:function(e){e.exports=JSON.parse('{"functions":[{"x":-700,"y":0,"name":"main","actions":[{"type":"output","args":[0.1,0.3,0.3]}]}],"variables":[],"freeBlocks":[]}')}},[[232,1,2]]]);
//# sourceMappingURL=main.d8518eb6.chunk.js.map