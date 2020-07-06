#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
varying vec2 vTexCoord;

uniform sampler2D tex0;

uniform vec2 u_divs;
uniform float u_offset;
uniform float u_range;

vec3 rgb(float r, float g, float b){
    
    return vec3(r/255.0,g/255.0,b/255.0);
}

float timesin(float time, float freq, float amp){
    return sin(time*freq)*amp;
}

// void main() {
//     float r, g, b;
//     r = sin(u_time)
// 	gl_FragColor = vec4(rgb(32.0,169.0,172.0)*sin(u_time),1.0);
// }

vec2  pcoord(vec2 pixel){
    return pixel/u_res;
}

void main() {
    vec2 uv = vTexCoord;

    // if (u_range < -1.0) {
    // uv.y = 1.0 - uv.y; //flip y
    uv.x = 1.0 - uv.x; //flip x
    // }


	vec2 st = uv;
   // vec2 affect;

    float affect = floor((uv.x-0.5)*u_divs.x)/(u_divs.x-1.0);
    st.x = st.x;
    st.x = st.x+(affect*u_range);
    //st.x = mod(st.x,1.0)*1.0;
    st.x = mod(st.x,2.0)-1.0;
    st.x = abs(st.x);

    float affecty = floor((uv.y-0.5)*u_divs.y)/(u_divs.y-1.0);
    st.y = st.y;
    st.y = st.y+(affecty*u_range);
    st.y = mod(st.y,2.0)-1.0;
    st.y = abs(st.y);
    

	//gl_FragColor = vec4(st.x,st.y,0.0,1.0);

    //float pos = u_mouse.x/u_res.x;
    vec4 tex = texture2D(tex0, st);
    
    //debug shader
    //gl_FragColor = vec4(st.x,st.x,st.x,1.0);

    gl_FragColor = vec4(tex.r,tex.g,tex.b,1.0);



    
}



// sin(), cos(), tan(), asin(), acos(), atan(), pow(), exp(), log(), sqrt(), abs(), sign(), floor(), ceil(), fract(), mod(), min(), max() and clamp().