import { CanvasSource, Texture } from "pixi.js";
import ResourceLoader from "./ResourceLoader.js";

class TextureLoader extends ResourceLoader<Texture> {
  private createCanvasFromImage(image: HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Failed to get 2d context");

    context.drawImage(image, 0, 0);
    return canvas;
  }

  private createTextureFromCanvas(canvas: HTMLCanvasElement): Texture {
    const source = new CanvasSource({ resource: canvas });
    return new Texture({ source });
  }

  protected async loadFromPath(src: string): Promise<Texture | undefined> {
    const loadPromise = new Promise<Texture | undefined>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.crossOrigin = "anonymous";

      image.onload = () => {
        if (this.isResourceInUse(src)) {
          const canvas = this.createCanvasFromImage(image);
          const texture = this.createTextureFromCanvas(canvas);

          if (this.resources.has(src)) {
            reject(new Error(`Texture already exists: ${src}`));
          } else {
            this.resources.set(src, texture);
            resolve(texture);
          }

          canvas.remove();
        } else {
          resolve(undefined);
        }
        this.pendingLoads.delete(src);
      };

      image.onerror = (event) => {
        console.error(`Failed to load texture: ${src}`);
        reject(event);
        this.pendingLoads.delete(src);
      };
    });

    this.pendingLoads.set(src, loadPromise);
    return await loadPromise;
  }

  protected cleanup(texture: Texture): void {
    texture.destroy(true);
  }
}

export default new TextureLoader();
