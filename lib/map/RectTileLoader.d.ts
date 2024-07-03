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
    private _o;
    private prevCameraX;
    private prevCameraY;
    private prevWorldScale;
    protected startTileRow: number | undefined;
    protected endTileRow: number | undefined;
    protected startTileCol: number | undefined;
    protected endTileCol: number | undefined;
    constructor(_o: RectTileMapOptions);
    private loadTilesInViewport;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=RectTileLoader.d.ts.map