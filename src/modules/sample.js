"use strict";
exports.__esModule = true;
var PIXI = require("pixi.js");
var app = new PIXI.Application({
    width: 600,
    height: 600,
    backgroundColor: 0x1099bb
});
var appElement = document.getElementById('app');
appElement.appendChild(app.view);
app.stage.sortableChildren = true;
var pigTexture = PIXI.Texture.from("../images/buta.png");
var pigSprite = new PIXI.Sprite(pigTexture);
pigSprite.anchor.set(0.5, 0.5);
pigSprite.x = app.screen.width / 2;
pigSprite.y = app.screen.height / 2;
app.stage.addChild(pigSprite);
var yellowPigSprite = new PIXI.Sprite(pigTexture);
yellowPigSprite.anchor.set(0.5, 0.5);
yellowPigSprite.scale.set(1.5, 1.5);
yellowPigSprite.alpha = 0.9;
yellowPigSprite.rotation = Math.PI / 3;
yellowPigSprite.tint = 0xffff00;
yellowPigSprite.x = app.screen.width / 2 + 150;
yellowPigSprite.y = app.screen.width / 2;
yellowPigSprite.zIndex = 100;
app.stage.addChild(yellowPigSprite);
var ellipse = new PIXI.Graphics()
    .beginFill(0xff0000)
    .drawEllipse(0, 0, 30, 20)
    .endFill();
ellipse.pivot.set(15, 10);
ellipse.setTransform(100, 100);
ellipse.rotation = Math.PI / 6;
app.stage.addChild(ellipse);
var polygon = new PIXI.Graphics()
    .beginFill(0x00dd00, 0.7)
    .drawPolygon([
    0, 0,
    25, -20,
    50, 0,
    50, 20,
    25, 40,
    0, 20
])
    .endFill();
polygon.setTransform(100, 100);
app.stage.addChild(polygon);
var line = new PIXI.Graphics()
    .lineStyle(1, 0x000000)
    .moveTo(0, 0)
    .lineTo(50, 0)
    .lineTo(25, -25)
    .moveTo(50, 0)
    .lineTo(25, 25)
    .endFill();
line.setTransform(300, 100);
app.stage.addChild(line);
var radius = 80;
var angle = 0;
var graphics = new PIXI.Graphics()
    .beginFill(0xff0000)
    .drawCircle(0.5, 0.5, radius)
    .endFill();
var circle = new PIXI.Graphics()
    .beginTextureFill(pigTexture, 0x00ffff, 1, new PIXI.Matrix(0, 0, 0, 0, -35, -35))
    .lineStyle(2, 0x000000)
    .drawCircle(0.5, 0.5, 30)
    .endFill();
app.stage.addChild(circle);
var screenWidth = app.screen.width;
var screenHeight = app.screen.height;
var stageHeight = screenHeight - 200;
var sampleContainer = new PIXI.Container();
sampleContainer.setTransform(100, stageHeight);
app.stage.addChild(sampleContainer);
var backgroundContainer = new PIXI.Graphics()
    .beginFill(0xffff00)
    .drawRect(0, 0, 400, 200)
    .endFill();
sampleContainer.addChild(backgroundContainer);
for (var i_1 = 0; i_1 < 2; i_1++) {
    for (var j = 0; j < 13; j++) {
        var pig = new PIXI.Sprite(pigTexture);
        pig.scale.x = pig.scale.y = 0.35;
        pig.x = j * 30 + 10;
        pig.y = i_1 * 100 + 20;
        sampleContainer.addChild(pig);
    }
}
pigSprite.interactive = true;
pigSprite.buttonMode = true;
yellowPigSprite.interactive = true;
yellowPigSprite.buttonMode = true;
var i = 0;
pigSprite.on('pointertap', showAlert);
yellowPigSprite.on('pointerdown', onYellowPointerDown)
    .on('pointerup', onYellowPointerUp);
window.addEventListener('mouseup', function (ev) {
    yellowPigSprite.off('pointermove', moveYellowPig);
});
var baseLocationX = screenHeight / 2;
var baseLocationY = screenWidth / 2;
function showAlert(e) {
    console.log(e);
    alert('is taped');
}
function onYellowPointerDown(e) {
    yellowPigSprite.on('pointermove', moveYellowPig);
    console.log(yellowPigSprite.zIndex);
}
function moveYellowPig(e) {
    var pigPosition = e.data.getLocalPosition(app.stage);
    var a = Math.atan2(pigPosition.y - pigSprite.y, pigPosition.x - pigSprite.x);
    pigSprite.setTransform(baseLocationX, baseLocationY);
    yellowPigSprite.x = baseLocationX + 200 * Math.cos(i * Math.PI / 180);
    yellowPigSprite.y = baseLocationY + 200 * Math.sin(i * Math.PI / 180);
    i += 3;
    if (i == 360) {
        i = 0;
    }
}
function onYellowPointerUp(e) {
    yellowPigSprite.off('pointermove', moveYellowPig);
}
function loop() {
    requestAnimationFrame(loop);
    angle += 3;
    graphics.x = 100 + radius * Math.cos(angle * Math.PI / 180);
    graphics.y = 100 + radius * Math.sin(angle * Math.PI / 180);
    app.stage.addChild(graphics);
    if (angle / 360 == 1) {
        angle = 0;
    }
}
app.loader
    .add('spineCharacter', 'spine-data-1/HERO.json')
    .load(function (loader, resources) {
    var animation = new PIXI.spine.Spine(resources.spineCharacter.spineData);
    app.stage.addChild(animation);
    var animation = new PIXI.spine.Spine(spineBoyData);
    if (animation.state.hasAnimation('run')) {
        animation.state.setAnimation(0, 'run', true);
        animation.state.timeScale = 0.1;
    }
    app.start();
});
var smallPig = new PIXI.Sprite(pigTexture);
sampleContainer.addChild(smallPig);
//# sourceMappingURL=sample.js.map