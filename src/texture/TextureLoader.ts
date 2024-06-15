import { Assets, Texture } from "pixi.js";

class TextureLoader {
  private textureUsedCount: { [src: string]: number } = {};
  private unloadPromises: { [src: string]: Promise<void> } = {};

  public async load(src: string): Promise<Texture | undefined> {
    if (this.textureUsedCount[src] === undefined) {
      this.textureUsedCount[src] = 0;
    }
    this.textureUsedCount[src]++;

    if (this.unloadPromises[src] !== undefined) await this.unloadPromises[src];
    const texture = await Assets.load(src);
    if (this.textureUsedCount[src] === undefined) this.unload(src);
    else return texture;
  }

  private async unload(src: string) {
    if (this.unloadPromises[src] !== undefined) return;
    this.unloadPromises[src] = Assets.unload(src);
    await this.unloadPromises[src];
    delete this.unloadPromises[src];
  }

  public release(src: string) {
    this.textureUsedCount[src]--;
    if (this.textureUsedCount[src] === 0) {
      delete this.textureUsedCount[src];
      this.unload(src);
    }
  }
}

export default new TextureLoader();
