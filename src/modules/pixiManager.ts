import * as PIXI from "pixi.js";
import {SpriteProperty} from "./spriteProperty";
import {PixiProperty} from "./pixiProperty";

class PixiManager implements PixiProperty, SpriteProperty {

    //Implements PixiProperty.
    app: PIXI.Application;
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    canvasId: string = 'app';
    appElement: HTMLElement = document.getElementById(this.canvasId);

    //Implements SpriteProperty
    additionAngle: number;

    // always half of screen.
    baseLocationX = this.width / 2;
    baseLocationY = this.height / 2 + 70;

    characterSprites: Array<PIXI.Sprite> = new Array<PIXI.Sprite>();
    backgroundSprite: PIXI.Sprite;
    isInteractive: boolean = true;
    isButtonMode: boolean = true;
    firstSpriteAtan2: number;
    additionDepth: number;
    r: number = 100;
    // r: number = innerWidth / 3.5;
    characterImagePaths: Array<string>;
    characterIds: Array<string>;

    private readonly basePath: string;
    private isDragged: boolean = false;

    /**
     * 360度をsprites objectの長さで割る
     * @return(number)
     */
    private getAdditionAngle(): number {

        return 360 / this.characterSprites.length;
    }

    protected getBackgroundSprite(imagePath: string): PIXI.Sprite {
        return PIXI.Sprite.from(imagePath);
    }

    constructor(imagePaths: { [imagePath: string]: string; }, backgroundImagePath: string, basePath: string) {
        this.basePath = basePath;
        this.characterIds = Object.values(imagePaths);
        this.characterImagePaths = Object.keys(imagePaths);
        this.characterSprites = this.getSprites(Object.keys(imagePaths)); // get sprite array not yet add PIXIjs application.
        this.backgroundSprite = this.getBackgroundSprite(backgroundImagePath);
        this.app = new PIXI.Application( // create PIXIjs application.
            {
                width: this.width,
                height: this.height,
            }
        );
        this.app.stage.sortableChildren = true;
        this.appendView(); // append view in the html canvasId.
    }

    protected getSprites(imagePaths: Array<string>) {
        let spriteObjects = new Array<PIXI.Sprite>();
        for (let imagePath of imagePaths) {
            spriteObjects.push(PIXI.Sprite.from(imagePath));
        }
        return spriteObjects;
    }


    public sortSprites() {
        switch (true) {
            case (this.characterSprites[0].x < this.baseLocationX): // left swap
                let last = this.characterSprites.pop();
                this.characterSprites.unshift(last);
                break;
            case (this.characterSprites[0].x > this.baseLocationX): // right swap
                let first = this.characterSprites.shift();
                this.characterSprites.push(first);
                break;
            default:
                break;
        }

    }


    private getAtan2(sprite: PIXI.Sprite): number {
        return Math.atan2(sprite.y - this.baseLocationY, sprite.x - this.baseLocationX);
    }

    public setCharacterSpritesProperty() {
        // Find the reference angle according to the number of characterSprites.
        let additionAngle = this.getAdditionAngle();
        console.log("tt" + additionAngle);
        let currentAngle = 0;
        this.characterSprites[0].y = this.baseLocationY + this.r;
        this.characterSprites[0].x = this.baseLocationX
        let atan2: number = this.getAtan2(this.characterSprites[0]);

        for (let sprite of this.characterSprites) {
            let spriteIndex = this.characterSprites.indexOf(sprite);
            let currentRadian = this.getRadian(currentAngle);
            sprite.interactive = this.isInteractive;
            sprite.buttonMode = this.isButtonMode;
            sprite.x = this.baseLocationX + this.r * Math.cos(atan2 + currentRadian) / 0.7;
            sprite.y = this.baseLocationY + this.r * Math.sin(atan2 + currentRadian) / 2.2;
            sprite.anchor.set(0.5, 0.5);
            // let additionDepth = ((this.characterSprites[0].y - sprite.y) / 1500);
            // sprite.scale.set((1.0 - (additionDepth * 4)) / 2, (1.0 - (additionDepth * 4)) / 2);
            sprite.scale.set(1.0 / (((this.baseLocationY + this.r) - sprite.y) / 27), 1.0 / (((this.baseLocationY + this.r) - sprite.y) / 27));
            sprite.zIndex = sprite.y;
            currentAngle += additionAngle;
            if (sprite.name == null) {
                sprite.name = this.characterIds[spriteIndex];
            }
            this.addGreyScale(sprite);
            console.log(sprite.name);
        }
    }

