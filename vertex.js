uniform float fSinTime0_X;

void main(void)
{
    vec3 pos = position;
    pos.x = pos.x + 10.0 * cos( pos.x * fSinTime0_X );
    pos.y = pos.y + 10.0 * sin( pos.y * fSinTime0_X );
    gl_Position = projectionMatrix * viewMatrix * vec4( pos, 1.0 );
}