import { Browser } from "@commonmodule/app";
import { IntegerUtils } from "@commonmodule/ts";
import AudioManager from "./AudioBufferManager.js";
import Sound from "./Sound.js";
export default class BackgroundMusic {
    _volume;
    sounds = [];
    currentSound;
    currentIndex = -1;
    constructor(sources, _volume = 0.5) {
        this._volume = _volume;
        if (!Array.isArray(sources))
            sources = [sources];
        for (const src of sources) {
            const url = AudioManager.canPlayOgg && src.ogg ? src.ogg : src.mp3;
            const sound = new Sound(url, false, _volume);
            sound.on("ended", this.handleSoundEnded);
            this.sounds.push(sound);
        }
        if (Browser.isMobileDevice()) {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }
    getRandomTrack() {
        if (this.sounds.length <= 1) {
            return this.sounds[0];
        }
        let newIndex;
        do {
            newIndex = IntegerUtils.random(0, this.sounds.length - 1);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        return this.sounds[newIndex];
    }
    handleSoundEnded = () => {
        this.currentSound?.stop();
        this.currentSound = this.getRandomTrack();
        this.currentSound.play();
    };
    handleVisibilityChange = () => {
        document.hidden ? this.pause() : this.play();
    };
    play() {
        if (!this.currentSound) {
            this.currentSound = this.getRandomTrack();
        }
        this.currentSound.play();
        return this;
    }
    pause() {
        this.currentSound?.pause();
        return this;
    }
    stop() {
        this.currentSound?.stop();
        this.currentSound = undefined;
        this.currentIndex = -1;
        return this;
    }
    set volume(volume) {
        this._volume = volume;
        for (const sound of this.sounds) {
            sound.volume = volume;
        }
    }
    get volume() {
        return this.currentSound ? this.currentSound.volume : this._volume;
    }
    remove() {
        for (const sound of this.sounds) {
            sound.remove();
        }
        if (Browser.isMobileDevice()) {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }
}
//# sourceMappingURL=BackgroundMusic.js.map