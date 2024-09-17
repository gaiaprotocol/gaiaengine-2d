import AudioManager from "./AudioManager";
export default class Sound {
    url;
    audioBuffer;
    gainNode;
    sourceNode;
    isPlaying = false;
    isPaused = false;
    loop = false;
    volume = 1.0;
    audioContext;
    constructor(url) {
        this.url = url;
        this.audioContext = AudioManager.getAudioContext();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
    }
    async load() {
        if (this.audioBuffer)
            return;
        this.audioBuffer = await AudioManager.loadAudio(this.url);
    }
    async play() {
        await this.load();
        if (this.isPlaying)
            this.stop();
        this.sourceNode = this.audioContext.createBufferSource();
        this.sourceNode.buffer = this.audioBuffer;
        this.sourceNode.loop = this.loop;
        this.sourceNode.connect(this.gainNode);
        this.sourceNode.start(0);
        this.isPlaying = true;
        this.isPaused = false;
        this.sourceNode.onended = () => {
            this.isPlaying = false;
            this.sourceNode = undefined;
        };
    }
    pause() {
        if (this.isPlaying && this.sourceNode) {
            this.stopSourceNode();
            this.isPaused = true;
        }
    }
    stop() {
        if (this.isPlaying && this.sourceNode) {
            this.stopSourceNode();
            this.isPaused = false;
        }
    }
    setVolume(volume) {
        this.volume = volume;
        this.gainNode.gain.value = volume;
    }
    getVolume() {
        return this.volume;
    }
    setLoop(loop) {
        this.loop = loop;
        if (this.sourceNode) {
            this.sourceNode.loop = loop;
        }
    }
    isSoundPlaying() {
        return this.isPlaying;
    }
    stopSourceNode() {
        if (this.sourceNode) {
            this.sourceNode.stop();
            this.sourceNode.disconnect();
            this.sourceNode = undefined;
        }
        this.isPlaying = false;
    }
}
//# sourceMappingURL=Sound.js.map