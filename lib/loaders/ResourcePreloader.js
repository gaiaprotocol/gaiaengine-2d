import AudioContextManager from "../sound/AudioContextManager.js";
import AudioBufferLoader from "./AudioBufferLoader.js";
import BinaryLoader from "./BinaryLoader.js";
import SpritesheetLoader from "./SpritesheetLoader.js";
import TextLoader from "./TextLoader.js";
import TextureLoader from "./TextureLoader.js";
class ResourcePreloader {
    async preloadResources(resources) {
        await Promise.all(resources.map(async (resource) => {
            if (resource.type === "text") {
                await TextLoader.load(resource.src);
            }
            else if (resource.type === "binary") {
                await BinaryLoader.load(resource.src);
            }
            else if (resource.type === "texture") {
                await TextureLoader.load(resource.src);
            }
            else if (resource.type === "audio" && ("ogg" in resource || "mp3" in resource)) {
                const src = AudioContextManager.canPlayOgg() && resource.ogg
                    ? resource.ogg
                    : resource.mp3;
                await AudioBufferLoader.load(src);
            }
            else if (resource.type === "audio") {
                await AudioBufferLoader.load(resource.src);
            }
            else if (resource.type === "spritesheet") {
                await SpritesheetLoader.load(resource.id, resource.src, resource.atlas);
            }
            else {
                throw new Error(`Unknown resource type: ${resource.type}`);
            }
        }));
    }
}
export default new ResourcePreloader();
//# sourceMappingURL=ResourcePreloader.js.map