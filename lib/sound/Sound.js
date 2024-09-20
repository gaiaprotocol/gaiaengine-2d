import { EventContainer } from "@common-module/ts";
import AudioBufferManager from "./AudioBufferManager.js";
export default class Sound extends EventContainer {
    src;
    loop;
    _volume;
    isPlaying = false;
    isPaused = false;
    audioBuffer;
    audioContext;
    gainNode;
    source;
    pauseTime = 0;
    offset = 0;
    constructor(src, loop = false, _volume = 0.8) {
        super();
        this.src = src;
        this.loop = loop;
        this._volume = _volume;
        void AudioBufferManager.loadBuffer(this.src);
    }
    async initializeAudio() {
        if (!this.audioBuffer) {
            this.audioBuffer = await AudioBufferManager.loadBuffer(this.src);
        }
        if (!this.isPlaying)
            return;
        if (!this.audioContext) {
            this.audioContext = await AudioBufferManager.getAudioContext();
        }
        if (!this.isPlaying)
            return;
        if (!this.gainNode) {
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = this._volume;
            this.gainNode.connect(this.audioContext.destination);
        }
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.loop = this.loop;
        this.source.connect(this.gainNode);
        this.source.start(0, this.offset);
        this.source.onended = () => {
            if (!this.loop) {
                this.stop();
            }
            this.emit("ended");
        };
    }
    play() {
        if (this.isPaused) {
            this.offset += this.audioContext
                ? this.audioContext.currentTime - this.pauseTime
                : 0;
        }
        else {
            this.offset = 0;
        }
        this.isPlaying = true;
        this.isPaused = false;
        this.initializeAudio();
        return this;
    }
    stopSource() {
        if (this.source) {
            this.source.stop();
            this.source.disconnect();
            this.source = undefined;
        }
    }
    pause() {
        if (this.isPlaying && !this.isPaused) {
            this.isPaused = true;
            this.isPlaying = false;
            if (this.audioContext) {
                this.pauseTime = this.audioContext.currentTime;
            }
            this.stopSource();
        }
        return this;
    }
    stop() {
        this.isPlaying = false;
        this.isPaused = false;
        this.offset = 0;
        this.stopSource();
        return this;
    }
    set volume(volume) {
        this._volume = Math.max(0, Math.min(1, volume));
        if (this.gainNode) {
            this.gainNode.gain.value = this._volume;
        }
    }
    get volume() {
        return this._volume;
    }
    remove() {
        this.stop();
        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = undefined;
        }
        this.audioBuffer = undefined;
        this.audioContext = undefined;
    }
}
//# sourceMappingURL=Sound.js.map