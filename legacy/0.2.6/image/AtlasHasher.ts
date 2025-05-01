import Atlas from "../data/Atlas.js";

class AtlasHasher {
  private atlasHashCache: WeakMap<Atlas, string> = new WeakMap();

  private computeHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(16);
  }

  public getAtlasHash(atlas: Atlas): string {
    if (this.atlasHashCache.has(atlas)) {
      return this.atlasHashCache.get(atlas)!;
    }
    const atlasString = JSON.stringify(atlas);
    const hash = this.computeHash(atlasString);
    this.atlasHashCache.set(atlas, hash);
    return hash;
  }
}

export default new AtlasHasher();
