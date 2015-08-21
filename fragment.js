uniform sampler2D texture1;

varying vec2 vUv;

void main() {
    vec2 OpticalCenter = vec2(0.4939155, 0.5298627);
    vec2 FCoff = vec2(0.5459919,0.97142231);
    vec4 KCoff = vec4(-0.26265967,0.11121539,-0.00042497579,-0.00015385781);
    vec2 xy = (vUv - OpticalCenter) / FCoff;

    float r=sqrt(dot(xy,xy));
    float r2=r*r;
    float r4=r2*r2;
    float coeff=(KCoff.x*r2+KCoff.y*r4); //radial factor

    float dx=KCoff.z*2.0*xy.x*xy.y    + KCoff.w*(r2+2.0*xy.x*xy.x);
    float dy=KCoff.z*(r2+2.0*xy.y*xy.y) + KCoff.w*2.0*xy.x*xy.y;

    vec2 pos = (xy + xy*coeff + vec2(dx,dy)) * FCoff + OpticalCenter;

    gl_FragColor = texture2D(texture1, pos);
}

