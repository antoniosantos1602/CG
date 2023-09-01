attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 coords;
uniform float timeFactor;
uniform float normScale;
uniform float time;

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);
	offset.x=aVertexNormal.x+normScale*0.2*sin(timeFactor);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
	coords = gl_Position;
}