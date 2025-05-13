import { ResourceLoader } from "@commonmodule/ts";
declare class TextLoader extends ResourceLoader<string> {
    protected loadResource(src: string): Promise<string | undefined>;
}
declare const _default: TextLoader;
export default _default;
//# sourceMappingURL=TextLoader.d.ts.map