export const vs = `
  precision highp float;

  attribute vec3 aPosition;
  attribute vec2 aTexCoord;
  varying vec2 vTexCoord;

  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec3 pos = aPosition;
    float rnd = rand(aTexCoord)/8.0;
    pos.x += rnd;
    pos.y += rnd / 2.0;
    vec4 positionVec4 = vec4(pos, 1.0);

    vTexCoord = aTexCoord;

    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  }
`

export const fs = `
  precision highp float;
  varying vec2 vTexCoord;
  uniform vec2 u_resolution;

  float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float rnd = random(floor(st*1000.0));

    float r = min(210.0/255.0 - rnd / 5.0, 1.0);
    float g = min(220.0/255.0 - rnd / 10.0, 1.0);
    float b = min(255.0/255.0 - rnd / 20.0, 1.0);
    gl_FragColor = vec4(vec3(r, g, b), 1.0);
  }
`