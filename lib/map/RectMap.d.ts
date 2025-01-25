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
    private altases;
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
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=RectMap.d.ts.map