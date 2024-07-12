import { IntegerUtil } from "@common-module/app";
import Sprite from "../image/Sprite.js";
import SpritesheetLoader from "../texture/SpritesheetLoader.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
export default class RectTerrainMap extends RectTileLoader {
    spritesheets;
    terrains;
    objects;
    terrainMap;
    mapObjects;
    tileNodes = {};
    spritesheetLoaded = false;
    constructor(tileSize, spritesheets, terrains, objects, terrainMap, mapObjects, options = {}) {
        super(tileSize, {
            extraTileLoadWidth: options.extraTileLoadWidth === undefined ||
                options.extraTileLoadWidth < tileSize
                ? tileSize
                : options.extraTileLoadWidth,
            extraTileLoadHeight: options.extraTileLoadHeight === undefined ||
                options.extraTileLoadHeight < tileSize
                ? tileSize
                : options.extraTileLoadHeight,
            loadTiles: (cords) => {
                for (const cord of cords)
                    this.renderTile(cord.row, cord.col);
            },
            deleteTiles: (cords) => {
                for (const cord of cords)
                    this.deleteTile(cord.row, cord.col);
            },
        });
        this.spritesheets = spritesheets;
        this.terrains = terrains;
        this.objects = objects;
        this.terrainMap = terrainMap;
        this.mapObjects = mapObjects;
        this.loadSpritesheets();
    }
    async loadSpritesheets() {
        await Promise.all(Object.entries(this.spritesheets).map(async ([id, { src, atlas }]) => await SpritesheetLoader.load(src, atlas)));
        this.spritesheetLoaded = true;
    }
    renderTerrain(row, col, terrainId, direction) {
        const frames = this.terrains[terrainId]?.[direction];
        if (!frames || frames.length === 0) {
            throw new Error(`Terrain ${terrainId} with direction ${direction} not found`);
        }
        const frame = frames[IntegerUtil.random(0, frames.length - 1)];
        const spritesheet = this.spritesheets[frame.spritesheet];
        const sprite = new Sprite(col * this.tileSize, row * this.tileSize, spritesheet.src, spritesheet.atlas, frame.frame);
        sprite.zIndex = frame.zIndex;
        this.append(sprite);
        const cordStr = `${row},${col}`;
        if (!this.tileNodes[cordStr])
            this.tileNodes[cordStr] = [];
        this.tileNodes[cordStr].push(sprite);
    }
    renderTile(row, col) {
        const center = this.terrainMap[`${row},${col}`];
        if (center) {
            this.renderTerrain(row, col, center, TerrainDirection.Center);
        }
        const topLeft = this.terrainMap[`${row - 1},${col - 1}`];
        const top = this.terrainMap[`${row - 1},${col}`];
        const topRight = this.terrainMap[`${row - 1},${col + 1}`];
        const left = this.terrainMap[`${row},${col - 1}`];
        const right = this.terrainMap[`${row},${col + 1}`];
        const bottomLeft = this.terrainMap[`${row + 1},${col - 1}`];
        const bottom = this.terrainMap[`${row + 1},${col}`];
        const bottomRight = this.terrainMap[`${row + 1},${col + 1}`];
        if (bottomRight &&
            bottomRight !== center &&
            bottomRight !== right &&
            bottomRight !== bottom) {
            this.renderTerrain(row, col, bottomRight, TerrainDirection.TopLeft);
        }
        if (bottom &&
            bottom !== center &&
            bottom !== left &&
            bottom !== right) {
            this.renderTerrain(row, col, bottom, TerrainDirection.Top);
        }
        if (bottomLeft &&
            bottomLeft !== center &&
            bottomLeft !== left &&
            bottomLeft !== bottom) {
            this.renderTerrain(row, col, bottomLeft, TerrainDirection.TopRight);
        }
        if (right &&
            right !== center &&
            right !== top &&
            right !== bottom) {
            this.renderTerrain(row, col, right, TerrainDirection.Left);
        }
        if (left &&
            left !== center &&
            left !== top &&
            left !== bottom) {
            this.renderTerrain(row, col, left, TerrainDirection.Right);
        }
        if (topRight &&
            topRight !== center &&
            topRight !== top &&
            topRight !== right) {
            this.renderTerrain(row, col, topRight, TerrainDirection.BottomLeft);
        }
        if (top &&
            top !== center &&
            top !== left &&
            top !== right) {
            this.renderTerrain(row, col, top, TerrainDirection.Bottom);
        }
        if (topLeft &&
            topLeft !== center &&
            topLeft !== top &&
            topLeft !== left) {
            this.renderTerrain(row, col, topLeft, TerrainDirection.BottomRight);
        }
        if (top && top !== center) {
            if (left === top) {
                if (right === top) {
                    if (bottom === top) {
                        this.renderTerrain(row, col, top, TerrainDirection.FillFull);
                    }
                    else {
                        this.renderTerrain(row, col, top, TerrainDirection.FillTopLeftRight);
                    }
                }
                else if (bottom === top) {
                    this.renderTerrain(row, col, top, TerrainDirection.FillTopLeftBottom);
                }
                else {
                    this.renderTerrain(row, col, top, TerrainDirection.FillTopLeft);
                }
            }
            else if (right === top) {
                if (bottom === top) {
                    this.renderTerrain(row, col, top, TerrainDirection.FillTopRightBottom);
                }
                else {
                    this.renderTerrain(row, col, top, TerrainDirection.FillTopRight);
                }
            }
            else if (bottom === top) {
                this.renderTerrain(row, col, top, TerrainDirection.FillTopBottom);
            }
        }
        if (left && left !== center) {
            if (right === left) {
                if (bottom === left) {
                    this.renderTerrain(row, col, left, TerrainDirection.FillLeftRight);
                }
            }
            else if (bottom === left) {
                this.renderTerrain(row, col, left, TerrainDirection.FillBottomLeft);
            }
        }
        if (right && right !== center) {
            if (bottom === right) {
                this.renderTerrain(row, col, right, TerrainDirection.FillBottomRight);
            }
        }
        for (const mapObject of this.mapObjects) {
            const object = this.objects[mapObject.object];
            const objectRow = Math.floor(mapObject.y / this.tileSize);
            const objectCol = Math.floor(mapObject.x / this.tileSize);
            if (objectRow === row && objectCol === col) {
                const spritesheet = this.spritesheets[object.spritesheet];
                const sprite = new Sprite(mapObject.x, mapObject.y, spritesheet.src, spritesheet.atlas, object.frame);
                sprite.zIndex = object.zIndex;
                this.append(sprite);
            }
        }
    }
    deleteTile(row, col) {
        const cordStr = `${row},${col}`;
        for (const tile of this.tileNodes[cordStr] ?? [])
            tile.delete();
        delete this.tileNodes[cordStr];
    }
    update(deltaTime) {
        if (this.spritesheetLoaded)
            super.update(deltaTime);
    }
    delete() {
        for (const data of Object.values(this.spritesheets)) {
            SpritesheetLoader.release(data.src);
        }
        super.delete();
    }
}
//# sourceMappingURL=RectTerrainMap.js.map