class AudioManager {
  private bufferCache: Map<string, AudioBuffer> = new Map();

  public readonly audioContext: AudioContext;
  public readonly canPlayOgg = new Audio().canPlayType("audio/ogg") !== "";

  constructor() {
    this.audioContext =
      new (window.AudioContext || (window as any).webkitAudioContext)();
    this.setupAutoResume();
  }

  private setupAutoResume() {
    ["mousedown", "touchend", "keydown"].forEach((eventType) => {
      window.addEventListener(eventType, () => {
        if (this.audioContext.state === "suspended") {
          this.audioContext.resume();
        }
      }, { once: true });
    });
  }

  public async loadAudio(url: string): Promise<AudioBuffer> {
    if (this.bufferCache.has(url)) return this.bufferCache.get(url)!;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.bufferCache.set(url, audioBuffer);
    return audioBuffer;
  }
}

export default new AudioManager();
