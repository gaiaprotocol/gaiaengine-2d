import { SpritesheetData } from "pixi.js";
import Coordinates from "../core/Coordinates.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
interface SpritesheetInfo {
    src: string;
    atlas: SpritesheetData;
}
interface TerrainFrame {
    spritesheet: string;
    frame: string;
    zIndex: number;
}
type TerrainFramesByDirection = {
    [direction in TerrainDirection]?: TerrainFrame[];
};
interface TerrainDefinitions {
    [terrainId: string]: TerrainFramesByDirection;
}
interface ObjectDefinitions {
    [objectId: string]: TerrainFrame;
}
interface MapObject {
    x: number;
    y: number;
    objectId: string;
}
export interface RectTerrainMapOptions {
    extraLoadTileCount?: number;
    debounceDelay?: number;
    tileFadeDuration?: number;
    onLoadTiles?: (coordinates: Coordinates[]) => void;
    onDeleteTiles?: (coordinates: Coordinates[]) => void;
}
export default class RectTerrainMap extends RectTileLoader {
    private spritesheets;
    private terrains;
    private objects;
    private terrainMap;
    private mapObjects;
    private _options;
    private tiles;
    private spritesheetsLoaded;
    constructor(tileSize: number, spritesheets: {
        [id: string]: SpritesheetInfo;
    }, terrains: TerrainDefinitions, objects: ObjectDefinitions, terrainMap: {
        [coordinateKey: string]: string;
    }, mapObjects: MapObject[], _options?: RectTerrainMapOptions);
    private loadSpritesheets;
    private createCoordinateKey;
    private getTerrainAt;
    private getNeighborTerrains;
    private renderTerrain;
    private renderTile;
    private renderSurroundingTerrains;
    private deleteTile;
    protected update(deltaTime: number): void;
    remove(): void;
}
export {};
//# sourceMappingURL=RectTerrainMap.d.ts.map