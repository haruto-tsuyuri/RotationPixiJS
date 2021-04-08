import * as PIXI from "pixi.js";

export interface PixiProperty {
    app: PIXI.Application;
    width: number;
    height: number;
    canvasId: string;
    appElement: HTMLElement;
}