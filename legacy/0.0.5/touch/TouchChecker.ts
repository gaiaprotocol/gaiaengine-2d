import { TreeNode } from "@common-module/app";
import Node from "../base/Node.js";
import Collider from "../collision/Collider.js";
import ColliderType from "../collision/ColliderType.js";
import CollisionUtil from "../collision/CollisionUtil.js";
import Screen from "../screen/Screen.js";
import TouchEventType from "./TouchEventType.js";

export default class TouchChecker extends TreeNode {
  declare public parent: Node | undefined;

  private _screen: Screen | undefined;
  private domEventNames: string[] = [];

  constructor(
    eventType: TouchEventType,
    private collider: Collider,
    private eventHandler: (
      rx: number,
      ry: number,
      cx: number,
      cy: number,
    ) => void,
  ) {
    super();
    if (eventType === TouchEventType.TouchStart) {
      this.domEventNames.push("touchstart", "mousedown");
    } else if (eventType === TouchEventType.TouchMove) {
      this.domEventNames.push("touchmove", "mousemove");
    } else if (eventType === TouchEventType.TouchEnd) {
      this.domEventNames.push("touchend", "mouseup");
    }
  }

  private domEventHandler = (e: TouchEvent | MouseEvent) => {
    if (this._screen && this.parent) {
      const screenRect = this._screen.rect;
      const cx = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const cy = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      const rx =
        (cx - screenRect.x - this._screen.width / 2 + this._screen.camera.x) /
          this.parent.worldTransform.scaleX - this.parent.worldTransform.x;
      const ry =
        (cy - screenRect.y - this._screen.height / 2 + this._screen.camera.y) /
          this.parent.worldTransform.scaleY - this.parent.worldTransform.y;

      if (
        this.collider.type === ColliderType.Rect &&
        CollisionUtil.checkPointInRect(
          rx,
          ry,
          this.collider.x,
          this.collider.y,
          this.collider.width,
          this.collider.height,
          Math.sin(this.parent.worldTransform.rotation),
          Math.cos(this.parent.worldTransform.rotation),
        )
      ) {
        e.preventDefault();
        this.eventHandler(rx, ry, cx, cy);
      }
    }
  };

  public set screen(screen: Screen | undefined) {
    if (this._screen) {
      for (const domEventName of this.domEventNames) {
        this._screen.offDom(domEventName, this.domEventHandler);
      }
    }
    this._screen = screen;
    if (this._screen) {
      for (const domEventName of this.domEventNames) {
        this._screen.onDom(domEventName, this.domEventHandler);
      }
    }
  }

  public get screen() {
    return this._screen;
  }

  public appendTo(node: Node, index?: number): this {
    this.screen = node.screen;
    return super.appendTo(node, index);
  }

  public delete(): void {
    if (this._screen) {
      for (const domEventName of this.domEventNames) {
        this._screen.offDom(domEventName, this.domEventHandler);
      }
    }
    super.delete();
  }

  private _tick(deltaTime: number) {}
}
