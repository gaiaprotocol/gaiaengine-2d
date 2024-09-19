import GameObject from "../core/GameObject.js";

export default abstract class BaseSprite extends GameObject {
  protected _src: string | undefined;

  protected abstract loadTexture(src: string): Promise<void>;
  protected abstract releaseTexture(src: string): void;

  public set src(src: string) {
    if (this._src === src) return;
    if (this._src) this.releaseTexture(this._src);
    this._src = src;
    this.loadTexture(src);
  }

  public get src(): string {
    return this._src ?? "";
  }

  public remove(): void {
    if (this._src) this.releaseTexture(this._src);
    super.remove();
  }
}
