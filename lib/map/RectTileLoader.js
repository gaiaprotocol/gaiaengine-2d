import { Debouncer } from "@common-module/ts";
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
            this.loadTilesDebouncer = new Debouncer(options.debounceDelay, (boundLeft, boundRight, boundTop, boundBottom) => this.loadTiles(boundLeft, boundRight, boundTop, boundBottom));
        }
    }
    loadTiles(boundLeft, boundRight, boundTop, boundBottom) {
        const startTileX = Math.floor(boundLeft / this.tileSize);
        const endTileX = Math.ceil(boundRight / this.tileSize);
        const startTileY = Math.floor(boundTop / this.tileSize);
        const endTileY = Math.ceil(boundBottom / this.tileSize);
        if (startTileX !== this.startTileX ||
            endTileX !== this.endTileX ||
            startTileY !== this.startTileY ||
            endTileY !== this.endTileY) {
            const toDeleteCoordinates = [];
            if (this.startTileX !== undefined &&
                this.endTileX !== undefined &&
                this.startTileY !== undefined &&
                this.endTileY !== undefined) {
                for (let x = this.startTileX; x < this.endTileX; x++) {
                    for (let y = this.startTileY; y < this.endTileY; y++) {
                        toDeleteCoordinates.push({ x, y });
                    }
                }
            }
            const toLoadCoordinates = [];
            for (let x = startTileX; x < endTileX; x++) {
                for (let y = startTileY; y < endTileY; y++) {
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
            this.startTileX = startTileX;
            this.endTileX = endTileX;
            this.startTileY = startTileY;
            this.endTileY = endTileY;
        }
    }
    update(deltaTime) {
        if (this.screen) {
            const cameraScale = this.screen.camera.scale;
            if (this.screen.camera.x !== this.prevCameraX ||
                this.screen.camera.y !== this.prevCameraY ||
                cameraScale !== this.prevCameraScale) {
                const extraSize = this.options.extraTileSize ?? 0;
                const halfScreenWidth = this.screen.width / 2 / cameraScale +
                    extraSize * cameraScale;
                const halfScreenHeight = this.screen.height / 2 / cameraScale +
                    extraSize * cameraScale;
                const boundLeft = this.screen.camera.x - halfScreenWidth;
                const boundRight = this.screen.camera.x + halfScreenWidth;
                const boundTop = this.screen.camera.y - halfScreenHeight;
                const boundBottom = this.screen.camera.y + halfScreenHeight;
                if (this.loadTilesDebouncer) {
                    this.loadTilesDebouncer.execute(boundLeft, boundRight, boundTop, boundBottom);
                }
                else {
                    this.loadTiles(boundLeft, boundRight, boundTop, boundBottom);
                }
                this.prevCameraX = this.screen.camera.x;
                this.prevCameraY = this.screen.camera.y;
                this.prevCameraScale = cameraScale;
            }
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=RectTileLoader.js.map