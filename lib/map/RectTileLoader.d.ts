import GameObject from "../core/GameObject.js";
interface Coordinate {
    row: number;
    col: number;
}
interface RectTileLoaderOptions {
    extraTileLoadWidth?: number;
    extraTileLoadHeight?: number;
    loadTiles: (coordinates: Coordinate[]) => void;
    deleteTiles: (coordinates: Coordinate[]) => void;
}
export default class RectTileLoader extends GameObject {
    protected tileSize: number;
    private options;
    private prevCameraX?;
    private prevCameraY?;
    private prevCameraScale?;
    private startTileRow?;
    private endTileRow?;
    private startTileCol?;
    private endTileCol?;
    constructor(tileSize: number, options: RectTileLoaderOptions);
    private loadTilesInViewport;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=RectTileLoader.d.ts.map