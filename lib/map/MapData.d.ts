interface Frame {
    x: number;
    y: number;
    width: number;
    height: number;
}
export default interface MapData {
    terrains: {
        [id: string]: {
            [direction: string]: {
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
    terrainMap: {
        [cord: string]: string;
    };
    mapObjects: {
        x: number;
        y: number;
        object: string;
    }[];
}
export {};
//# sourceMappingURL=MapData.d.ts.map