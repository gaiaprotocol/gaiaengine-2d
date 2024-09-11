export default abstract class ResourceLoader<T> {
    protected resources: Map<string, T>;
    protected pendingLoads: Map<string, Promise<T | undefined>>;
    private refCount;
    protected isResourceInUse(path: string): boolean;
    protected abstract loadFromPath(path: string, ...args: any[]): Promise<T | undefined>;
    private incrementRefCount;
    load(path: string, ...args: any[]): Promise<T | undefined>;
    release(path: string): void;
    protected abstract cleanup(resource: T, path: string): void;
}
//# sourceMappingURL=ResourceLoader.d.ts.map