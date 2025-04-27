import { RealUtils } from "@commonmodule/ts";
import { Sprite as PixiSprite } from "pixi.js";
import GameObject from "../core/GameObject.js";
import TextureLoader from "../loaders/TextureLoader.js";
export default class ParticleSystem extends GameObject {
    o;
    particles = [];
    constructor(o) {
        super(0, 0);
        this.o = o;
    }
    async burst(x, y) {
        const count = RealUtils.random(this.o.minCount, this.o.maxCount);
        await Promise.all(Array.from({ length: count }, async () => {
            const texture = await TextureLoader.load(this.o.src);
            if (!texture)
                return;
            const lifetime = RealUtils.random(this.o.minLifetime, this.o.maxLifetime);
            const direction = RealUtils.random(this.o.minDirection, this.o.maxDirection);
            const sin = Math.sin(direction);
            const cos = Math.cos(direction);
            const speed = RealUtils.random(this.o.minSpeed, this.o.maxSpeed);
            const fadingSpeed = this.o.fadingSpeed;
            const pixiGraphic = new PixiSprite({
                x,
                y,
                texture,
                anchor: { x: 0.5, y: 0.5 },
            });
            pixiGraphic.scale = RealUtils.random(this.o.minScale, this.o.maxScale);
            pixiGraphic.blendMode = this.o.blendMode;
            if (this.o.rotationToDirection)
                pixiGraphic.rotation = direction;
            this.container.addChild(pixiGraphic);
            this.particles.push({
                time: 0,
                lifetime,
                speedX: speed * cos,
                speedY: speed * sin,
                fadingSpeed,
                pixiGraphic,
            });
        }));
    }
    update(deltaTime) {
        super.update(deltaTime);
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            const g = p.pixiGraphic;
            p.time += deltaTime;
            if (p.time > p.lifetime) {
                this.container.removeChild(g);
                this.particles.splice(i, 1);
                i--;
                continue;
            }
            g.x += p.speedX * deltaTime;
            g.y += p.speedY * deltaTime;
            g.alpha += p.fadingSpeed * deltaTime;
        }
    }
}
//# sourceMappingURL=ParticleSystem.js.map