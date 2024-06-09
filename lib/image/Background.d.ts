import Node from "../Node.js";
interface BackgroundOptions {
    scrollSpeedX?: number;
}
export default class Background extends Node {
    private _src;
    private options?;
    private tilingSprite;
    constructor(_src: string, options?: BackgroundOptions | undefined);
    private load;
    set src(src: string);
    get src(): string;
    step(deltaTime: number): void;
}
export {};
//# sourceMappingURL=Background.d.ts.map