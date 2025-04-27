import { BLEND_MODES } from "pixi.js";
import GameObject from "../core/GameObject.js";
interface ParticleSystemOptions {
    src: string;
    count: {
        min: number;
        max: number;
    };
    lifetime: {
        min: number;
        max: number;
    };
    direction: {
        min: number;
        max: number;
    };
    speed: {
        min: number;
        max: number;
    };
    scale: {
        min: number;
        max: number;
    };
    alpha?: number;
    fadingSpeed: number;
    rotationToDirection: boolean;
    blendMode?: BLEND_MODES;
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