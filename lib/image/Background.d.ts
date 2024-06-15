import Node from "../base/Node.js";
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
    protected update(deltaTime: number): void;
    delete(): void;
}
export {};
//# sourceMappingURL=Background.d.ts.map