import { Assets, Texture } from "pixi.js";

class TextureLoader {
  private textureUsedCount: { [src: string]: number } = {};
  private unloadPromises: { [src: string]: Promise<void> } = {};

  public async load(src: string): Promise<Texture | undefined> {
    if (this.textureUsedCount[src] === undefined) {
      this.textureUsedCount[src] = 0;
    }
    this.textureUsedCount[src]++;

    if (this.unloadPromises[src] !== undefined) {
      await this.unloadPromises[src];
    }

    if (this.textureUsedCount[src] > 0) {
      const texture = await Assets.load(src);
      if (this.textureUsedCount[src] > 0) return texture;
      else this.unload(src);
    } else this.unload(src);
  }

  private async unload(src: string) {
    if (this.unloadPromises[src] !== undefined) return;

    this.unloadPromises[src] = Assets.unload(src);
    await this.unloadPromises[src];
    delete this.unloadPromises[src];
  }

  public release(src: string) {
    if (this.textureUsedCount[src] === undefined) {
      throw new Error("Texture not loaded");
    }

    this.textureUsedCount[src]--;
    if (this.textureUsedCount[src] === 0) {
      delete this.textureUsedCount[src];
      this.unload(src);
    }
  }
}

export default new TextureLoader();
