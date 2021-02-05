// get instance of Pixi application
import * as PIXI from "pixi.js";
import {forEachResolvedProjectReference} from "ts-loader/dist/instances";
import {DisplayObject} from "pixi.js";
import {isNumber} from "../../../Users/GRIT_B/anaconda3/Lib/site-packages/bokeh/server/static/js/types/core/util/types";
interface Valid {
    isValid: true;
}
interface Invalid {
    isValid : false;
    errorText: string;
}

type ValidationResult = Valid | Invalid;

const validationAlpha = (n: number): ValidationResult => {
    return (n >= -1 )  ? {isValid : true}  :  (n <= 1) ? {isValid : true} : {isValid: false, errorText : "alpha range is -1 ~ 1"}
}
interface PixiConfig {
    width : number ;
    height : number;
    canvasId : string;
    app : PIXI.Application;　
    baseLocationX: number;
    baseLocationY: number;
    appElement: HTMLElement;
    r: number; // 台の半径
    getSprites(picPaths: Array<string>): PIXI.Sprite[];
    getApp(): PIXI.Application;
    spriteObjects: PIXI.Sprite[]; // キャラクターObjectを格納するためのリスト
}


class PixiImplementer implements PixiConfig {
    width = window.innerWidth;
    height = window.innerHeight;
    canvasId = 'app';
    baseLocationX = this.width / 2;
    baseLocationY = this.height / 2;
    spriteObjects = new Array<PIXI.Sprite>();
    alpha = validationAlpha(0.9);
    r = 100;
app = new PIXI.Application({
    width: this.width,
    height : this.height,
});
appElement = document.getElementById(this.canvasId);

getSprites(picPaths: Array<string> | string): PIXI.Sprite[] {
    let textures: PIXI.Texture[] = new Array<PIXI.Texture>();
    let spriteObjects= new Array<PIXI.Sprite>();
    if( Array.isArray(picPaths)) {
            for(let i = 0; i < picPaths.length; i++){
        textures.push(PIXI.Texture.from(picPaths[i]));
        spriteObjects.push(new PIXI.Sprite(textures[i]));
    }
    } else {
        textures.push(PIXI.Texture.from(picPaths));
        spriteObjects.push(new PIXI.Sprite(textures[0]));
    }
    return spriteObjects;
}

getApp(): PIXI.Application {
    return this.app;
}


}


class PixiCreater extends PixiImplementer {

    constructor() {
        super();
        this.appendView();
        this.app.stage.sortableChildren = true;
        console.log("its called");

    }

    public appendView() : void {
        this.appElement.appendChild(this.app.view);
    }

}


class PixiManager {

    private pixiCreater : PixiCreater = new PixiCreater();
    private pixiImplementer : PixiImplementer = new PixiImplementer();
    private sprites: PIXI.Sprite[] = new Array<PIXI.Sprite>();
    private backgroundSprite: any ;
    private baseLocationY = this.pixiImplementer.baseLocationY;
    private baseLocationX = this.pixiImplementer.baseLocationX;


    public setSprites(picPaths: Array<string> | string) : void {
        if(Array.isArray(picPaths)) {
            this.sprites = this.pixiCreater.getSprites(picPaths);
        } else {
            this.backgroundSprite = this.pixiCreater.getSprites(picPaths);

        }

    }

    private getAdditionAngle() {
        return 360 / this.sprites.length;
    }

    private getAtan2(sprite : PIXI.Sprite) {
        return Math.atan2(sprite.y - this.pixiImplementer.baseLocationY, sprite.x - this.pixiImplementer.baseLocationX);
    }



    public setSpriteProperty(locationX: number = this.pixiImplementer.baseLocationX, locationY : number = this.pixiImplementer.baseLocationY) {
        let additionAngle = this.getAdditionAngle();
        let degree = 0;

        this.sprites[0].x = locationX ;
        this.sprites[0].y = locationY + this.pixiImplementer.r;
        let atan2: number = this.getAtan2(this.sprites[0]);
        for(let i = 0; i < this.sprites.length; i++){

            let radian = degree * (Math.PI / 180);
            this.sprites[i].interactive = true;
            this.sprites[i].buttonMode  = true;
            this.sprites[i].x = locationX  + this.pixiImplementer.r * Math.cos( atan2 + radian);
            this.sprites[i].y = locationY  + this.pixiImplementer.r * Math.sin(atan2 + radian ) / 3.2;
            this.sprites[i].anchor.set(0.5, 0.5);
            let additionDepth = ((this.sprites[0].y - this.sprites[i].y) / 1000) ;
            this.sprites[i].scale.set(1.0 - (additionDepth  * 4), 1.0 - (additionDepth * 4));
            this.sprites[i].zIndex = this.sprites[i].y;
            degree += additionAngle;


        }

            // this.sprites[0].on('pointerdown', this.onPicPointerDown).on('pointerup', this.onPicPointerUp).on('pointermove', this.movePic);

    }





//   private  showAlert(e: any) {
// console.log(e);
// alert("is clicked");
//     }

