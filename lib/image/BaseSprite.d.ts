import GameObject from "../core/GameObject.js";
export default abstract class BaseSprite extends GameObject {
    protected _src: string | undefined;
    protected abstract loadTexture(src: string): Promise<void>;
    protected abstract releaseTexture(src: string): void;
    set src(src: string);
    get src(): string;
    remove(): void;
}
//# sourceMappingURL=BaseSprite.d.ts.map