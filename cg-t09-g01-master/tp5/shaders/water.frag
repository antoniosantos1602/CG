#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;


void main() {
	vec4 color = texture2D(uSampler2, vTextureCoord) * vec4(0.1255, 0.5686, 0.8431, 1.0);
	
	gl_FragColor = color;
}
