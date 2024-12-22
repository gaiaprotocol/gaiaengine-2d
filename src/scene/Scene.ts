import GameObject from "../core/GameObject.js";
import BackgroundMusic from "../sound/BackgroundMusic.js";

type SceneConstructor = new () => Scene;

export default abstract class Scene extends GameObject {
  protected bgm: BackgroundMusic | undefined;

  constructor() {
    super(0, 0);
  }

  public transitionTo(Scene: SceneConstructor): void {
    if (this.parent) new Scene().appendTo(this.parent);
    this.remove();
  }

  public remove(): void {
    this.bgm?.remove();
    super.remove();
  }
}
