import { BackgroundMusic } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
import TransitionOverlay from "./TransitionOverlay.js";

type SceneConstructor = new () => Scene;

export default abstract class Scene<E extends EventHandlers = {}>
  extends GameObject<E> {
  protected bgm: BackgroundMusic | undefined;

  constructor() {
    super(0, 0);
  }

  public transitionTo(Scene: SceneConstructor): void {
    if (this.screen) {
      new TransitionOverlay(() => {
        if (this.parent) new Scene().appendTo(this.parent);
        this.remove();
      }).appendTo(this.screen);
    }
  }

  public remove(): void {
    this.bgm?.remove();
    super.remove();
  }
}
