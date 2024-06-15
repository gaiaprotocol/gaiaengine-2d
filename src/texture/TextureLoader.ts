import { Assets, Texture } from "pixi.js";

class TextureLoader {
  private textureUsedCount: { [src: string]: number } = {};

  public async load(src: string): Promise<Texture> {
    if (this.textureUsedCount[src] === undefined) {
      this.textureUsedCount[src] = 0;
    }
    this.textureUsedCount[src]++;
    return await Assets.load(src);
  }

  public async release(src: string) {
    this.textureUsedCount[src]--;
    if (this.textureUsedCount[src] === 0) {
      delete this.textureUsedCount[src];
      Assets.unload(src);
    }
  }
}

export default new TextureLoader();