    public addBackgroundSprite(): void {
        this.app.stage.addChild(this.backgroundSprite);
    }

    public setBackgroundSpriteProperty(): void {
        //Set scale.
        this.backgroundSprite.scale.set(1, 1);
        console.log(this.backgroundSprite.x, this.backgroundSprite.y);
        //Set zIndex always -1
        this.backgroundSprite.zIndex = -1;
    }

    protected draw(): void {
        this.sortSprites();
        this.setCharacterSpritesProperty();
    }

    public run(): void {
        this.setCharacterSpritesProperty();
        this.setBackgroundSpriteProperty();
        this.addListenerOnCharacterSprites();
        this.addCharacterSprites();
        this.addBackgroundSprite();
    }

    public addListenerOnCharacterSprites(): void {

        for (let sprite of this.characterSprites) {
            sprite
                .on('pointerdown', (e: any) => this.onClick(e))
                .on('pointerup', (e: any) => this.test2(e));
        }
    }

    protected onClick(e: any): void {

        console.log("is clicked");
        e.target.on('pointermove', (e: any) => this.onMove(e));

    }

    protected addGreyScale(characterSprite: PIXI.Sprite): void {
        let isNotFirstCharacter = this.characterSprites.indexOf(characterSprite) !== 0;
        let colorMatrix = new PIXI.filters.ColorMatrixFilter();
        if (isNotFirstCharacter) {

            characterSprite.filters = [colorMatrix];
            colorMatrix.brightness(1.0 - (((this.baseLocationY + this.r) - characterSprite.y) / 1000), false);
        } else {
            characterSprite.filters = [colorMatrix];
            colorMatrix.brightness(1.0, false);
        }
    }

    protected onMove(e: any): void {

        this.isDragged = true;
        let picLocalPosition = e.data.getLocalPosition(this.app.stage);
        let atan2 = Math.atan2(picLocalPosition.y - this.baseLocationY, picLocalPosition.x - this.baseLocationX);
        for (let sprite of this.characterSprites) {
            // Angle that corresponds to the order of sprite.
            let positionDegree = (360 / this.characterSprites.length) * this.characterSprites.indexOf(sprite);
            let radian = positionDegree * (Math.PI / 180);
            sprite.y = this.baseLocationY + this.r * Math.sin(atan2 + radian) / 2.2;
            sprite.x = this.baseLocationX + this.r * Math.cos(atan2 + radian) / 0.7;
            sprite.zIndex = sprite.y;
            sprite.scale.set(1.0 / (((this.baseLocationY + this.r) - sprite.y) / 28), 1.0 / (((this.baseLocationY + this.r) - sprite.y) / 28));

        }
    }

    protected test2(e: any): void {
        if (this.isDragged == false) {
            location.href = this.basePath + e.target.name;
        } else {
            this.isDragged = false;
        }
        this.characterSprites[0].removeListener("pointermove", this.onMove);
        this.draw();
    }

    public addCharacterSprites(): void {
        for (let sprite of this.characterSprites) {
            this.app.stage.addChild(sprite);
        }
    }

    protected appendView(): void {
        this.appElement.appendChild(this.app.view);
    }

    protected getRadian(currentAngle: number): number {
        return currentAngle * (Math.PI / 180);
    }
}

// let images = ['../images/1.png', '../images/2.png', '../images/3.png', '../images/MIREI.png', '../images/4.png'];
// let ids = ['2', '3', '4', '5', '2'];
// const bgImagePath = '../images/bg.png';
// // let images = ['../images/3.png', '../images/MIREI.png', '../images/4.png'];
//
// let testDict: { [imagePath: string]: string; } = {};
//
// images.forEach((value, index) => {
//     testDict[value] = ids[index];
// });
//
// console.log(testDict);
// let basePath = "http://bu-tama.jp/monstar/status?uCharaId=";
// let test = new PixiManager(testDict, bgImagePath, basePath);
// test.run();