attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;
attribute vec3 aVertexPosition;

varying vec2 vTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uPMatrix;

uniform float timeFactor;
uniform float frequency;

uniform sampler2D uSampler2;

void main(void) {
    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0.0, 0.0, 0.0);
    offset.y = sin(frequency*timeFactor);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

