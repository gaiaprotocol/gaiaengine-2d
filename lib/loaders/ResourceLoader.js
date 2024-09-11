export default class ResourceLoader {
    resources = new Map();
    pendingLoads = new Map();
    refCount = new Map();
    isResourceInUse(path) {
        return this.refCount.has(path) && this.refCount.get(path) > 0;
    }
    incrementRefCount(path) {
        this.refCount.set(path, (this.refCount.get(path) || 0) + 1);
    }
    async load(path, ...args) {
        this.incrementRefCount(path);
        if (this.resources.has(path))
            return this.resources.get(path);
        if (this.pendingLoads.has(path))
            return await this.pendingLoads.get(path);
        return await this.loadFromPath(path, ...args);
    }
    release(path) {
        const refCount = this.refCount.get(path);
        if (refCount === undefined)
            throw new Error(`Resource not found: ${path}`);
        if (refCount === 1) {
            this.refCount.delete(path);
            const resource = this.resources.get(path);
            if (resource) {
                this.cleanup(resource, path);
                this.resources.delete(path);
            }
        }
        else {
            this.refCount.set(path, refCount - 1);
        }
    }
}
//# sourceMappingURL=ResourceLoader.js.map