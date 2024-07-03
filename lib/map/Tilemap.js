import { IntegerUtil } from "@common-module/app";
import { Rectangle, Sprite, Texture } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
import TerrainDirection from "./TerrainDirection.js";
export default class Tilemap extends Node {
    tilesetImages;
    data;
    tileTextures = {};
    sprites = {};
    constructor(x, y, tilesetImages, data) {
        super(x, y);
        this.tilesetImages = tilesetImages;
        this.data = data;
        this.loadTextures();
    }
    async loadTextures() {
        await Promise.all(Object.entries(this.tilesetImages).map(async ([tilesetId, src]) => {
            const texture = await TextureLoader.load(src);
            if (texture) {
                for (let row = 0; row < Math.floor(texture.height / this.data.tileSize); row++) {
                    for (let col = 0; col < Math.floor(texture.width / this.data.tileSize); col++) {
                        this.tileTextures[`${tilesetId}:${row},${col}`] = new Texture({
                            source: texture.source,
                            frame: new Rectangle(col * this.data.tileSize, row * this.data.tileSize, this.data.tileSize, this.data.tileSize),
                        });
                    }
                }
            }
        }));
        if (this.deleted)
            return;
        const positions = Object.keys(this.data.tiles);
        if (positions.length === 0)
            return;
        let minRow = -Infinity;
        let minCol = -Infinity;
        let maxRow = Infinity;
        let maxCol = Infinity;
        for (const position of positions) {
            const split = position.split(",");
            const row = parseInt(split[0]);
            const col = parseInt(split[1]);
            if (row < minRow)
                minRow = row;
            if (col < minCol)
                minCol = col;
            if (row > maxRow)
                maxRow = row;
            if (col > maxCol)
                maxCol = col;
        }
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                const tile = this.data.tiles[`${row},${col}`];
                if (tile)
                    this.renderSingleTile(row, col, tile);
            }
        }
    }
    renderTilesetTile(row, col, tile) {
        const texture = this.tileTextures[`${tile.tilesetId}:${tile.row},${tile.col}`];
        if (!texture)
            return;
        const sprite = new Sprite({
            x: col * this.data.tileSize,
            y: row * this.data.tileSize,
            texture,
            anchor: { x: 0.5, y: 0.5 },
        });
        this.container.addChild(sprite);
        const position = `${row},${col}`;
        if (!this.sprites[position])
            this.sprites[position] = [];
        this.sprites[position].push(sprite);
    }
    renderAutotileTile(row, col, autotileId, direction) {
        const autotile = this.data.autotiles[autotileId];
        const frames = autotile?.[direction];
        if (frames && frames.length > 0) {
            const frame = frames[IntegerUtil.random(0, frames.length - 1)];
            this.renderTilesetTile(row, col, frame);
        }
    }
    renderSingleTile(row, col, tile) {
        const position = `${row},${col}`;
        for (const sprite of this.sprites[position] ?? []) {
            sprite.destroy();
        }
        this.sprites[position] = [];
        if ("tilesetId" in tile) {
            this.renderTilesetTile(row, col, tile);
        }
        else if ("autotileId" in tile) {
            this.renderAutotileTile(row, col, tile.autotileId, TerrainDirection.Center);
        }
        const topLeft = this.data.tiles[`${row - 1},${col - 1}`] ?? {};
        const top = this.data.tiles[`${row - 1},${col}`] ?? {};
        const topRight = this.data.tiles[`${row - 1},${col + 1}`] ?? {};
        const left = this.data.tiles[`${row},${col - 1}`] ?? {};
        const right = this.data.tiles[`${row},${col + 1}`] ?? {};
        const bottomLeft = this.data.tiles[`${row + 1},${col - 1}`] ?? {};
        const bottom = this.data.tiles[`${row + 1},${col}`] ?? {};
        const bottomRight = this.data.tiles[`${row + 1},${col + 1}`] ?? {};
        if ("autotileId" in topLeft) {
            const autotileId = topLeft.autotileId;
            if (top.autotileId !== autotileId && left.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.BottomRight);
            }
        }
        if ("autotileId" in top) {
            const autotileId = top.autotileId;
            if (left.autotileId !== autotileId && right.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.Bottom);
            }
        }
        if ("autotileId" in topRight) {
            const autotileId = topRight.autotileId;
            if (top.autotileId !== autotileId && right.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.BottomLeft);
            }
        }
        if ("autotileId" in left) {
            const autotileId = left.autotileId;
            if (top.autotileId !== autotileId && bottom.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.Right);
            }
        }
        if ("autotileId" in right) {
            const autotileId = right.autotileId;
            if (top.autotileId !== autotileId && bottom.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.Left);
            }
        }
        if ("autotileId" in bottomLeft) {
            const autotileId = bottomLeft.autotileId;
            if (bottom.autotileId !== autotileId && left.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.TopRight);
            }
        }
        if ("autotileId" in bottom) {
            const autotileId = bottom.autotileId;
            if (left.autotileId !== autotileId && right.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.Top);
            }
        }
        if ("autotileId" in bottomRight) {
            const autotileId = bottomRight.autotileId;
            if (bottom.autotileId !== autotileId && right.autotileId !== autotileId) {
                this.renderAutotileTile(row, col, autotileId, TerrainDirection.TopLeft);
            }
        }
    }
    addTile(row, col, tile) {
        this.data.tiles[`${row},${col}`] = tile;
        this.renderSingleTile(row, col, tile);
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r === row && c === col)
                    continue;
                const tile = this.data.tiles[`${r},${c}`];
                if (!tile)
                    continue;
                this.renderSingleTile(r, c, tile);
            }
        }
    }
    delete() {
        for (const tileTexture of Object.values(this.tileTextures)) {
            for (const texture of Object.values(tileTexture)) {
                texture.destroy();
            }
        }
        this.tileTextures = undefined;
        for (const src of Object.values(this.tilesetImages)) {
            TextureLoader.release(src);
        }
        this.sprites = undefined;
        super.delete();
    }
    getTileTexture(tilesetId, row, col) {
        return this.tileTextures[`${tilesetId}:${row},${col}`];
    }
}
//# sourceMappingURL=Tilemap.js.map