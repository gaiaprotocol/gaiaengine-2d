import { Texture } from "pixi.js";
import Node from "../base/Node.js";
interface TilesetTile {
    tilesetId: string;
    row: number;
    col: number;
}
interface AutotileTile {
    autotileId: string;
}
type TileData = TilesetTile | AutotileTile;
export interface TilemapData {
    tileSize: number;
    autotiles: {
        [id: string]: {
            [direction: string]: TilesetTile[];
        };
    };
    tiles: {
        [position: string]: TileData;
    };
}
export default class Tilemap extends Node {
    private tilesetImages;
    private data;
    private tileTextures;
    private sprites;
    constructor(x: number, y: number, tilesetImages: {
        [tilesetId: string]: string;
    }, data: TilemapData);
    private loadTextures;
    private renderTilesetTile;
    private renderAutotileTile;
    private renderSingleTile;
    addTile(row: number, col: number, tile: TileData): void;
    delete(): void;
    getTileTexture(tilesetId: string, row: number, col: number): Texture | undefined;
}
export {};
//# sourceMappingURL=Tilemap.d.ts.map