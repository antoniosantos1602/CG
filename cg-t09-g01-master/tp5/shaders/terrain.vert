attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewMatrix;

uniform sampler2D u_heightmap;
uniform float u_heightScale;

varying vec2 v_uv;

void main() {
  v_uv = a_uv;

  vec4 modelViewPosition = u_modelViewMatrix * vec4(a_position, 1.0);
  float height = texture2D(u_heightmap, v_uv).r; 

  vec3 newPosition = a_position + vec3(0.0, 0.0, height * u_heightScale);

  gl_Position = u_projectionMatrix * modelViewPosition + vec4(newPosition - a_position, 0.0);
}