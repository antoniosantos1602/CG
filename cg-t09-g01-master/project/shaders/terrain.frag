#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D colorTexture;
uniform sampler2D heightMapTexture;
uniform sampler2D altimeterTexture;
uniform float altimeterHeight;

void main(){
    vec4 colorTex = texture2D(colorTexture, vTextureCoord);
    float height = texture2D(heightMapTexture, vTextureCoord).r;

    vec2 altimeterCoord = vec2(0.0, (1.0 - height/256.0) * altimeterHeight);
    vec4 colorTex2 = texture2D(altimeterTexture, altimeterCoord);

    vec4 colorComb = colorTex * 0.85 + colorTex2 * 0.15;
    gl_FragColor = colorComb;
}
