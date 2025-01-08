import Collider from "../collision/colliders/Collider.js";
import TerrainDirection from "./TerrainDirection.js";
export interface FrameData {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface TerrainData {
    drawingOrder: number;
    directions: {
        [direction in TerrainDirection]: {
            spritesheet: string;
            frames: FrameData[];
            fps?: number;
            colliders?: Collider[];
        }[];
    };
}
export interface ObjectData {
    spritesheet: string;
    frames: FrameData[];
    fps?: number;
    drawingOrder?: number;
    useYForDrawingOrder?: boolean;
    colliders?: Collider[];
}
export default interface MapData {
    terrains: {
        [id: string]: TerrainData;
    };
    objects: {
        [id: string]: ObjectData;
    };
    terrainMap: {
        [cord: string]: string;
    };
    mapObjects: {
        x: number;
        y: number;
        object: string;
    }[];
}
//# sourceMappingURL=MapData.d.ts.map