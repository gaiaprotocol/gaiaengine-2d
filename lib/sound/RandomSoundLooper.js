import { BrowserInfo } from "@common-module/app";
import { IntegerUtils } from "@common-module/ts";
import Sound from "./Sound.js";
export default class RandomSoundLooper {
    _volume;
    sounds = [];
    currentSound;
    currentIndex = -1;
    constructor(sources, _volume = 0.8) {
        this._volume = _volume;
        for (const src of sources) {
            const sound = new Sound(src, false, _volume);
            sound.on("ended", this.handleSoundEnded);
            this.sounds.push(sound);
        }
        if (BrowserInfo.isMobileDevice()) {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }
    getRandomSound() {
        if (this.sounds.length <= 1) {
            return this.sounds[0];
        }
        const newIndex = IntegerUtils.random(0, this.sounds.length - 1);
        this.currentIndex = newIndex;
        return this.sounds[newIndex];
    }
    handleSoundEnded = () => {
        this.currentSound?.stop();
        this.currentSound = this.getRandomSound();
        this.currentSound.play();
    };
    handleVisibilityChange = () => {
        document.hidden ? this.pause() : this.play();
    };
    play() {
        if (!this.currentSound) {
            this.currentSound = this.getRandomSound();
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
        if (BrowserInfo.isMobileDevice()) {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }
}
//# sourceMappingURL=RandomSoundLooper.js.map