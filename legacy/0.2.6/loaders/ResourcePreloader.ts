import Atlas from "../data/Atlas.js";
import AudioBufferLoader from "./AudioBufferLoader.js";
import BinaryLoader from "./BinaryLoader.js";
import SpritesheetLoader from "./SpritesheetLoader.js";
import TextLoader from "./TextLoader.js";
import TextureLoader from "./TextureLoader.js";

class ResourcePreloader {
  public async preloadResources(
    resources: ({
      type: "text" | "binary" | "texture" | "audio";
      src: string;
    } | {
      type: "spritesheet";
      id: string;
      src: string;
      atlas: Atlas;
    })[],
  ): Promise<void> {
    await Promise.all(
      resources.map(async (resource) => {
        if (resource.type === "text") {
          await TextLoader.load(resource.src);
        } else if (resource.type === "binary") {
          await BinaryLoader.load(resource.src);
        } else if (resource.type === "texture") {
          await TextureLoader.load(resource.src);
        } else if (resource.type === "audio") {
          await AudioBufferLoader.load(resource.src);
        } else if (resource.type === "spritesheet") {
          await SpritesheetLoader.load(
            resource.id,
            resource.src,
            resource.atlas,
          );
        } else {
          throw new Error(`Unknown resource type: ${resource.type}`);
        }
      }),
    );
  }
}

export default new ResourcePreloader();
