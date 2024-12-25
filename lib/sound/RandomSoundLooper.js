import { BrowserInfo } from "@common-module/app";
import { IntegerUtils } from "@common-module/ts";
import Sound from "./Sound.js";
export default class RandomSoundLooper {
    _volume;
    sounds = [];
    currentSound;
    currentIndex = -1;
    isRemoved = false;
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
    getRandomIndex() {
        return IntegerUtils.random(0, this.sounds.length - 1);
    }
    handleSoundEnded = () => {
        if (this.isRemoved) {
            return;
        }
        this.currentSound?.stop();
        this.playNextTrack();
    };
    handleVisibilityChange = () => {
        document.hidden ? this.pause() : this.play();
    };
    playNextTrack() {
        this.currentIndex = this.getRandomIndex();
        this.currentSound = this.sounds[this.currentIndex];
        this.currentSound.play();
    }
    play() {
        if (!this.currentSound) {
            this.playNextTrack();
        }
        else {
            this.currentSound.play();
        }
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
        this.isRemoved = true;
        this.stop();
        for (const sound of this.sounds) {
            sound.remove();
        }
        this.sounds.length = 0;
        if (BrowserInfo.isMobileDevice()) {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
    }
}
//# sourceMappingURL=RandomSoundLooper.js.map