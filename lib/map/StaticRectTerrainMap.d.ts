import { SpritesheetData } from "pixi.js";
import RectTerrainLoader from "./RectTerrainLoader.js";
export default class StaticRectTerrainMap extends RectTerrainLoader {
    constructor(tileSize: number, spritesheets: {
        [id: string]: {
            src: string;
            atlas: SpritesheetData;
        };
    }, terreins: {
        [id: string]: {
            [direction: string]: {
                spritesheet: string;
                frame: string;
            }[];
        };
    }, terrainMap: {
        [cord: string]: string;
    }, objects: {
        x: number;
        y: number;
        spritesheet: string;
        frame: string;
    }[]);
}
//# sourceMappingURL=StaticRectTerrainMap.d.ts.map