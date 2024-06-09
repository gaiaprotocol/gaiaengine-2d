import { BodyNode, el, View } from "@common-module/app";
export default class TestCharacterView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".test-character-view.test-view", "Test Character View"));
    }
}
//# sourceMappingURL=TestCharacterView.js.map