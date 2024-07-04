import RectTerrainLoader from "./RectTerrainLoader.js";
export default class StaticRectTerrainMap extends RectTerrainLoader {
    constructor(tileSize, spritesheets, terreins, terrainMap, objects) {
        super(tileSize, {
            loadTiles: async (cords) => {
                return [];
            },
        });
    }
}
//# sourceMappingURL=StaticRectTerrainMap.js.map