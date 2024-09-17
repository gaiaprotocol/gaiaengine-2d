import GameObject from "../core/GameObject.js";
import BackgroundMusic from "../sound/BackgroundMusic.js";

export default abstract class Scene extends GameObject {
  protected bgm: BackgroundMusic | undefined;

  public remove(): void {
    if (this.bgm) this.bgm.remove();
    super.remove();
  }
}
