import * as PIXI from "pixi.js";
import {SpriteProperty} from "./spriteProperty";
import {PixiProperty} from "./pixiProperty";


export class PixiManager implements PixiProperty, SpriteProperty {

    //Implements PixiProperty.
    app: PIXI.Application;
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    canvasId: string = 'app';
    appElement: HTMLElement = document.getElementById(this.canvasId);

    //Implements SpriteProperty
    additionAngle: number;
    baseLocationX = this.width / 2;
    baseLocationY = this.height / 2;
    characterSprites: Array<PIXI.Sprite> = new Array<PIXI.Sprite>();
    backgroundSprite: PIXI.Sprite;
    isInteractive: boolean = true;
    isButtonMode: boolean = true;
    firstSpriteAtan2: number;
    additionDepth: number;
    r: number;
    characterImagePaths: Array<string>;
    characterIds: Array<string>;

    //Class members.
    private readonly basePath: string;
    private isDragged: boolean = false;
    private readonly isWideScreen: boolean;


    /**
     *
     * @param imagePaths
     * @param backgroundImagePath
     * @param basePath
     */
    constructor(imagePaths: { [imagePath: string]: string; }, backgroundImagePath: string, basePath: string) {
        this.basePath = basePath;
        this.characterIds = Object.values(imagePaths);
        this.characterImagePaths = Object.keys(imagePaths);
        this.characterSprites = this.getSprites(Object.keys(imagePaths)); // get sprite array not yet add PIXIjs application.
        this.backgroundSprite = this.getBackgroundSprite(backgroundImagePath);
        this.isWideScreen = innerWidth > innerHeight;
        this.setRadiusAndBaseLocationY();
        this.app = this.getPixiApp();
        this.appendView();
    }

    /**
     * Set circle radius and y coordinate depending on the screen mode.
     * @private
     */
    private setRadiusAndBaseLocationY() {
        if (this.isWideScreen) {
            this.r = innerHeight / 2 - innerHeight / 5;
            this.baseLocationY -= 30;
        } else {
            this.r = innerWidth / 2 - innerWidth / 5;
            this.baseLocationY += 30;
        }
    }

    /**
     * Set characterSprites property.
     * @public
     */
    public setCharacterSpritesProperty() {
        // Find the reference angle according to the number of characterSprites.
        let additionAngle = this.getAdditionAngle();
        let currentAngle = 0;

        // Give the reference coordinates to the first sprite object.
        this.characterSprites[0].y = this.baseLocationY + this.r;
        this.characterSprites[0].x = this.baseLocationX

        let atan2: number = this.getAtan2(this.characterSprites[0]);

        //Set properties of Sprite.
        for (let sprite of this.characterSprites) {
            let spriteIndex = this.characterSprites.indexOf(sprite);
            let currentRadian = this.getRadian(currentAngle);
            sprite.interactive = this.isInteractive;
            sprite.buttonMode = this.isButtonMode;
            sprite.x = this.baseLocationX + this.r * Math.cos(atan2 + currentRadian) / 0.7;
            sprite.y = this.baseLocationY + this.r * Math.sin(atan2 + currentRadian) / 2.2;
            sprite.anchor.set(0.5, 0.5);
            this.setZIndex(sprite, sprite.y);
            this.setScale(sprite);
            currentAngle += additionAngle;
            if (sprite.name == null) {
                sprite.name = this.characterIds[spriteIndex];
            }
            this.addGreyScale(sprite);
        }
    }

    /**
     * Set zIndex of Sprite object.
     * @param sprite Character Sprite.
     * @param value zIndex number.
     * @protected
     */
    protected setZIndex(sprite: PIXI.Sprite, value: number): void {
        sprite.zIndex = value;
    }


    /**
     * Set backgroundSprite property.
     */
    public setBackgroundSpriteProperty(): void {
        //Set scale.
        this.backgroundSprite.scale.set(1, 1);
        console.log(this.backgroundSprite.x, this.backgroundSprite.y);
        //Set zIndex always backmost.
        this.setZIndex(this.backgroundSprite, -1);
    }

    /**
     * Set scale Sprite.
     * Depending on the screen mode for responsive support.
     * @param sprite Character Sprite object.
     * @private
     */
    private setScale(sprite: PIXI.Sprite): void {
        if (this.isWideScreen) {
            sprite.scale.set(
                innerWidth / 2 / 640 - (((this.baseLocationY + this.r) - sprite.y) / 640)
                , innerHeight / 640 - (((this.baseLocationY + this.r) - sprite.y) / 640)
            );
        } else {
            sprite.scale.set(
                innerWidth / 640 - (((this.baseLocationY + this.r) - sprite.y) / 640)
                , innerHeight / 2 / 640 - (((this.baseLocationY + this.r) - sprite.y) / 640)
            );
        }
    }


    /**
     *
     * @param sprite Character Sprite object.
     * @param radian Radians of object.
     * @protected
     */
    protected setPosition(sprite: PIXI.Sprite, radian: number): void {
        sprite.y = this.baseLocationY + this.r * Math.sin(radian) / 2.2;
        sprite.x = this.baseLocationX + this.r * Math.cos(radian) / 0.7;
    }

