import Coordinates from "../core/Coordinates.js";
import MapData from "./MapData.js";
import RectTileLoader from "./RectTileLoader.js";
import TileRange from "./TileRange.js";
export interface RectMapOptions {
    extraLoadTileCount?: number;
    debounceDelay: number;
    tileFadeDuration?: number;
    onLoadTiles?: (coordinates: Coordinates[]) => void;
    onDeleteTiles?: (coordinates: Coordinates[]) => void;
    onTileRangeChanged?: (range: TileRange) => void;
}
export default class RectMap extends RectTileLoader {
    private spritesheets;
    private mapData;
    private _options;
    private atlases;
    private spritesheetsLoaded;
    private terrainLayer;
    private objectLayer;
    private tiles;
    private objects;
    constructor(tileSize: number, spritesheets: {
        [id: string]: string;
    }, mapData: MapData, _options: RectMapOptions);
    private loadSpritesheets;
    private createCoordinateKey;
    private getTerrainAt;
    private getNeighborTerrains;
    private renderTerrain;
    private renderTile;
    private renderSurroundingTerrains;
    private deleteTile;
    private reloadTile;
    private reloadTileAndNeighbors;
    addTerrain(x: number, y: number, terrainId: string): void;
    removeTerrain(x: number, y: number): void;
    addObject(objectX: number, objectY: number, objectId: string): void;
    removeObject(objectX: number, objectY: number, objectId: string): void;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=RectMap.d.ts.map