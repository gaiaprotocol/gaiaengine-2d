import Coordinates from "../core/Coordinates.js";
import GameObject from "../core/GameObject.js";
interface RectTileLoaderOptions {
    extraLoadTileCount?: number;
    debounceDelay?: number;
    onLoadTiles: (coordinates: Coordinates[]) => void;
    onDeleteTiles: (coordinates: Coordinates[]) => void;
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
    private loadTilesDebouncer?;
    constructor(tileSize: number, options: RectTileLoaderOptions);
    private loadTiles;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=RectTileLoader.d.ts.map