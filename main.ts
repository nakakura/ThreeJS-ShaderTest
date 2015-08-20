///<reference path="./typings/tsd.d.ts"/>

declare var SHADER_LOADER;

module Main{
    export class Main{
        private _canvasFrame: HTMLFrameElement;
        private _renderer: THREE.Renderer;
        private _scene: THREE.Scene;
        private _camera: THREE.Camera;
        private _axis: THREE.AxisHelper;
        private _directionalLight: THREE.DirectionalLight;
        private _cube: THREE.Mesh;
        private _cube2: THREE.Mesh;
        private _shader: THREE.ShaderMaterial;
        private _angle = 0;
        private _uniforms = {
            fSinTime0_X: {
                type: 'f',
                value: 0
            }
        };
        private _attributes = {
        };

        constructor(){

        }

        start(){
            console.log("star");
            this._initThree();
            this._initCamera();
            this._initShaderMaterial();
            this._initLight();
            this._initObject();
            this._animate();
        }

        private _initThree() {
            this._canvasFrame = <HTMLFrameElement>document.getElementById('canvas-frame');
            this._renderer = new THREE.WebGLRenderer({antialias: true});

            if (!this._renderer) alert("èâä˙âªé∏îs");

            this._renderer.setSize(this._canvasFrame.clientWidth, this._canvasFrame.clientHeight);
            this._canvasFrame.appendChild(this._renderer.domElement);
            (<any>this._renderer).setClearColor(0xEEEEEE, 1.0);
            this._scene = new THREE.Scene();
        }

        private _initCamera(){
            this._camera = new THREE.PerspectiveCamera(
                45,
                this._canvasFrame.clientWidth / this._canvasFrame.clientHeight,
                1,
                10000);
            this._camera.position.set(50, 50, 100);
            this._camera.up.set(0, 0, 1);
            this._camera.lookAt(<THREE.Vector3>{x: 0, y: 0, z: 0});
        }

        private _initLight(){
            this._directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
            this._directionalLight.position.set(50, 20, 100);
            this._scene.add(this._directionalLight);
        }

        private _initShaderMaterial() {
            SHADER_LOADER.load((data)=>{
                var vs = data.myShader.vertex;
                var fs = data.myShader.fragment;

                this._shader = new THREE.ShaderMaterial({
                    wireframe: true,
                    vertexShader: vs,
                    fragmentShader: fs,
                    uniforms: this._uniforms,
                    attributes: this._attributes
                });

                var geometry = new THREE.CubeGeometry(20, 20, 20);
                var material2 = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
                this._cube2 = new THREE.Mesh(geometry, this._shader);
                this._scene.add(this._cube2);
            });
        }

        private _initObject(){
            this._axis = new THREE.AxisHelper(50);
            this._scene.add(this._axis);
            this._axis.position.set(0, 0, 0);
            var geometry = new THREE.CubeGeometry(20, 20, 20);
            var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
            this._cube = new THREE.Mesh(geometry, material);
            this._scene.add(this._cube);
        }

        private _draw(){
            (<any>this._renderer).clear();
            this._renderer.render(this._scene, this._camera);
        }

        private _animate = ()=>{
            // note: three.js includes requestAnimationFrame shim
            this._uniforms.fSinTime0_X.value = this._angle * 2 * Math.PI / 360;

            this._angle += 0.1;
            if( this._angle > 360 ) {
                this._angle = this._angle - 360;
            }

            requestAnimationFrame( this._animate );
            this._draw();
        }
    }
}
