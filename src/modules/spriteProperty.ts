import * as PIXI from "pixi.js";

export interface SpriteProperty {

    //Base location of circle.
    readonly baseLocationX: number;
    readonly baseLocationY: number;

    //Circle radius.
    readonly r: number;

    //Character Sprite Objects.
    characterSprites: Array<PIXI.Sprite>;

    //BackgroundSprite Object.
    backgroundSprite: PIXI.Sprite;

    //If is true, can add Listener on Sprite object.
    isInteractive: boolean;

    //If is ture, you can click or touch Sprite object.
    isButtonMode: boolean;

    //First Sprite object atan2 in radian.
    firstSpriteAtan2: number;

    //For add depth Sprite Objects.
    additionDepth: number;

    //Relative paths.
    characterImagePaths: Array<string>;

    //CharacterIds on database.
    characterIds?: Array<string>;

    additionAngle?: number;
}