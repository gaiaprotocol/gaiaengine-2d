import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";

export default class Layer<E extends EventRecord = EventRecord>
  extends GameObject<E> {
  constructor() {
    super(0, 0);
  }

  public getContainer() {
    return this.container;
  }
}
