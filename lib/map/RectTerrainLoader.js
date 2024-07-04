import RectTileLoader from "./RectTileLoader.js";
export default class RectTerrainLoader extends RectTileLoader {
    options;
    loadingTiles = [];
    tiles = {};
    constructor(tileSize, options) {
        super(tileSize, {
            extraTileLoadWidth: options.extraTileLoadWidth === undefined ||
                options.extraTileLoadWidth < tileSize
                ? tileSize
                : options.extraTileLoadWidth,
            extraTileLoadHeight: options.extraTileLoadHeight === undefined ||
                options.extraTileLoadHeight < tileSize
                ? tileSize
                : options.extraTileLoadHeight,
            loadTiles: (cords) => this.loadTiles(cords),
            deleteTiles: (cords) => this.deleteTiles(cords),
        });
        this.options = options;
    }
    renderTile() {
    }
    renderTerrain(row, col, data) {
    }
    async loadTiles(cords) {
        const toLoadCords = [];
        for (const cord of cords) {
            if (!this.loadingTiles.find((c) => c.row === cord.row && c.col === cord.col))
                toLoadCords.push(cord);
        }
        this.loadingTiles.push(...toLoadCords);
        const data = await this.options.loadTiles(toLoadCords);
    }
    deleteTiles(cords) {
        for (const cord of cords) {
            const cordStr = `${cord.row},${cord.col}`;
            for (const tile of this.tiles[cordStr] ?? [])
                tile.delete();
            delete this.tiles[cordStr];
        }
        if (this.options.onDeletedTiles)
            this.options.onDeletedTiles(cords);
    }
}
//# sourceMappingURL=RectTerrainLoader.js.map