    /**
     *
     * @param imagePaths
     * @protected
     * @return spriteObjects Character Sprites.
     */
    protected getSprites(imagePaths: Array<string>): Array<PIXI.Sprite> {
        let spriteObjects = new Array<PIXI.Sprite>();
        for (let imagePath of imagePaths) {
            spriteObjects.push(PIXI.Sprite.from(imagePath));
        }
        return spriteObjects;
    }

    /**
     * Returns Divide 360 degrees by the number of characters.
     * @return number - Addition angle of character Sprite.
     */
    private getAdditionAngle(): number {

        return 360 / this.characterSprites.length;
    }

    /**
     * Returns background Sprite object.
     * @param imagePath Background image path.
     * @protected
     * @return PIXI.Sprite Background Sprite object.
     */
    protected getBackgroundSprite(imagePath: string): PIXI.Sprite {
        return PIXI.Sprite.from(imagePath);
    }

    /**
     * Returns Atan2 between Sprite and base base coordinate.
     * @param sprite
     * @private
     * @return number Atan2
     */
    private getAtan2(sprite: PIXI.Sprite): number {
        return Math.atan2(sprite.y - this.baseLocationY, sprite.x - this.baseLocationX);
    }

    /**
     * Returns convert angle in radian.
     * @param angle
     * @protected
     * @return number Radian of angle
     */
    protected getRadian(angle: number): number {
        return angle * (Math.PI / 180);
    }

    /**
     * Returns PIXI application object.
     * @private
     * @return pixiApp Pixi app that implements the interface
     */
    private getPixiApp(): PIXI.Application {

        const pixiApp = new PIXI.Application( // create PIXIjs application.
            {
                width: this.width,
                height: this.height,
                antialias: true,
                resizeTo: window,
            });

        pixiApp.stage.sortableChildren = true;

        return pixiApp;
    }

    /**
     * Sort sprite array by left / right swap decision
     * @public
     */
    public sortSprites() {
        // First index of character Sprite.
        const firstCharacterSprite = this.characterSprites.filter(x => typeof x !== undefined).shift();

        switch (true) {
            case (firstCharacterSprite.x < this.baseLocationX): // left swap
                let last = this.characterSprites.pop();
                this.characterSprites.unshift(last);
                break;
            case (firstCharacterSprite.x > this.baseLocationX): // right swap
                let first = this.characterSprites.shift();
                this.characterSprites.push(first);
                break;
            default:
                break;
        }

    }

    /**
     * Add child to stage.
     */
    public addBackgroundSprite(): void {
        this.app.stage.addChild(this.backgroundSprite);
    }


    /**
     * Redraw sprite array
     * @protected
     */
    protected reDraw(): void {
        this.sortSprites();
        this.setCharacterSpritesProperty();
    }


    /**
     * Grayscale is given to characters other than the first character.
     * @param characterSprite Character object.
     * @protected
     */
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


    /**
     * Add pointerdown and pointerup listener.
     */
    public addListenerOnCharacterSprites(): void {
        for (let sprite of this.characterSprites) {
            sprite
                .on('pointerdown', (e: any) => this.onClick(e))
                .on('pointerup', (e: any) => this.endMove(e));
        }
    }

    /**
     * If event target clicked or touch ,Add pointermove listener.
     * @param e Event data of Sprite.
     * @protected
     */
    protected onClick(e: any): void {
        console.log("Is clicked");
        e.target.on('pointermove', (e: any) => this.onMove(e));
    }

    /**
     * Processing while moving the pointer.
     * @param e Event data of Sprite.
     * @protected
     */
    protected onMove(e: any): void {
        this.isDragged = true;

        //Event firing coordinates.
        let picLocalPosition = e.data.getLocalPosition(this.app.stage);

        //Atan2 of event firing coordinates between base coordinates.
        let localPositionAtan2 = this.getAtan2(picLocalPosition);

        //Update Sprite properties.
        this.updateSpriteProperties(localPositionAtan2);
    }

    /**
     * Method called while moving the pointer.
     * Update properties of Sprite.
     * @param currentRadian Latest radians moving pointer.
     * @protected
     */
    protected updateSpriteProperties(currentRadian: number) {
        for (let sprite of this.characterSprites) {
            // Angle that corresponds to the order of sprite.
            let positionDegree = (360 / this.characterSprites.length) * this.characterSprites.indexOf(sprite);
            let spriteRadian = positionDegree * (Math.PI / 180);
            let radian = currentRadian + spriteRadian;
            this.setPosition(sprite, radian);
            this.setZIndex(sprite, sprite.y);
            this.setScale(sprite);
        }
    }

    /**
     * Processing when the pointer is removed.
     * Dragged
     * @param e Event data of Sprite.
     * @protected
     */
    protected endMove(e: any): void {
        //If the onMove event has not fired, move to the link destination.
        if (this.isDragged == false) {
            location.href = this.basePath + e.target.name;
        } else {
            this.isDragged = false;
        }
        this.characterSprites[0].removeListener("pointermove", this.onMove);
        this.reDraw(); // Redraw character Sprite.
    }

    /**
     * Add Sprites on PIXI Application stage.
     * @public
     */
    public addCharacterSprites(): void {
        for (let sprite of this.characterSprites) {
            this.app.stage.addChild(sprite);
        }
    }

    /**
     * Append PIXI Application to HTMLElement.
     * @protected
     */
    protected appendView(): void {
        this.appElement.appendChild(this.app.view);
    }
}