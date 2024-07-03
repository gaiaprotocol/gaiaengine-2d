import Node from "../base/Node.js";
export default class RectTileLoader extends Node {
    options;
    prevCameraX;
    prevCameraY;
    prevWorldScale;
    prevStartTileRow;
    prevEndTileRow;
    prevStartTileCol;
    prevEndTileCol;
    constructor(options) {
        super(0, 0);
        this.options = options;
    }
    loadTilesInViewport(boundLeft, boundRight, boundTop, boundBottom) {
        const startTileRow = Math.floor(boundTop / this.options.tileSize);
        const endTileRow = Math.ceil(boundBottom / this.options.tileSize);
        const startTileCol = Math.floor(boundLeft / this.options.tileSize);
        const endTileCol = Math.ceil(boundRight / this.options.tileSize);
        if (startTileRow !== this.prevStartTileRow ||
            endTileRow !== this.prevEndTileRow ||
            startTileCol !== this.prevStartTileCol ||
            endTileCol !== this.prevEndTileCol) {
            const toDeleteCords = [];
            if (this.prevStartTileRow !== undefined &&
                this.prevEndTileRow !== undefined &&
                this.prevStartTileCol !== undefined &&
                this.prevEndTileCol !== undefined) {
                for (let r = this.prevStartTileRow; r < this.prevEndTileRow; r++) {
                    for (let c = this.prevStartTileCol; c < this.prevEndTileCol; c++) {
                        toDeleteCords.push({ row: r, col: c });
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
            this.options.loadTiles(toLoadCords);
            this.options.deleteTiles(toDeleteCords);
            this.prevStartTileRow = startTileRow;
            this.prevEndTileRow = endTileRow;
            this.prevStartTileCol = startTileCol;
            this.prevEndTileCol = endTileCol;
        }
    }
    update(deltaTime) {
        if (this.screen) {
            const worldScale = this.screen.root.scale;
            if (this.screen.camera.x !== this.prevCameraX ||
                this.screen.camera.y !== this.prevCameraY ||
                worldScale !== this.prevWorldScale) {
                const extraTileLoadWidth = this.options.extraTileLoadWidth ?? 0;
                const extraTileLoadHeight = this.options.extraTileLoadHeight ?? 0;
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
//# sourceMappingURL=RectTileMap.js.map