import RectTileLoader from "./RectTileLoader.js";
interface RectTileData {
}
interface RectTerrainLoaderOptions {
    tileSize: number;
    extraTileLoadWidth?: number;
    extraTileLoadHeight?: number;
    loadTiles: (cords: {
        row: number;
        col: number;
    }[]) => Promise<RectTileData[]>;
    onDeletedTiles?: (cords: {
        row: number;
        col: number;
    }[]) => void;
}
export default class RectTerrainLoader extends RectTileLoader {
    private options;
    private loadingTiles;
    private tiles;
    constructor(options: RectTerrainLoaderOptions);
    private renderTile;
    private renderTerrain;
    private loadTiles;
    private deleteTiles;
}
export {};
//# sourceMappingURL=RectTerrainLoader.d.ts.map