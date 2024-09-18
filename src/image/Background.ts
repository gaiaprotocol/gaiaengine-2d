import GameObject from "../core/GameObject.js";

export default class Background extends GameObject {
  constructor(src: string, options?: { scrollSpeedX: number }) {
    super(0, 0);
  }
}
