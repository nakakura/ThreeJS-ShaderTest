///<reference path="./typings/tsd.d.ts"/>
var Main;
(function (_Main) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this._angle = 0;
            this._uniforms = {
                fSinTime0_X: {
                    type: 'f',
                    value: 0
                }
            };
            this._attributes = {};
            this._animate = function () {
                // note: three.js includes requestAnimationFrame shim
                _this._uniforms.fSinTime0_X.value = _this._angle * 2 * Math.PI / 360;
                _this._angle += 0.1;
                if (_this._angle > 360) {
                    _this._angle = _this._angle - 360;
                }
                requestAnimationFrame(_this._animate);
                _this._draw();
            };
        }
        Main.prototype.start = function () {
            console.log("star");
            this._initThree();
            this._initCamera();
            this._initShaderMaterial();
            this._initLight();
            this._initObject();
            this._animate();
        };
        Main.prototype._initThree = function () {
            this._canvasFrame = document.getElementById('canvas-frame');
            this._renderer = new THREE.WebGLRenderer({ antialias: true });
            if (!this._renderer)
                alert("初期化失敗");
            this._renderer.setSize(this._canvasFrame.clientWidth, this._canvasFrame.clientHeight);
            this._canvasFrame.appendChild(this._renderer.domElement);
            this._renderer.setClearColor(0xEEEEEE, 1.0);
            this._scene = new THREE.Scene();
        };
        Main.prototype._initCamera = function () {
            this._camera = new THREE.PerspectiveCamera(45, this._canvasFrame.clientWidth / this._canvasFrame.clientHeight, 1, 10000);
            this._camera.position.set(50, 50, 100);
            this._camera.up.set(0, 0, 1);
            this._camera.lookAt({ x: 0, y: 0, z: 0 });
        };
        Main.prototype._initLight = function () {
            this._directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
            this._directionalLight.position.set(50, 20, 100);
            this._scene.add(this._directionalLight);
        };
        Main.prototype._initShaderMaterial = function () {
            var _this = this;
            SHADER_LOADER.load(function (data) {
                var vs = data.myShader.vertex;
                var fs = data.myShader.fragment;
                _this._shader = new THREE.ShaderMaterial({
                    wireframe: true,
                    vertexShader: vs,
                    fragmentShader: fs,
                    uniforms: _this._uniforms,
                    attributes: _this._attributes
                });
                var geometry = new THREE.CubeGeometry(20, 20, 20);
                var material2 = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
                _this._cube2 = new THREE.Mesh(geometry, _this._shader);
                _this._scene.add(_this._cube2);
            });
        };
        Main.prototype._initObject = function () {
            this._axis = new THREE.AxisHelper(50);
            this._scene.add(this._axis);
            this._axis.position.set(0, 0, 0);
            var geometry = new THREE.CubeGeometry(20, 20, 20);
            var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
            this._cube = new THREE.Mesh(geometry, material);
            this._scene.add(this._cube);
        };
        Main.prototype._draw = function () {
            this._renderer.clear();
            this._renderer.render(this._scene, this._camera);
        };
        return Main;
    })();
    _Main.Main = Main;
})(Main || (Main = {}));
//# sourceMappingURL=main.js.map