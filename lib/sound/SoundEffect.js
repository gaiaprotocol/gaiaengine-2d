import Sound from "./Sound";
export default class SoundEffect extends Sound {
    constructor(url) {
        super(url);
        this.loop = false;
    }
    async play() {
        await this.load();
        const sourceNode = this.audioContext.createBufferSource();
        sourceNode.buffer = this.audioBuffer;
        sourceNode.loop = false;
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.volume;
        sourceNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        sourceNode.start(0);
        sourceNode.onended = () => {
            sourceNode.disconnect();
            gainNode.disconnect();
        };
    }
}
//# sourceMappingURL=SoundEffect.js.map