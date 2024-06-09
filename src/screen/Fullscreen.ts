import { BodyNode } from "@common-module/app";
import Screen from "./Screen.js";

export default class Fullscreen extends Screen {
  constructor() {
    super(0, 0);
    BodyNode.append(this);
  }
}
