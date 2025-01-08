import Atlas from "../data/Atlas.js";
import MapData from "./MapData.js";

class MapDataTransformer {
  public transformToAtlases(mapData: MapData): Record<string, Atlas> {
    const result: Record<string, Atlas> = {};

    for (const terrainId in mapData.terrains) {
      const terrain = mapData.terrains[terrainId];
      for (const direction in terrain) {
        const terrainEntries = terrain[direction];
        for (const [entryIndex, entry] of terrainEntries.entries()) {
          const { spritesheet, frames } = entry;

          if (!result[spritesheet]) {
            result[spritesheet] = {
              frames: {},
              animations: {},
              meta: { scale: 1 },
            };
          }

          const sheetData = result[spritesheet];
          const frameIds: string[] = [];

          for (const frame of frames) {
            const frameId =
              `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`;
            sheetData.frames[frameId] = {
              frame: {
                x: frame.x,
                y: frame.y,
                w: frame.width,
                h: frame.height,
              },
            };
            frameIds.push(frameId);
          }

          if (frames.length > 1 && sheetData.animations) {
            const animationId =
              `terrain_${terrainId}_${direction}_${entryIndex}`;
            sheetData.animations[animationId] = frameIds;
          }
        }
      }
    }

    for (const objectId in mapData.objects) {
      const { spritesheet, frames } = mapData.objects[objectId];

      if (!result[spritesheet]) {
        result[spritesheet] = {
          frames: {},
          animations: {},
          meta: { scale: 1 },
        };
      }

      const sheetData = result[spritesheet];
      const frameIds: string[] = [];

      for (const frame of frames) {
        const frameId =
          `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`;
        sheetData.frames[frameId] = {
          frame: {
            x: frame.x,
            y: frame.y,
            w: frame.width,
            h: frame.height,
          },
        };
        frameIds.push(frameId);
      }

      if (frames.length > 1 && sheetData.animations) {
        const animationId = `object_${objectId}`;
        sheetData.animations[animationId] = frameIds;
      }
    }

    return result;
  }
}

export default new MapDataTransformer();
