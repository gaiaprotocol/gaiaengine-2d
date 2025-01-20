import { Container } from "pixi.js";
import GameScreen from "../screen/GameScreen.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";

export default class LayeredGameObject extends TransformableNode {
  private container: Container;

  constructor(
    x: number,
    y: number,
    private layer: string,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super(x, y);
    this.container = new Container({ x, y });
    this.append(...gameNodes);
  }

  public set screen(screen: GameScreen | undefined) {
    if (screen) screen.appendToLayer(this.container, this.layer);
    super.screen = screen;
  }

  public get screen() {
    return super.screen;
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    this.container.x = this.globalTransform.x;
    this.container.y = this.globalTransform.y;
    this.container.scale.set(
      this.globalTransform.scaleX,
      this.globalTransform.scaleY,
    );
    this.container.rotation = this.globalTransform.rotation;
    this.container.alpha = this.globalTransform.alpha;
  }

  public remove(): void {
    this.container.destroy();
    super.remove();
  }
}
