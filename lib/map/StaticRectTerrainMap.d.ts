import RectTerrainLoader from "./RectTerrainLoader.js";
export interface StaticRectTerrainMapData {
    tileSize: number;
    terreins: {
        [id: string]: {
            [direction: string]: {
                tilesetId: string;
                row: number;
                col: number;
            }[];
        };
    };
    tiles: {
        [cord: string]: string;
    };
}
export default class StaticRectTerrainMap extends RectTerrainLoader {
}
//# sourceMappingURL=StaticRectTerrainMap.d.ts.map