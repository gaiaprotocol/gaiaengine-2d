import Atlas from "../data/Atlas.js";
declare class ResourcePreloader {
    preloadResources(resources: ({
        type: "text" | "binary" | "texture" | "audio";
        src: string;
    } | {
        type: "audio";
        ogg: string;
        mp3?: string;
    } | {
        type: "audio";
        ogg?: string;
        mp3: string;
    } | {
        type: "spritesheet";
        id: string;
        src: string;
        atlas: Atlas;
    })[]): Promise<void>;
}
declare const _default: ResourcePreloader;
export default _default;
//# sourceMappingURL=ResourcePreloader.d.ts.map