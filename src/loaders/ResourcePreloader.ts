import Atlas from "../data/Atlas.js";
import BinaryLoader from "./BinaryLoader.js";
import SpritesheetLoader from "./SpritesheetLoader.js";
import TextLoader from "./TextLoader.js";
import TextureLoader from "./TextureLoader.js";
import { AudioBufferLoader, AudioContextManager } from "@commonmodule/app";

class ResourcePreloader {
  public async preloadResources(
    resources: (
      | { type: "text" | "binary" | "texture" | "audio"; src: string }
      | { type: "audio"; ogg: string; mp3?: string }
      | { type: "audio"; ogg?: string; mp3: string }
      | { type: "spritesheet"; id: string; src: string; atlas: Atlas }
    )[],
  ): Promise<void> {
    await Promise.all(
      resources.map(async (resource) => {
        if (resource.type === "text") {
          await TextLoader.load(resource.src);
        } else if (resource.type === "binary") {
          await BinaryLoader.load(resource.src);
        } else if (resource.type === "texture") {
          await TextureLoader.load(resource.src);
        } else if (
          resource.type === "audio" && ("ogg" in resource || "mp3" in resource)
        ) {
          const src = AudioContextManager.canPlayOgg() && resource.ogg
            ? resource.ogg
            : resource.mp3;
          await AudioBufferLoader.load(src!);
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
