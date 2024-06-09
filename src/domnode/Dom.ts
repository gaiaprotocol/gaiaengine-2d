import { DomChild } from "@common-module/app";
import GameNode from "../GameNode.js";

export default class Dom extends GameNode {
  constructor(tag: string, ...children: DomChild[]) {
    super();
  }
}
