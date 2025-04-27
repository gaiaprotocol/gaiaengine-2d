import { RealUtils } from "@commonmodule/ts";
import { BLEND_MODES, Container, Sprite as PixiSprite } from "pixi.js";
import GameObject from "../core/GameObject.js";
import TextureLoader from "../loaders/TextureLoader.js";

interface ParticleSystemOptions {
  src: string;

  count: { min: number; max: number };
  lifetime: { min: number; max: number };
  direction: { min: number; max: number };
  speed: { min: number; max: number };
  scale: { min: number; max: number };

  fadingSpeed: number;
  rotationToDirection: boolean;

  blendMode: BLEND_MODES;
}

interface Particle {
  pixiGraphic: Container;

  time: number;
  lifetime: number;

  speedX: number;
  speedY: number;

  fadingSpeed: number;
}

export default class ParticleSystem extends GameObject {
  private particles: Particle[] = [];

  constructor(private o: ParticleSystemOptions) {
    super(0, 0);
  }

  public async burst(x: number, y: number) {
    const count = RealUtils.random(this.o.count.min, this.o.count.max);

    await Promise.all(Array.from({ length: count }, async () => {
      const texture = await TextureLoader.load(this.o.src);
      if (!texture) return;

      const lifetime = RealUtils.random(
        this.o.lifetime.min,
        this.o.lifetime.max,
      );

      const direction = RealUtils.random(
        this.o.direction.min,
        this.o.direction.max,
      );
      const sin = Math.sin(direction);
      const cos = Math.cos(direction);

      const speed = RealUtils.random(this.o.speed.min, this.o.speed.max);
      const fadingSpeed = this.o.fadingSpeed;

      const pixiGraphic = new PixiSprite({
        x,
        y,
        texture,
        anchor: { x: 0.5, y: 0.5 },
      });

      pixiGraphic.scale = RealUtils.random(this.o.scale.min, this.o.scale.max);
      pixiGraphic.blendMode = this.o.blendMode;

      if (this.o.rotationToDirection) pixiGraphic.rotation = direction;

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

  protected update(deltaTime: number): void {
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
