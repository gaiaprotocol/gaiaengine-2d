import GameObject from "../core/GameObject.js";

export default class Sprite extends GameObject {
  constructor(x: number, y: number, src: string) {
    super(x, y);
  }
}
