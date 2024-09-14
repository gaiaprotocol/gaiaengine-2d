import GameObject from "../core/GameObject.js";
import GameScreen from "./GameScreen.js";

export default class RootNode extends GameObject {
  constructor() {
    super(0, 0);
    this.absoluteTransform.x = 0;
    this.absoluteTransform.y = 0;
  }

  public set screen(screen: GameScreen | undefined) {
    super.screen = screen;
  }

  public getContainer() {
    return this.container;
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}
