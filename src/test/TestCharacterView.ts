import { BodyNode, el, View, ViewParams } from "@common-module/app";

export default class TestCharacterView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".test-character-view.test-view",
        "Test Character View",
      ),
    );
  }
}
