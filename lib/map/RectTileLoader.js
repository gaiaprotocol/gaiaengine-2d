import Node from "../base/Node.js";
export default class RectTileLoader extends Node {
    _o;
    prevCameraX;
    prevCameraY;
    prevWorldScale;
    startTileRow;
    endTileRow;
    startTileCol;
    endTileCol;
    constructor(_o) {
        super(0, 0);
        this._o = _o;
    }
    loadTilesInViewport(boundLeft, boundRight, boundTop, boundBottom) {
        const startTileRow = Math.floor(boundTop / this._o.tileSize);
        const endTileRow = Math.ceil(boundBottom / this._o.tileSize);
        const startTileCol = Math.floor(boundLeft / this._o.tileSize);
        const endTileCol = Math.ceil(boundRight / this._o.tileSize);
        if (startTileRow !== this.startTileRow ||
            endTileRow !== this.endTileRow ||
            startTileCol !== this.startTileCol ||
            endTileCol !== this.endTileCol) {
            const toDeleteCords = [];
            if (this.startTileRow !== undefined &&
                this.endTileRow !== undefined &&
                this.startTileCol !== undefined &&
                this.endTileCol !== undefined) {
                for (let row = this.startTileRow; row < this.endTileRow; row++) {
                    for (let col = this.startTileCol; col < this.endTileCol; col++) {
                        toDeleteCords.push({ row, col });
                    }
                }
            }
            const toLoadCords = [];
            for (let row = startTileRow; row < endTileRow; row++) {
                for (let col = startTileCol; col < endTileCol; col++) {
                    const index = toDeleteCords.findIndex((cord) => cord.row === row && cord.col === col);
                    if (index !== -1)
                        toDeleteCords.splice(index, 1);
                    else
                        toLoadCords.push({ row, col });
                }
            }
            if (toLoadCords.length > 0)
                this._o.loadTiles(toLoadCords);
            if (toDeleteCords.length > 0)
                this._o.deleteTiles(toDeleteCords);
            this.startTileRow = startTileRow;
            this.endTileRow = endTileRow;
            this.startTileCol = startTileCol;
            this.endTileCol = endTileCol;
        }
    }
    update(deltaTime) {
        if (this.screen) {
            const worldScale = this.screen.root.scale;
            if (this.screen.camera.x !== this.prevCameraX ||
                this.screen.camera.y !== this.prevCameraY ||
                worldScale !== this.prevWorldScale) {
                const extraTileLoadWidth = this._o.extraTileLoadWidth ?? 0;
                const extraTileLoadHeight = this._o.extraTileLoadHeight ?? 0;
                const halfScreenWidth = this.screen.width / 2 + extraTileLoadWidth;
                const halfScreenHeight = this.screen.height / 2 + extraTileLoadHeight;
                this.loadTilesInViewport((this.screen.camera.x - halfScreenWidth) / worldScale, (this.screen.camera.x + halfScreenWidth) / worldScale, (this.screen.camera.y - halfScreenHeight) / worldScale, (this.screen.camera.y + halfScreenHeight) / worldScale);
                this.prevCameraX = this.screen.camera.x;
                this.prevCameraY = this.screen.camera.y;
                this.prevWorldScale = worldScale;
            }
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=RectTileLoader.js.map