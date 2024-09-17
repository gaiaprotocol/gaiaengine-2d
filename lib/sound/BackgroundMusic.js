import Sound from "./Sound";
export default class BackgroundMusic extends Sound {
    constructor(url) {
        super(url);
        this.loop = true;
    }
    remove() {
        this.stop();
    }
}
//# sourceMappingURL=BackgroundMusic.js.map