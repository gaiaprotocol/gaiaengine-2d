import { ResourceLoader } from "@commonmodule/ts";
declare class BinaryLoader extends ResourceLoader<Uint8Array> {
    protected loadResource(src: string): Promise<Uint8Array | undefined>;
}
declare const _default: BinaryLoader;
export default _default;
//# sourceMappingURL=BinaryLoader.d.ts.map