    public addChilds() {
try {
                       for(let i = 0; i < this.sprites.length; i++) {
                       this.pixiCreater.app.stage.addChild(this.sprites[i]);
}
} catch (error) {
    console.assert(error.message);
}




}
public getAppInstance() {
    return this.pixiCreater.app;
        }
public getSprites() {
        return this.sprites;
}

}

let images = ['../images/1.png', '../images/2.png', '../images/3.png', '../images/ball.png', '../images/buta.png'];



class PixiMaker {

    private pixiManager : PixiManager = new PixiManager();
    private readonly picPaths: Array<string>;
    private readonly backgroundPicPath: string;


    constructor(picPaths : Array<string>, backgroundPicPath: string) {
        this.picPaths = picPaths;
        this.backgroundPicPath = backgroundPicPath;
    }

    public drawCanvas() {
        this.drawSprites();
        // this.drawBackground();
        this.pixiManager.addChilds();
    }

    private drawSprites() {
        this.pixiManager.setSprites(this.picPaths);
        this.pixiManager.setSpriteProperty();
    }
    public getAppInstances() {
return this.pixiManager.getAppInstance();
    }

    public getSprites() {
        return this.pixiManager.getSprites();
}
}

const pixiMaker: PixiMaker = new PixiMaker(images, images[0]);
pixiMaker.drawCanvas();

let app = pixiMaker.getAppInstances();
let sprites = pixiMaker.getSprites();

for (let i = 0; i < sprites.length; i++){
    sprites[i].on('pointerdown', test).on('pointerup', test2);
}

// for( let i = 0; i < sprites.length ; i ++) {
//     sprites[i].on('pointerdown', test).on('pointerup', test2).on('pointermove', moveTest);
// }


function test(e: any) {
    console.log("is clicked", sprites[0]);
e.target.on('pointermove', moveTest);
      // e.data.on('pointermove', moveTest);



}

function test2(e: any) {
    console.log("is click up");
}

    function getAtan2(sprite : PIXI.Sprite) {
        return Math.atan2(sprite.y - this.pixiImplementer.baseLocationY, sprite.x - this.pixiImplementer.baseLocationX);
    }
const baseLocationX = window.innerWidth / 2;
const baseLocationY = window.innerHeight / 2;
const r: number = 100;

function moveTest(e : any ) {
// console.log("is moving");
// console.log("is moving", baseLocationY);
// console.log("is moving" , e.data.getLocalPosition(app.stage));
let picLocalPosition = e.data.getLocalPosition(app.stage);

let atan2 = Math.atan2(picLocalPosition.y - baseLocationY, picLocalPosition.x - baseLocationX);
for(let i =0; i < sprites.length; i++){

    let positionDegree = (360 / sprites.length) * i;
    let radian = positionDegree * (Math.PI / 180);
    sprites[i].y = baseLocationY + r * Math.sin(atan2 - radian) / 3.2;
    sprites[i].x = baseLocationX + r * Math.cos(atan2 - radian);
       let additionDepth = ((baseLocationY- sprites[i].y) / 1000) ;
            sprites[i].scale.set(1.0 - (additionDepth  * 5), 1.0 - (additionDepth * 5));
            sprites[i].zIndex = sprites[i].y;
}

}




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

console.log(typeof app);
console.log(typeof sprites);





let container1 = new PIXI.Container();
container1.x = 100;
container1.y = window.screen.height;
// app.stage.addChild(container1);
app.stage.sortableChildren = true;
let background = new PIXI.Graphics()
.beginFill(0xffff00)
.drawRect(0,0,400,window.screen.height)
.endFill();
background.zIndex = 11;

let standPosition = new PIXI.Graphics()
    .beginFill(0xfffffff)
    .drawCircle(baseLocationX, baseLocationY , 50 )
    .endFill();
standPosition.zIndex = 15;
console.log(standPosition.zIndex);

app.stage.addChild(background);
app.stage.addChild(standPosition);
let tt = new Array<DisplayObject>();

for( let i = 0; i < app.stage.children.length; i++) {
    tt.push(app.stage.getChildAt(i));
}

console.log(tt , "gdgd");



class EventManager extends PixiImplementer {

    private sprites: PIXI.Sprite[];
    constructor(sprites: Array<PIXI.Sprite>) {
        super();
        this.sprites = sprites;
    }

    public setEvent(){
        for(let i =0; i < this.sprites.length; i++) {
            sprites[i].on('pointerdown', this.test).on('pointerup', this.test2).on('pointermove', this.moveTest);
        }
    }

    private test(e: any) {
        let fds = this.sprites[0];
        console.log(fds.y);
    }
    private test2(e: any) {

    }
    private moveTest(e: any) {

    }
}



//
// let test = PIXI.Texture.from(images[0]);
// let spr = new PIXI.Sprite(test);
//
// let app = new PIXI.Application({
//      width: 600,     // スクリーン(ビュー)横幅
//     height: 600,
// });
//
// spr.setTransform(window.screen.width, window.screen.height);
// let el = document.getElementById('app');
// el.appendChild(app.view);
//
// app.stage.addChild(spr);