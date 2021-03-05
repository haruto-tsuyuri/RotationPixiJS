import {PixiManager} from "./pixiManager";

class PixiMaker {
    private readonly pixiManager: PixiManager;
    private readonly imagePaths: { [imagePath: string]: string; };
    private readonly backgroundImagePath: string;
    private readonly basePath: string;

    constructor(imagePaths: { [imagePath: string]: string; }, backgroundImagePath: string, basePath: string) {
        this.imagePaths = imagePaths;
        this.backgroundImagePath = backgroundImagePath;
        this.basePath = basePath;
        this.pixiManager = new PixiManager(this.imagePaths, this.backgroundImagePath, this.basePath);
    }

    /**
     * Facade of pixiManager class.
     */
    public run(): void {
        this.pixiManager.setCharacterSpritesProperty();
        this.pixiManager.setBackgroundSpriteProperty();
        this.pixiManager.addListenerOnCharacterSprites();
        this.pixiManager.addCharacterSprites();
        this.pixiManager.addBackgroundSprite();
    }
}


let images = ['../images/1.png', '../images/2.png', '../images/3.png', '../images/MIREI.png', '../images/4.png'];
let ids = ['2', '3', '4', '5', '2'];
const bgImagePath = '../images/bg.png';

let testDict: { [imagePath: string]: string; } = {};

images.forEach((value, index) => {
    testDict[value] = ids[index];
});

let basePath = "http://bu-tama.jp/monstar/status?uCharaId=";

let test = new PixiMaker(testDict, bgImagePath, basePath);
test.run();

console.log("tete!!");