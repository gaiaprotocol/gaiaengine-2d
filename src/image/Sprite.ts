import {
  AnimatedSprite,
  Dict,
  Spritesheet,
  SpritesheetFrameData,
} from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";

export default class Sprite extends Node {
  private animatedSprite: AnimatedSprite | undefined;

  constructor(
    x: number,
    y: number,
    private _src: string,
    private frameCount: number,
    private fps: number,
  ) {
    super(x, y);
    this.src = _src;
  }

  private async load(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.deleted) return;

    const frameWidth = texture.width / this.frameCount;
    const frames: Dict<SpritesheetFrameData> = {};
    for (let i = 0; i < this.frameCount; i++) {
      frames[`sprite-${i}.png`] = {
        frame: {
          x: i * frameWidth,
          y: 0,
          w: frameWidth,
          h: texture.height,
        },
      };
    }

    const spritesheet = new Spritesheet(
      texture,
      {
        frames,
        meta: {
          image: this.src,
          scale: 1,
        },
        animations: {
          sprite: Array.from(
            { length: this.frameCount },
            (_, i) => `sprite-${i}.png`,
          ),
        },
      },
    );
    await spritesheet.parse();

    this.container.addChild(
      this.animatedSprite = new AnimatedSprite(spritesheet.animations.sprite),
    );
    this.animatedSprite.anchor.set(0.5, 0.5);
    this.animatedSprite.animationSpeed = this.fps / 60;
    this.animatedSprite.play();
  }

  public set src(src: string) {
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src;
  }

  public delete(): void {
    TextureLoader.release(this._src);
    super.delete();
  }
}
