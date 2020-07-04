#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;


void main() {
  vec2 uv = vTexCoord;

  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  uv.x = 1.0 - uv.x;

  vec4 tex = texture2D(tex0, uv);

  float gray = (tex.r + tex.g + tex.b) / 3.0;

  float res = 60.0;
  float scl = res / (20.0);

//   float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
//   float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
//   float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
  float threshR = tex.r;
  float threshG = tex.g;
  float threshB = tex.b; 
  vec3 thresh = vec3(threshR, threshG, threshB);

  // render the output
  gl_FragColor = vec4(thresh, 1.0);
}