import { Rectangle, Sprite, Texture } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Tilemap extends Node {
    tilesetImages;
    data;
    tileTextures = {};
    constructor(x, y, tilesetImages, data) {
        super(x, y);
        this.tilesetImages = tilesetImages;
        this.data = data;
        this.loadTextures();
    }
    async loadTextures() {
        await Promise.all(Object.entries(this.tilesetImages).map(async ([key, src]) => {
            const texture = await TextureLoader.load(src);
            if (texture) {
                if (!this.tileTextures[key])
                    this.tileTextures[key] = {};
                for (let row = 0; row < Math.floor(texture.height / this.data.tileSize); row++) {
                    if (!this.tileTextures[key][row])
                        this.tileTextures[key][row] = {};
                    for (let col = 0; col < Math.floor(texture.width / this.data.tileSize); col++) {
                        this.tileTextures[key][row][col] = new Texture({
                            source: texture.source,
                            frame: new Rectangle(col * this.data.tileSize, row * this.data.tileSize, this.data.tileSize, this.data.tileSize),
                        });
                    }
                }
            }
        }));
        if (this.deleted)
            return;
        for (const tile of this.data.tiles) {
            this.renderTile(tile);
        }
    }
    getTileTexture(tilesetKey, row, col) {
        return this.tileTextures[tilesetKey]?.[row]?.[col];
    }
    renderTile(tile) {
        const texture = this.getTileTexture(tile.tileset.key, tile.tileset.row, tile.tileset.col);
        if (texture) {
            this.container.addChild(new Sprite({
                x: tile.col * this.data.tileSize,
                y: tile.row * this.data.tileSize,
                texture,
                anchor: { x: 0.5, y: 0.5 },
            }));
        }
    }
    addTile(tile) {
        this.data.tiles.push(tile);
        this.renderTile(tile);
    }
}
//# sourceMappingURL=Tilemap.js.map