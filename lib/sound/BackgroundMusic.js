import { BrowserInfo } from "@common-module/app";
import AudioManager from "./AudioBufferManager.js";
import Sound from "./Sound.js";
export default class BackgroundMusic extends Sound {
    constructor(urls, volume = 0.8) {
        super(AudioManager.canPlayOgg && urls.ogg ? urls.ogg : urls.mp3, true, volume);
        if (BrowserInfo.isMobileDevice()) {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }
    handleVisibilityChange = () => {
        if (this.isAudioInitialized) {
            document.hidden ? this.pause() : this.play();
        }
    };
    remove() {
        if (BrowserInfo.isMobileDevice()) {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
        super.remove();
    }
}
//# sourceMappingURL=BackgroundMusic.js.map