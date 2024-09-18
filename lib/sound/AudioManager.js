class AudioManager {
    bufferCache = new Map();
    audioContext;
    canPlayOgg = new Audio().canPlayType("audio/ogg") !== "";
    constructor() {
        this.audioContext =
            new (window.AudioContext || window.webkitAudioContext)();
        this.setupAutoResume();
    }
    setupAutoResume() {
        ["mousedown", "touchend", "keydown"].forEach((eventType) => {
            window.addEventListener(eventType, () => {
                if (this.audioContext.state === "suspended") {
                    this.audioContext.resume();
                }
            }, { once: true });
        });
    }
    async loadAudio(url) {
        if (this.bufferCache.has(url))
            return this.bufferCache.get(url);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.bufferCache.set(url, audioBuffer);
        return audioBuffer;
    }
}
export default new AudioManager();
//# sourceMappingURL=AudioManager.js.map