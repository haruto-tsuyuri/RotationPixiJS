// // get instance of Pixi applicatio alt=""n
// import * as PIXI from "pixi.js";
// import {DisplayObject} from "pixi.js";
// import {container} from "webpack";
// import {to_string} from "../../../Users/GRIT_B/anaconda3/Lib/site-packages/bokeh/server/static/js/types/core/util/pretty";
// import {isArray} from "../../../Users/GRIT_B/anaconda3/Lib/site-packages/bokeh/server/static/js/types/core/util/types";
// import {a} from "../../../Users/GRIT_B/anaconda3/Lib/site-packages/bokeh/server/static/js/types/core/dom";
//
// interface Valid {
//     isValid: true;
// }
//
// interface Invalid {
//     isValid: false;
//     errorText: string;
// }
//
// type ValidationResult = Valid | Invalid;
//
// const validationAlpha = (n: number): ValidationResult => {
//     return (n >= -1 )  ? {isValid : true}  :  (n <= 1) ? {isValid : true} : {isValid: false, errorText : "alpha range is -1 ~ 1"}
// }
// interface PixiConfig {
//     width : number ;
//     height : number;
//     canvasId : string;
//     app : PIXI.Application;　
//     baseLocationX: number;
//     baseLocationY: number;
//     appElement: HTMLElement;
//     r: number; // 台の半径
//     getSprites(picPaths: Array<string>): PIXI.Sprite[];
//     getApp(): PIXI.Application;
//     spriteObjects: PIXI.Sprite[]; // キャラクターObjectを格納するためのリスト
// }
//
//
// class PixiImplementer implements PixiConfig {
//     width = window.innerWidth;
//     height = window.innerHeight;
//     canvasId = 'app';
//     baseLocationX = this.width / 2;
//     baseLocationY = this.height / 2;
//     spriteObjects = new Array<PIXI.Sprite>();
//     alpha = validationAlpha(0.9);
//     r = 100;
// app = new PIXI.Application({
//     width: this.width,
//     height : this.height,
// });
// appElement = document.getElementById(this.canvasId);
//
// getSprites(picPaths: Array<string> | string): PIXI.Sprite[] {
//     let textures: PIXI.Texture[] = new Array<PIXI.Texture>();
//     let spriteObjects= new Array<PIXI.Sprite>();
//     if( Array.isArray(picPaths)) {
//             for(let i = 0; i < picPaths.length; i++){
//         textures.push(PIXI.Texture.from(picPaths[i]));
//         spriteObjects.push(new PIXI.Sprite(textures[i]));
//     }
//     } else {
//         textures.push(PIXI.Texture.from(picPaths));
//         spriteObjects.push(new PIXI.Sprite(textures[0]));
//     }
//     return spriteObjects;
// }
//
// getApp(): PIXI.Application {
//     return this.app;
// }
//
//
// }
//
//
// class PixiCreater extends PixiImplementer {
//
//     constructor() {
//         super();
//         this.app.stage.sortableChildren = true;
//         this.app.renderer.plugins.moveWhenInside = true;
//         this.appendView();
//
//         console.log("its called");
//
//     }
//
//     public appendView() : void {
//         this.appElement.appendChild(this.app.view);
//     }
//
// }
//
//
// class PixiManager {
//
//     private pixiCreater : PixiCreater = new PixiCreater();
//     private pixiImplementer : PixiImplementer = new PixiImplementer();
//     private sprites: PIXI.Sprite[] = new Array<PIXI.Sprite>();
//     private backgroundSprite: any ;
//     private baseLocationY = this.pixiImplementer.baseLocationY;
//     private baseLocationX = this.pixiImplementer.baseLocationX;
//
//
//     public setSprites(picPaths: Array<string> | string) : void {
//         if(Array.isArray(picPaths)) {
//             this.sprites = this.pixiCreater.getSprites(picPaths);
//         } else {
//             this.backgroundSprite = this.pixiCreater.getSprites(picPaths);
//
//         }
//
//     }
//
//     private getAdditionAngle() {
//         return 360 / this.sprites.length;
//     }
//
//     private getAtan2(sprite : PIXI.Sprite) {
//         return Math.atan2(sprite.y - this.pixiImplementer.baseLocationY, sprite.x - this.pixiImplementer.baseLocationX);
//     }
//
//
//
//     public setSpriteProperty(locationX: number = this.pixiImplementer.baseLocationX, locationY : number = this.pixiImplementer.baseLocationY) {
//         let additionAngle = this.getAdditionAngle();
//         let degree = 0;
//
//         this.sprites[0].x = locationX;
//         this.sprites[0].y = locationY + this.pixiImplementer.r;
//         let atan2: number = this.getAtan2(this.sprites[0]);
//         for (let i = 0; i < this.sprites.length; i++) {
//             console.log("length: ", this.sprites.length);
//             let radian = degree * (Math.PI / 180);
//             this.sprites[i].interactive = true;
//             this.sprites[i].buttonMode = true;
//             this.sprites[i].x = locationX + this.pixiImplementer.r * Math.cos(atan2 + radian) / 1.2;
//             this.sprites[i].y = locationY + this.pixiImplementer.r * Math.sin(atan2 + radian);
//             this.sprites[i].anchor.set(0.5, 0.5);
//             let additionDepth = ((this.sprites[0].y - this.sprites[i].y) / 1500);
//             this.sprites[i].scale.set((1.0 - (additionDepth * 4)) / 2, (1.0 - (additionDepth * 4)) / 2);
//             this.sprites[i].zIndex = this.sprites[i].y;
//             degree += additionAngle;
//         }
//
//
//     }
//
//
//
//
//
//
//     public addChilds() {
// try {
//     for (let i = 0; i < this.sprites.length; i++) {
//         this.pixiCreater.app.stage.addChild(this.sprites[i]);
//     }
// } catch (error) {
//     console.assert(error.message);
// }
//
//
//     }
//
//     public getAppInstance() {
//         return this.pixiCreater.app;
//     }
//
//     public getSprites() {
//         return this.sprites;
//     }
//
//     public orderSprites() {
//         this.sprites.sort(function (a, b) {
//             if (a.y < b.y) {
//                 return -1;
//             }
//             if (a.y > b.y) {
//                 return 1;
//             }
//             return 0;
//         })
//     }
//
//
// }
//
// let images = ['../images/1.png', '../images/2.png', '../images/3.png', '../images/MIREI.png', '../images/4.png'];
//
// // let images = ['../images/1.png'];
//
//
// class PixiMaker {
//
//     private pixiManager: PixiManager = new PixiManager();
//     private readonly picPaths: Array<string>;
//     private readonly backgroundPicPath: string;
//
//
//     constructor(picPaths: Array<string>, backgroundPicPath: string) {
//         this.picPaths = picPaths;
//         this.backgroundPicPath = backgroundPicPath;
//     }
//
//     public drawCanvas() {
//         this.drawSprites();
//         this.pixiManager.addChilds();
//     }
//
//     private drawSprites() {
//         this.pixiManager.setSprites(this.picPaths);
//         this.pixiManager.setSpriteProperty();
//     }
//     public getAppInstances() {
// return this.pixiManager.getAppInstance();
//     }
//
//     public getSprites() {
//         return this.pixiManager.getSprites();
//     }
// }
//
// const pixiMaker: PixiMaker = new PixiMaker(images, images[0]);
// pixiMaker.drawCanvas();
//
// let app = pixiMaker.getAppInstances();
// let sprites = pixiMaker.getSprites();
// sprites[0].name = 'i';
// sprites[1].name = 'i2';
// sprites[2].name = 'i3';
// sprites[3].name = 'i4';
// // for (let i = 0; i < sprites.length; i++) {
// //     sprites[i].on('pointerdown', test).on('pointerup', test2);
// // }
// window.addEventListener('pointerup', test2);
//
// sprites[0].on('pointerdown', test).on('pointerup', test2)
//
// function test(e: any) {
//     console.log(sprites[0].zIndex);
//     console.log(sprites[1].zIndex);
//     const zIndex: Array<number> = sprites.map(value => value.zIndex);
//     console.log(zIndex);
//
//     console.log("is clicked");
//     e.target.on('pointermove', moveTest);
//     // e.data.on('pointermove', moveTest);
//
//
// }
//
// function sort() {
//
//     app.stage.sortChildren();
// }
//
// // function getZIndex(spriteObj: Array<PIXI.Sprite> | PIXI.Sprite): Array<string> | string {
// //     let zIndex: Array<string> | string;
// //     if (isArray(spriteObj)) {
// //         for (let i = 0; i < spriteObj.length; i++) {
// //             zIndex = new Array<string>();
// //             zIndex.push(spriteObj[i].name);
// //         }
// //     } else {
// //         zIndex = spriteObj.name;
// //     }
// //     return zIndex;
// // }
//
// function test2(e: any) {
//     sprites[0].removeListener("pointermove", moveTest);
//     console.log("is click up");
//     console.log(sprites[0].zIndex);
//     console.log(sprites[1].zIndex);
//     console.log(sprites[0].name);
//     console.log(app.stage.sortableChildren);
//     app.stage.sortChildren();
//     const zIndex: Array<number> = sprites.map(value => value.zIndex);
//     console.log(zIndex);
//
//
// }
//
// function getAtan2(sprite: PIXI.Sprite) {
//     return Math.atan2(sprite.position.y - baseLocationY, sprite.position.x - baseLocationX);
// }
//
// const baseLocationX: number = window.innerWidth / 2;
// const baseLocationY: number = window.innerHeight / 2;
// const r: number = 100;
//
//
// function moveTest(e: any) {
//     let picLocalPosition = e.data.getLocalPosition(app.stage);
//     let test1 = e.data.global.position;
//     // let spritesAtan2 = getAtan2(sprites[0]);
//     let atan2 = Math.atan2(picLocalPosition.y - baseLocationY, picLocalPosition.x - baseLocationX);
//     for (let i = 0; i < sprites.length; i++) {
//         let positionDegree = (360 / sprites.length) * i;
//         let testAtan2 = Math.atan2(sprites[i].y - picLocalPosition.y, sprites[i].x - picLocalPosition.x);
//         let radian = positionDegree * (Math.PI / 180);
//         let targetRadian = getAtan2(sprites[i]);
//         // console.log(i + ":" + targetRadian);
//         sprites[i].y = baseLocationY + r * Math.sin(atan2 + radian);
//         sprites[i].x = baseLocationX + r * Math.cos(atan2 + radian) / 1.2;
//         // let additionDepth = ((baseLocationY - sprites[i].y) / 1500);
//         // sprites[i].scale.set((1.0 - (additionDepth * 4)) / 2, (1.0 - (additionDepth * 4)) / 2);
//         sprites[i].zIndex = sprites[i].y;
//     }
// }
//
//
// console.log(typeof app);
// console.log(typeof sprites);
//
//
// let testApp = new PIXI.Application({
//     height: 300,
//     width: 400,
//     antialias: true,
//     transparent: false,
//     resolution: 1
// })
//
// document.body.appendChild(testApp.view);
//
// let texture1 = PIXI.utils.TextureCache["../images/1.png"];
// let texture2 = PIXI.utils.TextureCache["../images/2.png"];
// let test1 = new PIXI.Sprite(texture1);
// let test22 = new PIXI.Sprite(texture2);
//
// test22.setTransform(-100, 150)
// test1.zIndex = 5;
// test1.setTransform(test22.x / 3, test22.y / 2);
// console.log(test22.y);
// test22.zIndex = 2;
// testApp.stage.addChild(test1);
// testApp.stage.addChild(test22);
// console.log(test1.y + "," + test22.y);
// testApp.stage.sortChildren();
// console.log(test1.y + "," + test22.y);
//
// let testImages = ['../images/1.png', '../images/2.png', '../images/3.png', '../images/MIREI.png', '../images/4.png'];
//
// interface PixiProperty {
//
//     width: number;
//     height: number;
//     canvasId: string;
//     appElement: HTMLElement;
//     sprites: Array<PIXI.Sprite>;
//
// }
//
// interface SpriteProperty {
//     additionAngle: number;
//     baseLocationX: number;
//     baseLocationY: number;
//     isInteractive: boolean;
//     isButtonMode: boolean;
//     firstSpriteAtan2: number;
//     additionDepth: number;
//     zIndex: number;
// }
//
//
// sprites.sort(function (a, b) {
//
//     if (a.y < b.y) {
//
//         return -1;
//     }
//     if (a.y > b.y) {
//         return 1;
//     }
//
//     return 0;
// })
//
// app.stage.sortChildren()