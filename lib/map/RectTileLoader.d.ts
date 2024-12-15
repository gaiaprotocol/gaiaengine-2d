import Coordinates from "../core/Coordinates.js";
import GameObject from "../core/GameObject.js";
import TileRange from "./TileRange.js";
interface RectTileLoaderOptions {
    extraTileLoadWidth?: number;
    extraTileLoadHeight?: number;
    onLoadTiles: (coordinates: Coordinates[]) => void;
    onDeleteTiles: (coordinates: Coordinates[]) => void;
    onTileRangeChanged: (range: TileRange) => void;
}
export default class RectTileLoader extends GameObject {
    protected tileSize: number;
    private options;
    private prevCameraX?;
    private prevCameraY?;
    private prevCameraScale?;
    private startTileX?;
    private endTileX?;
    private startTileY?;
    private endTileY?;
    constructor(tileSize: number, options: RectTileLoaderOptions);
    private loadTilesInViewport;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=RectTileLoader.d.ts.map