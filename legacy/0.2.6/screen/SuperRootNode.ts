import GameObject from "../core/GameObject.js";
import GameScreen from "./GameScreen.js";

export default class SuperRootNode extends GameObject {
  constructor() {
    super(0, 0);
    this.globalTransform = this.transform;
  }

  public setScreen(screen: GameScreen | undefined) {
    this.screen = screen;
    return this;
  }

  public getContainer() {
    return this.container;
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}
