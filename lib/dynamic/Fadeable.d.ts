import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
export default class Fadeable<E extends EventRecord = EventRecord> extends GameObject<E> {
    protected fadingSpeed: number;
    protected minFadingSpeed: number;
    protected maxFadingSpeed: number;
    protected fadingAccel: number;
    private fadeInCallback?;
    private fadeOutCallback?;
    fadeIn(duration: number, callback?: () => void): void;
    fadeOut(duration: number, callback?: () => void): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Fadeable.d.ts.map