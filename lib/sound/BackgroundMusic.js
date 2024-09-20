import AudioManager from "./AudioBufferManager.js";
import Sound from "./Sound.js";
export default class BackgroundMusic extends Sound {
    constructor(urls, volume = 0.8) {
        super(AudioManager.canPlayOgg && urls.ogg ? urls.ogg : urls.mp3, true, volume);
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }
    handleVisibilityChange = () => {
        document.hidden ? this.pause() : this.play();
    };
    remove() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        super.remove();
    }
}
//# sourceMappingURL=BackgroundMusic.js.map