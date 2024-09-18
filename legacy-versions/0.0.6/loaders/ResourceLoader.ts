export default abstract class ResourceLoader<T> {
  protected resources: Map<string, T> = new Map();
  protected pendingLoads: Map<string, Promise<T | undefined>> = new Map();

  private refCount: Map<string, number> = new Map();

  protected isResourceInUse(path: string): boolean {
    return this.refCount.has(path) && this.refCount.get(path)! > 0;
  }

  protected abstract loadFromPath(
    path: string,
    ...args: any[]
  ): Promise<T | undefined>;

  private incrementRefCount(path: string): void {
    this.refCount.set(path, (this.refCount.get(path) || 0) + 1);
  }

  public async load(path: string, ...args: any[]): Promise<T | undefined> {
    this.incrementRefCount(path);
    if (this.resources.has(path)) return this.resources.get(path)!;
    if (this.pendingLoads.has(path)) return await this.pendingLoads.get(path)!;
    return await this.loadFromPath(path, ...args);
  }

  public release(path: string): void {
    const refCount = this.refCount.get(path);
    if (refCount === undefined) throw new Error(`Resource not found: ${path}`);

    if (refCount === 1) {
      this.refCount.delete(path);
      const resource = this.resources.get(path);
      if (resource) {
        this.cleanup(resource, path);
        this.resources.delete(path);
      }
    } else {
      this.refCount.set(path, refCount - 1);
    }
  }

  protected abstract cleanup(resource: T, path: string): void;
}
