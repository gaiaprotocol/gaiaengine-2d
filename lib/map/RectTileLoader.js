import { Debouncer } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
export default class RectTileLoader extends GameObject {
    tileSize;
    options;
    prevCameraX;
    prevCameraY;
    prevCameraScale;
    startTileX;
    endTileX;
    startTileY;
    endTileY;
    loadTilesDebouncer;
    constructor(tileSize, options) {
        super(0, 0);
        this.tileSize = tileSize;
        this.options = options;
        if (options.debounceDelay) {
            this.loadTilesDebouncer = new Debouncer(options.debounceDelay, () => this.loadTiles());
        }
    }
    loadTiles() {
        if (this.screen) {
            const cameraScale = this.screen.camera.scale;
            const extraLoadTileCount = this.options.extraLoadTileCount ?? 0;
            const halfScreenWidth = this.screen.width / cameraScale / 2;
            const halfScreenHeight = this.screen.height / cameraScale / 2;
            const boundLeft = this.screen.camera.getX() - halfScreenWidth;
            const boundRight = this.screen.camera.getX() + halfScreenWidth;
            const boundTop = this.screen.camera.getY() - halfScreenHeight;
            const boundBottom = this.screen.camera.getY() + halfScreenHeight;
            const startTileX = Math.floor((boundLeft + this.tileSize / 2) / this.tileSize) - extraLoadTileCount;
            const endTileX = Math.floor((boundRight + this.tileSize / 2) / this.tileSize) + extraLoadTileCount;
            const startTileY = Math.floor((boundTop + this.tileSize / 2) / this.tileSize) - extraLoadTileCount;
            const endTileY = Math.floor((boundBottom + this.tileSize / 2) / this.tileSize) + extraLoadTileCount;
            if (startTileX !== this.startTileX ||
                endTileX !== this.endTileX ||
                startTileY !== this.startTileY ||
                endTileY !== this.endTileY) {
                const toDeleteCoordinates = [];
                if (this.startTileX !== undefined &&
                    this.endTileX !== undefined &&
                    this.startTileY !== undefined &&
                    this.endTileY !== undefined) {
                    for (let x = this.startTileX; x <= this.endTileX; x++) {
                        for (let y = this.startTileY; y <= this.endTileY; y++) {
                            toDeleteCoordinates.push({ x, y });
                        }
                    }
                }
                const toLoadCoordinates = [];
                for (let x = startTileX; x <= endTileX; x++) {
                    for (let y = startTileY; y <= endTileY; y++) {
                        const index = toDeleteCoordinates.findIndex((coord) => coord.x === x && coord.y === y);
                        if (index !== -1) {
                            toDeleteCoordinates.splice(index, 1);
                        }
                        else {
                            toLoadCoordinates.push({ x, y });
                        }
                    }
                }
                if (toLoadCoordinates.length > 0) {
                    this.options.onLoadTiles(toLoadCoordinates);
                }
                if (toDeleteCoordinates.length > 0) {
                    this.options.onDeleteTiles(toDeleteCoordinates);
                }
                if (toLoadCoordinates.length > 0 || toDeleteCoordinates.length > 0) {
                    this.options.onTileRangeChanged({
                        startX: startTileX,
                        startY: startTileY,
                        endX: endTileX,
                        endY: endTileY,
                    });
                }
                this.startTileX = startTileX;
                this.endTileX = endTileX;
                this.startTileY = startTileY;
                this.endTileY = endTileY;
            }
        }
    }
    isTileInCurrentRange(x, y) {
        if (this.startTileX === undefined ||
            this.endTileX === undefined ||
            this.startTileY === undefined ||
            this.endTileY === undefined) {
            return false;
        }
        return (x >= this.startTileX &&
            x <= this.endTileX &&
            y >= this.startTileY &&
            y <= this.endTileY);
    }
    update(deltaTime) {
        if (this.screen) {
            const cameraScale = this.screen.camera.scale;
            if (this.screen.camera.getX() !== this.prevCameraX ||
                this.screen.camera.getY() !== this.prevCameraY ||
                cameraScale !== this.prevCameraScale) {
                this.loadTilesDebouncer
                    ? this.loadTilesDebouncer.execute()
                    : this.loadTiles();
                this.prevCameraX = this.screen.camera.getX();
                this.prevCameraY = this.screen.camera.getY();
                this.prevCameraScale = cameraScale;
            }
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=RectTileLoader.js.map