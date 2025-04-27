import { BLEND_MODES } from "pixi.js";
import GameObject from "../core/GameObject.js";
interface ParticleSystemOptions {
    src: string;
    minCount: number;
    maxCount: number;
    minLifetime: number;
    maxLifetime: number;
    minDirection: number;
    maxDirection: number;
    minSpeed: number;
    maxSpeed: number;
    minScale: number;
    maxScale: number;
    fadingSpeed: number;
    rotationToDirection: boolean;
    blendMode: BLEND_MODES;
}
export default class ParticleSystem extends GameObject {
    private o;
    private particles;
    constructor(o: ParticleSystemOptions);
    burst(x: number, y: number): Promise<void>;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=ParticleSystem.d.ts.map