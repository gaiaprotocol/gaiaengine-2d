import {
  AnimatedSprite as PixiAnimatedSprite,
  Sprite as PixiSprite,
  Spritesheet,
} from "pixi.js";
import GameObject from "../core/GameObject.js";
import Atlas from "../data/Atlas.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AtlasHasher from "./AtlasHasher.js";

interface AnimatedSpriteOptions {
  src: string;
  atlas: Atlas;
  animation: string;
  fps: number;
  loop?: boolean;
  onAnimationEnd?: (animation: string) => void;
}

export default class AnimatedSprite extends GameObject {
  private id: string;
  private _animation: string;
  private sheet: Spritesheet | undefined;
  private currentSprite: PixiSprite | PixiAnimatedSprite | undefined;

  constructor(x: number, y: number, private options: AnimatedSpriteOptions) {
    super(x, y);
    this.id = `${options.src}:${AtlasHasher.getAtlasHash(options.atlas)}`;
    this._animation = options.animation;
    this.load();
  }

  private changeAnimation() {
    if (!this.sheet) return;
    this.currentSprite?.destroy();
    if (this.options.atlas.animations?.[this.animation].length === 1) {
      const frame = this.options.atlas.animations[this.animation][0];
      const texture = this.sheet.textures[frame];
      if (!texture) {
        throw new Error(`Failed to load texture: ${this.options.src}`);
      }

      const sprite = new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } });
      this.container.addChild(sprite);
      this.currentSprite = sprite;
    } else {
      const sprite = new PixiAnimatedSprite(
        this.sheet.animations[this.animation],
      );
      sprite.loop = this.options.loop ?? true;
      sprite.onLoop = () => this.options.onAnimationEnd?.(this.animation);
      sprite.onComplete = () => this.options.onAnimationEnd?.(this.animation);
      sprite.anchor.set(0.5, 0.5);
      sprite.animationSpeed = this.options.fps / 60;
      sprite.play();

      this.container.addChild(sprite);
      this.currentSprite = sprite;
    }
  }

  private async load() {
    this.sheet = await SpritesheetLoader.load(
      this.id,
      this.options.src,
      this.options.atlas,
    );
    if (!this.sheet || this.removed) return;
    this.changeAnimation();
  }

  public set animation(animation: string) {
    if (this._animation === animation) return;
    this._animation = animation;
    this.changeAnimation();
  }

  public get animation(): string {
    return this._animation;
  }

  public get loop(): boolean {
    return (this.currentSprite as PixiAnimatedSprite).loop;
  }

  public set loop(loop: boolean) {
    (this.currentSprite as PixiAnimatedSprite).loop = loop;
  }

  public remove(): void {
    SpritesheetLoader.release(this.id);
    super.remove();
  }
}
