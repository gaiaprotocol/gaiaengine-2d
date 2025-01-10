class MapDataTransformer {
    transformToAtlases(mapData) {
        const result = {};
        for (const terrainId in mapData.terrains) {
            const terrain = mapData.terrains[terrainId];
            for (const direction in terrain.directions) {
                const terrainEntries = terrain.directions[direction];
                for (const [entryIndex, entry] of terrainEntries.entries()) {
                    const { spritesheet, frames } = entry;
                    if (!result[spritesheet]) {
                        result[spritesheet] = {
                            frames: {},
                            animations: {},
                            meta: { scale: 1 },
                        };
                    }
                    const atlas = result[spritesheet];
                    const frameIds = [];
                    for (const frame of frames) {
                        const frameId = `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`;
                        atlas.frames[frameId] = {
                            frame: {
                                x: frame.x,
                                y: frame.y,
                                w: frame.width,
                                h: frame.height,
                            },
                        };
                        frameIds.push(frameId);
                    }
                    if (frames.length > 1 && atlas.animations) {
                        const animationId = `terrain_${terrainId}_${direction}_${entryIndex}`;
                        atlas.animations[animationId] = frameIds;
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
            const frameIds = [];
            for (const frame of frames) {
                const frameId = `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`;
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
//# sourceMappingURL=MapDataTransformer.js.map