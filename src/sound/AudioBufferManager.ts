const audioContext =
  new (window.AudioContext || (window as any).webkitAudioContext)();
["mousedown", "touchend"].forEach((event) =>
  window.addEventListener(event, () => audioContext.resume())
);

class AudioBufferManager {
  private readonly buffers: Map<string, AudioBuffer> = new Map();
  private readonly loadingPromises: Map<string, Promise<AudioBuffer>> =
    new Map();

  public readonly canPlayOgg: boolean;

  constructor() {
    this.canPlayOgg = new Audio().canPlayType("audio/ogg") !== "";
  }

  public async getAudioContext(): Promise<AudioContext> {
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    return audioContext;
  }

  public async loadBuffer(src: string): Promise<AudioBuffer> {
    if (this.buffers.has(src)) {
      return this.buffers.get(src)!;
    }

    if (!this.loadingPromises.has(src)) {
      const loadPromise = this.fetchAndDecodeAudio(src);
      this.loadingPromises.set(src, loadPromise);

      try {
        const buffer = await loadPromise;
        this.buffers.set(src, buffer);
        return buffer;
      } finally {
        this.loadingPromises.delete(src);
      }
    }

    return this.loadingPromises.get(src)!;
  }

  private async fetchAndDecodeAudio(src: string): Promise<AudioBuffer> {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = await this.getAudioContext();
    return audioContext.decodeAudioData(arrayBuffer);
  }
}

export default new AudioBufferManager();
