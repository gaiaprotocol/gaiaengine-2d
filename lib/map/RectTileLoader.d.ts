import Node from "../base/Node.js";
interface RectTileMapOptions {
    extraTileLoadWidth?: number;
    extraTileLoadHeight?: number;
    loadTiles: (cords: {
        row: number;
        col: number;
    }[]) => void;
    deleteTiles: (cords: {
        row: number;
        col: number;
    }[]) => void;
}
export default class RectTileLoader extends Node {
    protected tileSize: number;
    private options;
    private prevCameraX;
    private prevCameraY;
    private prevCameraScale;
    protected startTileRow: number | undefined;
    protected endTileRow: number | undefined;
    protected startTileCol: number | undefined;
    protected endTileCol: number | undefined;
    constructor(tileSize: number, options: RectTileMapOptions);
    private loadTilesInViewport;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=RectTileLoader.d.ts.map