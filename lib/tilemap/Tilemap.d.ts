import { Texture } from "pixi.js";
import Node from "../base/Node.js";
interface TileData {
    row: number;
    col: number;
    tileset: {
        key: string;
        row: number;
        col: number;
    };
}
export interface TilemapData {
    tileSize: number;
    tiles: TileData[];
}
export default class Tilemap extends Node {
    private tilesetImages;
    private data;
    private tileTextures;
    constructor(x: number, y: number, tilesetImages: {
        [key: string]: string;
    }, data: TilemapData);
    private loadTextures;
    getTileTexture(tilesetKey: string, row: number, col: number): Texture | undefined;
    private renderTile;
    addTile(tile: TileData): void;
}
export {};
//# sourceMappingURL=Tilemap.d.ts.map