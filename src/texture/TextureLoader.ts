import { CanvasSource, Texture } from "pixi.js";

class TextureLoader {
  private textures: Map<string, Texture> = new Map();
  private textureUsedCount: Map<string, number> = new Map();
  private loadPromises: Map<string, Promise<Texture | undefined>> = new Map();

  private checkTextureUsing(src: string): boolean {
    return this.textureUsedCount.has(src) &&
      this.textureUsedCount.get(src)! > 0;
  }

  private async loadTexture(src: string): Promise<Texture | undefined> {
    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    const loadPromise = new Promise<Texture | undefined>((resolve, reject) => {
      image.onload = () => {
        if (this.checkTextureUsing(src)) {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;

          const context = canvas.getContext("2d");
          if (!context) reject(new Error("Failed to get 2d context"));
          else {
            context.drawImage(image, 0, 0);

            const source = new CanvasSource({ resource: canvas });
            const texture = new Texture({ source });

            if (this.textures.has(src)) {
              reject(new Error("Texture already exists"));
            } else {
              this.textures.set(src, texture);
              resolve(texture);
            }
          }

          canvas.remove();
        } else {
          resolve(undefined);
        }
        this.loadPromises.delete(src);
      };
      image.onerror = (error) => {
        reject(error);
        this.loadPromises.delete(src);
      };
    });
    this.loadPromises.set(src, loadPromise);
    return await loadPromise;
  }

  public async load(src: string): Promise<Texture | undefined> {
    this.textureUsedCount.set(src, (this.textureUsedCount.get(src) || 0) + 1);
    if (this.textures.has(src)) return this.textures.get(src)!;
    if (this.loadPromises.has(src)) return await this.loadPromises.get(src)!;
    return await this.loadTexture(src);
  }

  public release(src: string): void {
    const count = this.textureUsedCount.get(src);
    if (count === undefined) return;

    if (count === 1) {
      this.textureUsedCount.delete(src);
      const texture = this.textures.get(src);
      if (texture) {
        texture.destroy();
        this.textures.delete(src);
      }
    } else {
      this.textureUsedCount.set(src, count - 1);
    }
  }
}

export default new TextureLoader();
