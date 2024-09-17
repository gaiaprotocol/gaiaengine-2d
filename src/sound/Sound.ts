import AudioManager from "./AudioManager";

export default class Sound {
  protected audioBuffer: AudioBuffer | undefined;
  protected gainNode: GainNode;
  protected sourceNode: AudioBufferSourceNode | undefined;
  protected isPlaying: boolean = false;
  protected isPaused: boolean = false;
  protected loop: boolean = false;
  protected volume: number = 1.0;

  protected audioContext: AudioContext;

  constructor(protected url: string) {
    this.audioContext = AudioManager.getAudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  public async load(): Promise<void> {
    if (this.audioBuffer) return;
    this.audioBuffer = await AudioManager.loadAudio(this.url);
  }

  public async play(): Promise<void> {
    await this.load();

    if (this.isPlaying) this.stop();

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer!;
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

  public pause(): void {
    if (this.isPlaying && this.sourceNode) {
      this.stopSourceNode();
      this.isPaused = true;
    }
  }

  public stop(): void {
    if (this.isPlaying && this.sourceNode) {
      this.stopSourceNode();
      this.isPaused = false;
    }
  }

  public setVolume(volume: number): void {
    this.volume = volume;
    this.gainNode.gain.value = volume;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setLoop(loop: boolean): void {
    this.loop = loop;
    if (this.sourceNode) {
      this.sourceNode.loop = loop;
    }
  }

  public isSoundPlaying(): boolean {
    return this.isPlaying;
  }

  protected stopSourceNode(): void {
    if (this.sourceNode) {
      this.sourceNode.stop();
      this.sourceNode.disconnect();
      this.sourceNode = undefined;
    }
    this.isPlaying = false;
  }
}
