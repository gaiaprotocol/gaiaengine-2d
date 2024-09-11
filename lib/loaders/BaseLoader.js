export default class BaseLoader {
    items = new Map();
    itemUsedCount = new Map();
    loadPromises = new Map();
    checkItemUsing(src) {
        return this.itemUsedCount.has(src) && this.itemUsedCount.get(src) > 0;
    }
    async load(src, ...args) {
        this.itemUsedCount.set(src, (this.itemUsedCount.get(src) || 0) + 1);
        if (this.items.has(src))
            return this.items.get(src);
        if (this.loadPromises.has(src))
            return await this.loadPromises.get(src);
        return await this.loadItem(src, ...args);
    }
    release(src) {
        const count = this.itemUsedCount.get(src);
        if (count === undefined)
            throw new Error("Item not found");
        if (count === 1) {
            this.itemUsedCount.delete(src);
            const item = this.items.get(src);
            if (item) {
                this.destroyItem(item);
                this.items.delete(src);
            }
        }
        else {
            this.itemUsedCount.set(src, count - 1);
        }
    }
}
//# sourceMappingURL=BaseLoader.js.map