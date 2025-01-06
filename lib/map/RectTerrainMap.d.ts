import Coordinates from "../core/Coordinates.js";
import Atlas from "../data/Atlas.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
import TileRange from "./TileRange.js";
interface AtlasInfo {
    src: string;
    atlas: Atlas;
}
interface SpriteInfo {
    spritesheet: string;
    frame?: string;
    animation?: string;
    fps?: number;
    zIndex: number;
}
type TerrainDefinition = {
    [direction in TerrainDirection]?: SpriteInfo[];
};
interface TerrainDefinitions {
    [terrainId: string]: TerrainDefinition;
}
interface ObjectDefinitions {
    [objectId: string]: SpriteInfo;
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
    onTileRangeChanged?: (range: TileRange) => void;
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
        [id: string]: AtlasInfo;
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