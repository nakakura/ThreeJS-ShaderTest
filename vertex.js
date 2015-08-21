varying vec2 vUv;

void main(void)
{
    vUv = uv;
    vec3 pos = position;
    pos.xy = 2.0 * sin(pos.xy) - 1.0;
    gl_Position = projectionMatrix * viewMatrix * vec4( pos, 1.0 );
}
