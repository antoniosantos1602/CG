attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying float offset;
varying float offset2;
uniform vec4 filter;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 filter = texture2D(uSampler2, aTextureCoord+timeFactor*0.002);
	vec3 offset = aVertexNormal * 0.07 * filter.r;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

	vTextureCoord = aTextureCoord;
}


