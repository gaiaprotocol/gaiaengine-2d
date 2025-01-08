import Collider from "../collision/colliders/Collider.js";
import TerrainDirection from "./TerrainDirection.js";

export interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default interface MapData {
  terrains: {
    [id: string]: {
      drawingOrder: number;
      directions: {
        [direction in TerrainDirection]: {
          spritesheet: string;
          frames: Frame[];
          fps?: number;
          colliders?: Collider[];
        }[];
      };
    };
  };
  objects: {
    [id: string]: {
      spritesheet: string;
      frames: Frame[];
      fps?: number;
      drawingOrder?: number;
      useYForDrawingOrder?: boolean;
      colliders?: Collider[];
    };
  };
  terrainMap: { [cord: string]: string }; // { row, col } -> terrainId
  mapObjects: { x: number; y: number; object: string }[];
}
