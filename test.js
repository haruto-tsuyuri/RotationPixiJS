//
//
// Object.defineProperty(exports, "__esModule", {
//     value: true
// });

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var _PixiHome = void 0;

var PixiHome = function () {
    function PixiHome() {
        _classCallCheck(this, PixiHome);

        this.app = null;
        this.resources = {};
        this.stageWidth = window.screen.width;
        this.stageHeight = 800;
        this.scale = 0;

        this.innerWidth = 0;
        this.innerHeight = 0;
        this.currentPosition = 0;
        this.degree = 0;
        this.eventName = 'pointerup';
        this.characterImagePaths = [];
        this.cardIDs = [];
        this.mode = 1;
        this.carouselDirection = 1;
        this.isSD = false;
        this.dragged = false;
    } // 1=character 2=avatar
    // 1=right -1=left


    _createClass(PixiHome, [{
        key: 'show',
        value: function show(characterImagePaths, cardIDs, avatarImagePath, assetPrefix) {
            var _this2 = this;

            var isSD = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var home_mode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

            var _this = this;
            _PixiHome = this;
            this.isSD = isSD;
            var container = new PIXI.Container();
            if (this.app == null) {
                var portraitWidth = 320;
                var zoom = portraitWidth / 320;

                this.innerWidth = window.innerWidth * 2 / zoom;
                this.innerHeight = window.innerHeight * 2 / zoom;
                this.app = new PIXI.Application({
                    width: (this.innerWidth / 2) * zoom,
                    height: this.innerHeight,
                });

                console.log("app width ", this.innerWidth);
                document.getElementById('canv').appendChild(this.app.view);
                var can = document.querySelector("#canv canvas");
                can.style.width = this.innerWidth / 2 + 'px';
                console.log("can.style.width", can.style.width);
                can.style.height = this.innerHeight / 2 + 'px';
                console.log("can.style.height", can.style.height);
                this.characterImagePaths = characterImagePaths;
                this.cardIDs = cardIDs;
                this.app.stage.updateLayersOrder = function () {
                    container.children.sort(function (a, b) {
                        if (a.position.y > b.position.y) return 1;
                        if (a.position.y < b.position.y) return -1;
                        return -1;
                    });
                };
            }

            this.setEventName();
            this.setScale();

            for (var i = this.characterImagePaths.length - 1; i >= 0; i--) {
                this.app.loader.add('character' + i, characterImagePaths[i]);
            }

            var spineLoaderOptions = {metadata: {spineAtlasSuffix: '.js'}};

            var bg_json_name = 'bg_home.json';
            if (home_mode === 2) {
                bg_json_name = 'bg_home_fes.json';
            } else if (home_mode == 3) {
                bg_json_name = 'bg_home_shougatsu.json';
            }

            if (home_mode === 2) {
                this.app.loader.add('confetti', assetPrefix + 'kamifubuki.json', spineLoaderOptions);
            }
let sprite = PIXI.Sprite.from("https://cfn.bu-tama.jp/images/1_home/modules/bg_contents-home.png");
            sprite.width = 320;
            sprite.height = 1360;
            this.app.loader.add("ss","https://cfn.bu-tama.jp/images/1_home/modules/bg_contents-home.png");
            this.app.stage.addChild(sprite);
            this.app.loader.add('bg', assetPrefix + bg_json_name, spineLoaderOptions).add('torch', assetPrefix + 'honoo.json', spineLoaderOptions).add('avatar', avatarImagePath).load(function (loader, resources) {
                var bg = new PIXI.spine.Spine(resources.bg.spineData);
                bg.state.setAnimation(0, 'cloud_speed_1500f', true);
                bg.interactive = _this2.characterImagePaths.length > 1;
                _this2.resources.bg = bg;
                bg.on('mousedown', _this2.onDragStart).on('touchstart', _this2.onDragStart).on('mouseup', _this2.onDragEnd).on('mouseupoutside', _this2.onDragEnd).on('touchend', _this2.onDragEnd).on('touchendoutside', _this2.onDragEnd).on('mousemove', _this2.onDragMove).on('touchmove', _this2.onDragMove);
                bg.scale.set(_this2.scale, _this2.scale);
                bg.position.set(_this2.innerWidth / 2, _this2.innerHeight / 2);
                _this2.app.stage.addChild(bg);

                var _loop = function _loop(_i) {
                    var character = new PIXI.Sprite(resources['character' + _i].texture);
                    character.anchor.x = 0.5;
                    character.anchor.y = 0.5;
                    // character.x = window.screen.width / 2;
                    // character.y = window.screen.height / 2;

                    character.interactive = true;
                    _this2.resources['character' + _i] = character;
                    character.on(_this2.eventName, function () {
                        if (_this.dragged == false) {
                            location.href = '/monstar/status?saveBack=1&uCharaId=' + _this.cardIDs[_i];
                        }
                    });
                    container.addChild(character);
                };

                for (var _i = _this2.characterImagePaths.length - 1; _i >= 0; _i--) {
                    _loop(_i);
                }

                bg.addChild(container);
                _this2.updateCharacterPosition();

                var avatar = new PIXI.Sprite(resources.avatar.texture);
                avatar.anchor.x = 0.5;
                avatar.anchor.y = 0.5;
                avatar.interactive = true;
                avatar.on(_this2.eventName, function () {
                    location.href = '/avatar/equipment-easy?saveBack=1';
                });
                _this2.resources.avatar = avatar;
                if (_this2.isSD) {
                    avatar.scale.set(_this2.scale * 1.4, _this2.scale * 1.4);
                } else {
                    avatar.scale.set(_this2.scale * 1.4 / 2, _this2.scale * 1.4 / 2);
                }
                avatar.position.set(_this2.innerWidth / 2, _this2.innerHeight / 2 - 130);
                _this2.app.stage.addChild(avatar);

                var torch = new PIXI.spine.Spine(resources.torch.spineData);
                torch.state.setAnimation(0, 'honoo', true);
                _this2.resources.torch = torch;
                torch.scale.set(_this2.scale, _this2.scale);
                torch.position.set(_this2.innerWidth / 2, _this2.innerHeight / 2);
                _this2.app.stage.addChild(torch);

                if (home_mode == 2) {
                    var addConfetti = function addConfetti() {
                        var confetti = new PIXI.spine.Spine(resources.confetti.spineData);
                        confetti.state.setAnimation(0, 'animation', false);
                        confetti.scale.set(_this2.scale, _this2.scale);
                        confetti.position.set(_this2.innerWidth / 2, _this2.innerHeight / 2);
                        _this2.app.stage.addChild(confetti);
                        confetti.state.addListener({
                            complete: function complete(event) {
                                confetti.removeAllListeners();
                                setTimeout(function () {
                                    _this2.app.stage.removeChild(confetti);
                                }, 1000);
                            }
                        });
                        confetti.state.addListener({
                            event: function event(entry, _event) {
                                if (_event.data.name == 'start') {
                                    addConfetti();
                                }
                            }
                        });
                    };
                    addConfetti();
                }

                window.updateHomeMode = _this2.updateMode;

                _this2.updateMode();
                _this2.app.start();
            });
        }
    }, {
        key: 'updateCharacterPosition',
        value: function updateCharacterPosition() {
            var baseX = window.screen.width / 2;
            var baseY = window.screen.height / 2;
            var ellipticity = 1.2;
            var minimamScale = 0.4;
            var addScale = 0.2;
            // var r = this.innerWidth / (this.scale * 2) / (addScale + 0.8);
            var r = (this.innerWidth / 4 / this.scale) * (0.8);
            console.log(r);
            var can = document.querySelector("#canv canvas");
            for (var i = 0; i < this.characterImagePaths.length; i++) {
                var radian = Math.PI / 180 * (this.degree + 90 + 360 / this.characterImagePaths.length * i);
                var character = this.resources['character' + i];

                character.position.x = -(this.innerWidth/ 4) + r * Math.cos(radian) + 110;
                console.log("character.position.x", character.position.x);
                console.log("chara size", character.width);
                // character.x = -(this.innerWidth / 4);
                         console.log("character.position.x", character.position.x);
                character.position.y = r * Math.sin(radian) / ellipticity + 60;
                console.log("character.position.y", character.position.y);

                console.log(character.position.x + " , " + character.position.y);
                var scale = (r * Math.sin(radian) / ellipticity + r / ellipticity) / (r * 2 / ellipticity);
                scale = minimamScale + (1 - minimamScale) * scale;
                if (this.isSD) {
                    scale *= 2;
                }
                character.scale.set(scale * addScale, scale * addScale);

                var coefficient = Math.abs(this.degree + 180 + 360 / this.characterImagePaths.length * i) % 360;
                if (coefficient > 180) {
                    coefficient = 180 - (coefficient - 180);
                }
                coefficient = parseInt(coefficient / 1.8) / 100;
                coefficient = 1 - coefficient;
                if (coefficient > 0.03) {
                    var filter = new PIXI.filters.ColorMatrixFilter();
                    var colorMatrix = [
                        //R  G  B  A
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
                    filter.matrix = colorMatrix;
                    filter.brightness(1 - coefficient * 0.6, false);
                    character.filters = [filter];
                } else {
                    character.filters = [];
                }

                this.app.stage.updateLayersOrder();
            }
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event) {
            this.dragStartX = event.data.global.x;
            this.dragPrevX = event.data.global.x;
            this.data = event.data;
            this.dragging = true;
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd() {
            this.dragging = false;
            this.data = null;
            var buffer = 20 * (6 - _PixiHome.characterImagePaths.length);
            var targetPosition = Math.round(Math.abs(_PixiHome.degree - _PixiHome.carouselDirection * buffer) % 360 / (360 / _PixiHome.characterImagePaths.length));

            if (_PixiHome.degree - _PixiHome.carouselDirection * buffer < 0) {
                targetPosition = Math.round((360 + (_PixiHome.degree - _PixiHome.carouselDirection * buffer)) % 360 / (360 / _PixiHome.characterImagePaths.length));
            }

            targetPosition = Math.abs(targetPosition % _PixiHome.characterImagePaths.length);
            _PixiHome.currentPosition = targetPosition;
            _PixiHome.degree = parseInt(_PixiHome.degree);
            if (targetPosition === 0 && _PixiHome.carouselDirection === -1) {
                _PixiHome.degree -= 360;
            } else if (targetPosition === _PixiHome.characterImagePaths.length - 1 && _PixiHome.carouselDirection === 1) {
                _PixiHome.degree += 360;
            }

            _PixiHome.app.ticker.add(_PixiHome.magneticMove);

            _PixiHome.dragged = false;
        }
    }, {
        key: 'magneticMove',
        value: function magneticMove() {
            var lap = parseInt(_PixiHome.degree / 360);
            var targetDegree = parseInt(360 / _PixiHome.characterImagePaths.length * _PixiHome.currentPosition) + lap * 360;

            var move = parseInt((targetDegree - _PixiHome.degree) / 3);
            if (move === 0) {
                _PixiHome.app.ticker.remove(_PixiHome.magneticMove);
                return;
            }
            _PixiHome.degree += move;
            _PixiHome.updateCharacterPosition();
        }
    }, {
        key: 'onDragMove',
        value: function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                _PixiHome.degree += (newPosition.x - this.dragPrevX) / -5;
                _PixiHome.carouselDirection = newPosition.x - this.dragStartX > 0 ? 1 : -1;

                if (_PixiHome.dragged == false && Math.abs(newPosition.x - this.dragStartX) > 5) {
                    _PixiHome.dragged = true;
                }
                this.dragPrevX = newPosition.x;
                _PixiHome.updateCharacterPosition();
            }
        }
    }, {
        key: 'setScale',
        value: function setScale() {
            var aspectRate = this.innerWidth / this.innerHeight;
            if (true) {
                if (this.innerWidth / this.stageWidth > this.innerHeight / this.stageHeight) {
                    this.scale = this.innerWidth / this.stageWidth * 1.7
                    this.scale.y = this.scale * 2
                } else {
                    this.scale = this.innerHeight / this.stageHeight  * 1.7;
                    this.scale.y = this.scale * 2
                }
            } else {
                if (this.innerWidth / this.stageWidth > this.innerHeight / this.stageHeight) {
                    this.scale = this.innerHeight / this.stageHeight  * 1.7;
                    this.scale.y = this.scale * 2
                } else {
                    this.scale = this.innerWidth / this.stageWidth * 1.7 ;
                    this.scale.y = this.scale * 2
                }
            }
            console.log("scale aaaaaaaaaaaaaaaaaaaaaaa",this.scale.y,this.scale.x);
        }
    }, {
        key: 'getRandomInt',
        value: function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }, {
        key: 'setEventName',
        value: function setEventName() {
            var ua = navigator.userAgent;
            if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('iPod') > 0 && ua.indexOf('Mobile') > 0) {
                this.eventName = 'touchend';
            }
        }
    }, {
        key: 'updateMode',
        value: function updateMode() {
            var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (toggle) {
                if (_PixiHome.mode === 1) {
                    _PixiHome.mode = 2;
                } else if (_PixiHome.mode === 2) {
                    _PixiHome.mode = 1;
                }
            }

            if (_PixiHome.mode === 1) {
                for (var i = _PixiHome.characterImagePaths.length - 1; i >= 0; i--) {
                    _PixiHome.resources['character' + i].visible = true;
                    _PixiHome.resources['character' + i].updateTransform();
                }
                _PixiHome.resources.avatar.visible = false;
                _PixiHome.resources.avatar.updateTransform();
            } else if (_PixiHome.mode === 2) {
                for (var _i2 = _PixiHome.characterImagePaths.length - 1; _i2 >= 0; _i2--) {
                    _PixiHome.resources['character' + _i2].visible = false;
                    _PixiHome.resources['character' + _i2].updateTransform();
                }
                _PixiHome.resources.avatar.visible = true;
                _PixiHome.resources.avatar.updateTransform();
            }
        }
    }]);

    return PixiHome;
}();

// exports.default = PixiHome;

//////////////////
// WEBPACK FOOTER
// ./frontend/javascripts/pixi_home.js
// module id = 205
// module chunks = 0
