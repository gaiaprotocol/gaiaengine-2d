import Collider from "../collision/colliders/Collider.js";
import TerrainDirection from "./TerrainDirection.js";

export interface FrameData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MapEntity {
  spritesheet: string;
  frames: FrameData[];
  fps?: number;
  colliders?: Collider[];
}

export interface TerrainData {
  drawingOrder: number;
  directions: { [direction in TerrainDirection]: MapEntity[] };
}

export interface MapObjectData extends MapEntity {
  drawingOrder?: number;
  useYForDrawingOrder?: boolean;
}

export default interface MapData {
  terrains: { [id: string]: TerrainData };
  objects: { [id: string]: MapObjectData };
  terrainMap: { [cord: string]: string }; // { row, col } -> terrainId
  mapObjects: { x: number; y: number; object: string }[];
}
