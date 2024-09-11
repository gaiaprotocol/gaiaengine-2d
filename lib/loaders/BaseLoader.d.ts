export default abstract class BaseLoader<T> {
    protected items: Map<string, T>;
    protected itemUsedCount: Map<string, number>;
    protected loadPromises: Map<string, Promise<T | undefined>>;
    protected checkItemUsing(src: string): boolean;
    protected abstract loadItem(src: string, ...args: any[]): Promise<T | undefined>;
    load(src: string, ...args: any[]): Promise<T | undefined>;
    release(src: string): void;
    protected abstract destroyItem(item: T): void;
}
//# sourceMappingURL=BaseLoader.d.ts.map