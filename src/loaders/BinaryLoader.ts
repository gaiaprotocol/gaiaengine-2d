import { ResourceLoader } from "@commonmodule/ts";

class BinaryLoader extends ResourceLoader<Uint8Array> {
  protected async loadResource(src: string): Promise<Uint8Array | undefined> {
    const loadPromise = (async () => {
      const response = await fetch(src);
      if (!response.ok) throw new Error(`Failed to load binary data: ${src}`);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      this.pendingLoads.delete(src);

      if (this.isResourceInUse(src)) {
        if (this.resources.has(src)) {
          throw new Error(`Binary data already exists: ${src}`);
        } else {
          this.resources.set(src, data);
          return data;
        }
      } else {
        return undefined;
      }
    })();

    this.pendingLoads.set(src, loadPromise);
    return await loadPromise;
  }
}

export default new BinaryLoader();
