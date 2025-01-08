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
      [direction in TerrainDirection]: {
        spritesheet: string;
        frames: Frame[];
        fps?: number;
        drawingOrder: number;
      }[];
    };
  };
  objects: {
    [id: string]: {
      spritesheet: string;
      frames: Frame[];
      fps?: number;
      drawingOrder?: number;
      useYForDrawingOrder?: boolean;
    };
  };
  terrainMap: { [cord: string]: string }; // { row, col } -> terrainId
  mapObjects: { x: number; y: number; object: string }[];
}
