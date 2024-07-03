import Node from "../base/Node.js";
interface RectTileMapOptions {
    tileSize: number;
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
    private options;
    private prevCameraX;
    private prevCameraY;
    private prevWorldScale;
    private prevStartTileRow;
    private prevEndTileRow;
    private prevStartTileCol;
    private prevEndTileCol;
    constructor(options: RectTileMapOptions);
    private loadTilesInViewport;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=RectTileLoader.d.ts.map