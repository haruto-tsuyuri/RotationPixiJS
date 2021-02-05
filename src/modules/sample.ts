// // get instance of Pixi application
// import * as PIXI from "pixi.js";
// import {position} from "../../../Users/GRIT_B/anaconda3/Lib/site-packages/bokeh/server/static/js/types/core/dom";
//
// let app: PIXI.Application = new PIXI.Application({
//     width: 600,
//     height: 600,
//     backgroundColor: 0x1099bb,
// });
// // HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
// const appElement: Document["body"] = document.getElementById('app');
// appElement.appendChild(app.view);
// app.stage.sortableChildren = true;
// /**
//  * typescript only use new wiht class.
//  * case javascript
//  * ```javascript
//  * let butaTexture = new PIXI.Texture.from('./img/buta.png');
//  *```
//  * case typescript
//  * ```typescript
//  * PIXI.Texture.from("images/buta.png");
//  * ```
//  *
//  */
// let pigTexture: PIXI.Texture = PIXI.Texture.from("../images/buta.png");
// // 読み込んだテクスチャから、スプライトを生成する
// const pigSprite: PIXI.Sprite = new PIXI.Sprite(pigTexture);
// // ぶたの基準点を設定(%) 0.5はそれぞれの中心 位置・回転の基準になる
// pigSprite.anchor.set(0.5, 0.5);
// // ぶたの位置決め
// pigSprite.x = app.screen.width / 2;        // ビューの幅 / 2 = x中央
// pigSprite.y = app.screen.height / 2;       // ビューの高さ / 2 = y中央
// // 表示領域に追加する
// app.stage.addChild(pigSprite);
//
// const yellowPigSprite: PIXI.Sprite = new PIXI.Sprite(pigTexture);
// yellowPigSprite.anchor.set(0.5, 0.5);
// yellowPigSprite.scale.set(1.5, 1.5);
// yellowPigSprite.alpha = 0.9;
// yellowPigSprite.rotation = Math.PI / 3; // ラジアンで傾き指定
// yellowPigSprite.tint = 0xffff00;
// yellowPigSprite.x = app.screen.width / 2 + 150;
// yellowPigSprite.y = app.screen.width / 2;
// yellowPigSprite.zIndex = 100;
// app.stage.addChild(yellowPigSprite);
//
// const ellipse: PIXI.Graphics = new PIXI.Graphics()
//     .beginFill(0xff0000) // 塗りつぶし
//     .drawEllipse(0, 0, 30, 20) // 中心の x,y座標, 幅、高さ
//     .endFill();
//
// // 基準点を設定(px) 図形(PIXI.Graphicsにはpivotはないので注意)
// ellipse.pivot.set(15, 10);
// ellipse.setTransform(100, 100);
// ellipse.rotation = Math.PI / 6;
// app.stage.addChild(ellipse);
//
// // 多角形を作る
// const polygon: PIXI.Graphics = new PIXI.Graphics()
//     .beginFill(0x00dd00, 0.7)
//     .drawPolygon([
//         0, 0,
//         25, -20,
//         50, 0,
//         50, 20,
//         25, 40,
//         0, 20
//     ])
//     .endFill();
// polygon.setTransform(100, 100);
// app.stage.addChild(polygon);
//
//
// // 線を描く
// const line: PIXI.Graphics = new PIXI.Graphics()
//     .lineStyle(1, 0x000000)
//     .moveTo(0, 0)
//     .lineTo(50, 0)
//     .lineTo(25, -25)
//     .moveTo(50, 0)
//     .lineTo(25, 25)
//     .endFill();
// line.setTransform(300, 100);
// app.stage.addChild(line);
//
// const radius = 80;
// let angle = 0;
// const graphics: PIXI.Graphics = new PIXI.Graphics()
//     .beginFill(0xff0000)
//     .drawCircle(0.5, 0.5, radius)
//     .endFill();
//
//
// let circle: any = new PIXI.Graphics()// @ts-ignore
//     .beginTextureFill(pigTexture, 0x00ffff, 1, new PIXI.Matrix(1, 0, 0, 1, -35, -35))
//     .lineStyle(2, 0x000000)
//     .drawCircle(0, 0, 30)
//     .endFill();
// circle.x = 300;
// circle.y = 100;
// circle.zIndex = 10;
// app.stage.addChild(circle);
//
// // get screen width and height
// const screenWidth: number = app.screen.width;
// const screenHeight: number = app.screen.height;
// const stageHeight: number = screenHeight - 200;
//
// // make a sample container
// const sampleContainer: PIXI.Container = new PIXI.Container();
//
// // set up container in stage
// sampleContainer.setTransform(100, stageHeight);
// app.stage.addChild(sampleContainer);
//
// // object of container background
// const backgroundContainer: PIXI.Graphics = new PIXI.Graphics()
//     .beginFill(0xffff00)
//     .drawRect(0, 0, 400, 200)
//     .endFill();
//
// // add object in container
// sampleContainer.addChild(backgroundContainer);
//
// // add many pigs inside container
// let pigs: Array<PIXI.Sprite> = new Array<PIXI.Sprite>();
// for (let i = 0; i < 2; i++) {
//     for (let j = 0; j < 13; j++) {
//         let pig = new PIXI.Sprite(pigTexture);
//         pig.scale.x = pig.scale.y = 0.35;
//         pig.x = j * 30 + 10;
//         pig.y = i * 100 + 20;
//         sampleContainer.addChild(pig);
//         pigs.push(pig);
//     }
// }
// // loop();
//
// // click event
// pigSprite.interactive = true;
// pigSprite.buttonMode = true;
// yellowPigSprite.interactive = true;
// yellowPigSprite.buttonMode = true;
// let i = 0;
// // add eventListener
// pigSprite.on('pointertap', showAlert);
// yellowPigSprite.on('pointerdown', onYellowPointerDown)
//     .on('pointerup', onYellowPointerUp);
// window.addEventListener('mouseup', ev => {
//     yellowPigSprite.off('pointermove', moveYellowPig);
// });
// const baseLocationX: number = screenHeight / 2;
// const baseLocationY: number = screenWidth / 2;
//
// yellowPigSprite.x = baseLocationX;
// yellowPigSprite.y = baseLocationY + 200;
// function showAlert(e: PIXI.Sprite): void {
//     console.log(e);
//     alert('is taped');
// }
//
// function onYellowPointerDown(e: PIXI.Sprite): void {
//     yellowPigSprite.on('pointermove', moveYellowPig);
//     console.log(yellowPigSprite.zIndex);
//
// }
//
// function moveYellowPig(e: any): void {
//     let pigPosition: PIXI.Sprite = e.data.getLocalPosition(app.stage);
//     let mousePosition = e.data.getLocalPosition(app.stage);
//     let atan2: number = Math.atan2(pigPosition.y - baseLocationY, pigPosition.x - baseLocationX);
//
//     pigSprite.setTransform(baseLocationX, baseLocationY);
//
//     // let angle: number = (mousePosition.x - baseLocationX) / (mousePosition.y - baseLocationY);
//     yellowPigSprite.x = baseLocationX + 200 * Math.cos(atan2);
//     yellowPigSprite.y = baseLocationY + 200 * Math.sin(atan2);
//     let degree = atan2 * 180 / Math.PI;
//     if (degree < 0.0) {
//         degree += 360.0;
//     }
//     const PositionDegree = 90;
//      let test = PositionDegree * (Math.PI / 180);
//     let testAtan2 = PositionDegree * (Math.PI / 180);
//  let radian = PositionDegree * (Math.PI / 180);
// console.log("radian" + radian + "test atan2" + testAtan2);
//     pigSprite.x = baseLocationX + 200 * Math.cos(atan2 + test);
//     pigSprite.y = baseLocationY+ 200 * Math.sin(atan2 + test);
//     // console.log("original" +yellowPigSprite.width);
//     // yellowPigSprite.width -= yellowPigSprite.width / 360
//     // yellowPigSprite.height -= yellowPigSprite.height / 360
//     console.log("yellowPigSprite.width " + yellowPigSprite.width );
// console.log(degree);
//     // setTransform
//     // yellowPigSprite.setTransform(pigPosition.x, pigPosition.y);
//     // pigSprite.setTransform(pigPosition.x, pigPosition.y + 1);
//
// }
//
// // console.log(i);
// // フレーム更新時の処理（ループ処理）を追加する
// app.ticker.add(animate);
// let amountTime: number = 0;
//
// function animate(delta: number) {
// // console.log("delta : " + delta);
// // console.log("deltaMs : " + app.ticker.deltaMS);
//     circle.rotation += 0.2;
//     amountTime += delta;
//     if (Math.cos(amountTime / 10) > 0) {
//         circle.x += 2;
//     } else {
//         circle.x -= 2;
//     }
// }
//
// function onYellowPointerUp(e: PIXI.Sprite): void {
//     yellowPigSprite.off('pointermove', moveYellowPig);
// }
//
// // 押されたキーの情報を格納する配列を用意
// const left: number = 0;
// const up: number = 1;
// const right: number = 2;
// const down: number = 3;
// let pig: PIXI.Sprite = pigs[0];
// let pushed: any = [];
// pushed[left] = false;
// pushed[up] = false;
// pushed[right] = false;
// pushed[down] = false;
// let inputKey: string;
//
// interface inputKeys {
//     [key: string]: boolean;
// }
//
// const arrowKeyFormats: Array<string> = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
//
//
// let arrowKeys: inputKeys = {};
// for (let i = 0; i < arrowKeyFormats.length; i++) {
//     arrowKeys[arrowKeyFormats[i]] = false;
// }
//
//
// window.addEventListener('keydown', function (e) {
//     arrowKeys[e.key] = true;
// });
//
// // あるキーが離されたときのイベントリスナーを設定
// window.addEventListener('keyup', function (e) {
//     arrowKeys[e.key] = false;
// });
//
// app.ticker.add((delta) => { // なんじゃこれという人向け: function(delta)の省略形です(厳密には違う)
//     if (arrowKeys["ArrowDown"]) {
//         pig.y += 5;
//     }
//     if (arrowKeys["ArrowUp"]) {
//         pig.y -= 5;
//     }
//     if (arrowKeys["ArrowLeft"]) {
//         pig.x -= 5;
//     }
//     if (arrowKeys["ArrowRight"]) {
//         pig.x += 5;
//     }
// });
//
//
//
// class LocationConductor {
//     public screenWidth : number = window.screen.width;
//     public screenHeight : number = window.screen.height;
//
//     public getBaseLocationX(): number {
//         return this.screenWidth / 2;
//     }
//     public getBaseLocationY(): number {
//         return this.screenHeight / 2;
//     }
//     public getSemiprivate() {
//         return this.getBaseLocationX();
//     }
//
//
// }
//
// class PixiHomeManager {
//
// private locationConductor: LocationConductor = new LocationConductor();
// private spriteManager: SpriteManager = new SpriteManager();
// private spriteObjects: Array<PIXI.Sprite>;
//
//
// // PIXI APP instance.
// private app: PIXI.Application = new PIXI.Application({
//     width: this.locationConductor.screenWidth,
//     height: this.locationConductor.screenHeight,
// });
//
// // location information variables.
// private baseLocationX: number = this.locationConductor.getBaseLocationX();
// private baseLocationY: number = this.locationConductor.getBaseLocationY();
// private semiprivate : number = this.locationConductor.getSemiprivate();
//
// private setSpriteOjects(picPaths : Array<string>){
//
//      this.spriteObjects = this.spriteManager.getSprites(picPaths);
//
// }
//
// private setLocation() {
//     const firstIndexPositionY = this.baseLocationY + this.semiprivate;
//     this.spriteObjects[0].setTransform(this.app.screen.width /2, this.app.screen.height /2);
//     this.spriteObjects[1].setTransform(this.baseLocationX, this.baseLocationY);
//     console.log("test ", firstIndexPositionY);
// }
//
// public setSprites(picPaths : Array<string>) {
//     this.setSpriteOjects(picPaths);
//     // this.setLocation();
//
//     this.spriteManager.add(this.spriteObjects);
// }
//
//
// }
//
//
//
// class SpriteManager {
//     private picTextures: Array<PIXI.Texture> = new Array<PIXI.Texture>();
//     private picSprites: Array<PIXI.Sprite> =  Array <PIXI.Sprite> ();
//
//
//     private getPicPathsLength(picPaths : Array<string>) {
//         return picPaths.length;
//     }
//
//     private setTextures(picPaths : Array<string>) {
//         const picPathsLength = this.getPicPathsLength(picPaths);
//         for(let i = 0; i < picPathsLength; i++) {
//             this.picTextures.push(PIXI.Texture.from(picPaths[i]));
//         }
//         return this.picTextures;
//     }
//
//     private create(picPaths:Array<string>) {
//         let textures = this.setTextures(picPaths);
//         for(let i = 0; i < textures.length; i++) {
//             this.picSprites.push(new PIXI.Sprite(textures[i]));
//             // app.stage.addChild(this.picSprites[i]);
//             console.log("test22 : " + i);
//         }
//         return this.picSprites;
//     }
//     public add(sprites : Array<PIXI.Sprite>) {
//         for(let i = 0; i < this.picSprites.length; i++){
//         app.stage.addChild(this.picSprites[i]);}
//     }
//
//     public getSprites(picPaths : Array < string >) {
//         return this.create(picPaths);
//     }
//
//     public setLocation(sprites: Array < PIXI.Sprite > ) {
//         const r = 150;
//         sprites[0].setTransform(app.screen.width  / 2 , app.screen.height / 2 + r);
//         const positionDegree = 360 / sprites.length;
//         const radian = positionDegree * (Math.PI / 180);
//         // baseLocationX + 200 * Math.cos(atan2 + test);
//         let atan2: number = Math.atan2(sprites[1].y - baseLocationY, sprites[1].x - baseLocationX);
//         for (let i = 1; i < sprites.length; i++) {
// // sprites[i].setTransform((app.screen.width  / 2) + r * Math.cos(atan2 + radian * i), (app.screen.height  / 2) + r * Math.sin(atan2 + radian * i));
//         }
//     }
// }
//
//
// const imagePath = ['../images/buta.png', '../images/buta.png', '../images/buta.png'] ;
//
// let spriteManager: SpriteManager = new SpriteManager();
// let sprites: Array<PIXI.Sprite> = spriteManager.getSprites(imagePath);
// spriteManager.setLocation(sprites);
// spriteManager.add(sprites);
// //
// let test333 = new PixiHomeManager();
// test333.setSprites(imagePath);
//
//
//
// // let picTextures = new Array<PIXI.Texture>();
// // let picSprite =  Array<PIXI.Sprite>();
// // for(i =0 ; i < imagePath.length; i++) {
// //     console.log("debug : " + i);
// //     picTextures.push(PIXI.Texture.from(imagePath[i]));
// //     picSprite.push(new PIXI.Sprite(picTextures[i]));
// //     app.stage.addChild(picSprite[i]);
// // }
// // window.addEventListener("keydown", function(e : KeyboardEvent) : void {
// //     console.log(e.key);
// //     // switch (e.key) {
// //     //     case "ArrowDown":
// //     //         pig.y += 5;
// //     //         break;
// //     //     case "ArrowUp":
// //     //         pig.y -= 5;
// //     //         break;
// //     //     case "ArrowLeft":
// //     //         pig.x -= 5;
// //     //         break;
// //     //     case "ArrowRight":
// //     //         pig.x += 5;
// //     //         break;
// //     // }
// //
// // //     if (e.key === "ArrowDown") {
// // //         pig.y += 5;
// // //     }
// // //     if (e.key === "ArrowUp") {
// // //         pig.y -= 5;
// // //     }
// // //     if (e.key === "ArrowLeft") {
// // // pig.x -= 5;
// // // }
// // //
// // //     if (e.key === "ArrowRight") {
// // //         pig.x += 5;
// // //     }
// // });
//
//
// function loop() {
//     // ループ
//     requestAnimationFrame(loop)
//     angle += 3;
//     graphics.x = 100 + radius * Math.cos(angle * Math.PI / 180);
//     graphics.y = 100 + radius * Math.sin(angle * Math.PI / 180);
//     app.stage.addChild(graphics);
//     // console.log(graphics.x);
//     if (angle / 360 == 1) {
//         angle = 0;
//     }
// }
//
//
// app.loader
//     .add('spineCharacter', 'spine-data-1/HERO.json')
//     .load(function (loader, resources) {
//         // @ts-ignore
//         var animation = new PIXI.spine.Spine(resources.spineCharacter.spineData);
//
//         // add the animation to the scene and render...
//         app.stage.addChild(animation);
//
//         // run
//         // @ts-ignore
//         var animation = new PIXI.spine.Spine(spineBoyData);
//         if (animation.state.hasAnimation('run')) {
//             // run forever, little boy!
//             animation.state.setAnimation(0, 'run', true);
//             // dont run too fast
//             animation.state.timeScale = 0.1;
//         }
//
//         app.start();
//     });
//
// // class Object {
// //     public x: number;
// //     public y: number;
// //     sprite: PIXI.Sprite;
// //     data: any;
// //     alpha: number;
// //     dragging: boolean;
// //
// //     constructor(x : number, y : number, texture : PIXI.Texture) {
// //         this.x = x;
// //         this.y = y;
// //         this.sprite = new PIXI.Sprite(texture);
// //         this.setProperty(this.sprite);
// //         this.setEventListeners(this.sprite);
// //     }
// //
// //         getObject(){
// //             return this.sprite;
// //     }
// //
// //     setProperty(sprite : PIXI.Sprite) {
// //         sprite.anchor.set(0.5, 0.5);
// //         sprite.scale.set(2);
// //         sprite.position.set(this.x, this.y);
// //
// //     }
// //
// //     setEventListeners(sprite: PIXI.Sprite){
// //         sprite
// //             .on('mousedown', this.onDragStart)
// //             .on('touchStart', this.onDragStart)
// //             // event for drag end
// //             .on('mouseup', this.onDragEnd)
// //             .on('mouseupoutside', this.onDragEnd)
// //             .on('touchend', this.onDragEnd)
// //             .on('touchendoutside', this.onDragEnd)
// //             // event for drag move
// //             .on('mousemove', this.onDragMove)
// //             .on('touchmove', this.onDragMove);
// //     }
// //
// //     onDragStart(e : any) {
// //          // store a reference to the data
// //     // the reason for this is because of multitouch
// //     // we want to track the movement of this particular touch
// //         this.data = e.data;
// //         this.sprite.alpha = 0.5;
// //         this.sprite.interactive = true;
// //         this.sprite
// //             .on('pointermove', this.onDragMove);
// //     }
// //     onDragMove(e : any) {
// //         if (this.dragging) {
// //             const newPosition = e.data.getLocalPosition();
// //             this.sprite.position.x = newPosition.x;
// //             this.sprite.position.y = newPosition.y;
// //         }
// //     }
// //
// //     onDragEnd(e : any) {
// //         this.sprite.alpha = 1;
// //         this.sprite.interactive = false;
// //         this.data = null;
// //     }
// //
// //
// // }
// // app.stage.addChild(circle);
// const smallPig: PIXI.Sprite = new PIXI.Sprite(pigTexture);
// sampleContainer.addChild(smallPig);
//
//
//
// abstract class Creator {
//
//     public abstract  factoryMethod(): Product;
//
//     public someOperation(): string {
//         const product: any = this.factoryMethod();
//            return `Creator: The same creator's code has just worked with ${product.operation()}`;
//     }
// }
//
// class ConcreteCreator1 extends Creator {
//
//     public factoryMethod(): Product {
//         return new ConcreteProduct1();
//     }
// }
//
// class ConcreteCreator2 extends Creator {
//     public factoryMethod(): Product {
//         return new ConcreteProduct2();
//     }
// }
//
// interface Product {
//     operation(): string;
// }
//
// class ConcreteProduct1 implements Product {
//     public operation(): string {
//         return '{Result of the ConcreteProduct1}';
//     }
// }
//
// class ConcreteProduct2 implements Product {
//     public operation(): string {
//         return '{Result of the ConcreteProduct2}';
//     }
// }
//
//
// function clientCode(creator: Creator) {
//     console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
// console.log(creator.someOperation());
// }
//
//
// console.log('App: Launched with the ConcreteCreator1.');
// clientCode(new ConcreteCreator1());
// console.log('');
// console.log('App: Launched with the ConcreteCreator2.');
// clientCode(new ConcreteCreator2());
//
//
// abstract class DoorCreator {
//    public abstract factoryMethod(): Door;
//    public createDoor(): number {
//        const product:any = this.factoryMethod();
//        return 100;
//    }
// }
//
// class WoodenDoorCreator extends DoorCreator {
//     public factoryMethod() : Door {
//         return new WoodenDoorProduct();
//     }
// }
//
// interface Door {
//     operation(): string;
// }
//
// class WoodenDoorProduct implements Door {
//     operation(): string {
//         return "successed";
//     }
// }
//
// function clientCode2(doorCreator: DoorCreator) {
//     console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
// console.log(doorCreator.createDoor());
// }
//
// console.log('App: Launched with the WoodenDoorCreator.');
// clientCode2(new WoodenDoorCreator());
// console.log('');
// console.log('App: Launched with the WoodenDoorCreator.');
// clientCode2(new WoodenDoorCreator());
//
//
//
//
// class SpriteCreator {
//
//     private sprites: Array<PIXI.Sprite>;
//     private getTextures(picPaths : Array<string>) {
//         let textures : Array<PIXI.Texture> = new Array<PIXI.Texture>();
//
//         for (let i = 0; i <= textures.length; i++) {
//             textures[i] = PIXI.Texture.from(picPaths[i]);
//         }
//         console.log(textures[0]);
//         return textures;
//
//     }
//
//     public create(picPaths : Array<string>): Array<PIXI.Sprite> {
//         const textures = this.getTextures(picPaths);
//         for(let i=0; i <= textures.length; i++){
//         this.sprites[i] = new PIXI.Sprite (textures[i]); }
//          return this.sprites;
//     }
//
// }
//
// let test = new SpriteCreator();
// let test1 = test.create(['../images/00139.png']);
// app.stage.addChild(test1[0]);
// let image = '../images/00139.png';
// const e = document.createElement("img");
// e.src = image;
// document.body.appendChild(e);
//
//
// // const test = new PixiHomeManager([imagePath, imagePath]);
//
//
//
//
