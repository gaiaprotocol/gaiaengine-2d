import AudioManager from "./AudioManager.js";
import Sound from "./Sound";
export default class BackgroundMusic extends Sound {
    constructor(urls) {
        super(AudioManager.canPlayOgg && urls.ogg ? urls.ogg : urls.mp3);
    }
}
//# sourceMappingURL=BackgroundMusic.js.map