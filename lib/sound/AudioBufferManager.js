const audioContext = new (window.AudioContext || window.webkitAudioContext)();
["mousedown", "touchend"].forEach((event) => window.addEventListener(event, () => audioContext.resume()));
class AudioBufferManager {
    buffers = new Map();
    loadingPromises = new Map();
    canPlayOgg;
    constructor() {
        this.canPlayOgg = new Audio().canPlayType("audio/ogg") !== "";
    }
    async getAudioContext() {
        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }
        return audioContext;
    }
    async loadBuffer(src) {
        if (this.buffers.has(src)) {
            return this.buffers.get(src);
        }
        if (!this.loadingPromises.has(src)) {
            const loadPromise = this.fetchAndDecodeAudio(src);
            this.loadingPromises.set(src, loadPromise);
            try {
                const buffer = await loadPromise;
                this.buffers.set(src, buffer);
                return buffer;
            }
            finally {
                this.loadingPromises.delete(src);
            }
        }
        return this.loadingPromises.get(src);
    }
    async fetchAndDecodeAudio(src) {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = await this.getAudioContext();
        return audioContext.decodeAudioData(arrayBuffer);
    }
}
export default new AudioBufferManager();
//# sourceMappingURL=AudioBufferManager.js.map