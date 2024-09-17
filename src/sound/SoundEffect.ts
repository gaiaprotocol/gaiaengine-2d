import Sound from "./Sound";

export default class SoundEffect extends Sound {
  constructor(url: string) {
    super(url);
    this.loop = false;
  }

  public async play(): Promise<void> {
    await this.load();

    const sourceNode = this.audioContext.createBufferSource();
    sourceNode.buffer = this.audioBuffer!;
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
