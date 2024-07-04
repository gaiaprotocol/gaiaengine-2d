import { SpritesheetData } from "pixi.js";
import RectTileLoader from "./RectTileLoader.js";
interface RectTerrainMapOptions {
    extraTileLoadWidth?: number;
    extraTileLoadHeight?: number;
}
export default class RectTerrainMap extends RectTileLoader {
    private spritesheets;
    private terrains;
    private terrainMap;
    private objects;
    private tileNodes;
    private spritesheetLoaded;
    constructor(tileSize: number, spritesheets: {
        [id: string]: {
            src: string;
            atlas: SpritesheetData;
        };
    }, terrains: {
        [id: string]: {
            [direction: string]: {
                spritesheet: string;
                frame: string;
                zIndex: number;
            }[];
        };
    }, terrainMap: {
        [cord: string]: string;
    }, objects: {
        x: number;
        y: number;
        zIndex: number;
        spritesheet: string;
        frame: string;
    }[], options?: RectTerrainMapOptions);
    private loadSpritesheets;
    private renderTerrain;
    private renderTile;
    private deleteTile;
    protected update(deltaTime: number): void;
    delete(): void;
}
export {};
//# sourceMappingURL=RectTerrainMap.d.ts.map