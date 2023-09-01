attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;
attribute vec3 aVertexPosition;

varying vec2 vTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform sampler2D heightMapTexture;

void main(){
    vTextureCoord = aTextureCoord;
    vec4 heightFilter = texture2D(heightMapTexture, vTextureCoord);
    vec3 yOffset = aVertexNormal * heightFilter.r * 0.3;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + yOffset, 1.0);
}
