import { EventContainer } from "@common-module/ts";
import AudioBufferManager from "./AudioBufferManager.js";

export default class Sound extends EventContainer<{
  ended: () => void;
}> {
  private isPlaying = false;
  private isPaused = false;

  private audioBuffer?: AudioBuffer;
  private audioContext?: AudioContext;
  private gainNode?: GainNode;
  private source?: AudioBufferSourceNode;

  private pauseTime = 0;
  private offset = 0;

  constructor(
    private readonly src: string,
    private readonly loop = false,
    private _volume = 0.8,
  ) {
    super();
    void AudioBufferManager.loadBuffer(this.src);
  }

  private async initializeAudio(): Promise<void> {
    if (!this.audioBuffer) {
      this.audioBuffer = await AudioBufferManager.loadBuffer(this.src);
    }
    if (!this.isPlaying) return;

    if (!this.audioContext) {
      this.audioContext = await AudioBufferManager.getAudioContext();
    }
    if (!this.isPlaying) return;

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

  public play(): this {
    if (this.isPaused) {
      this.offset += this.audioContext
        ? this.audioContext.currentTime - this.pauseTime
        : 0;
    } else {
      this.offset = 0;
    }
    this.isPlaying = true;
    this.isPaused = false;
    this.initializeAudio();
    return this;
  }

  private stopSource(): void {
    if (this.source) {
      this.source.stop();
      this.source.disconnect();
      this.source = undefined;
    }
  }

  public pause(): this {
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

  public stop(): this {
    this.isPlaying = false;
    this.isPaused = false;
    this.offset = 0;
    this.stopSource();
    return this;
  }

  public set volume(volume: number) {
    this._volume = Math.max(0, Math.min(1, volume));
    if (this.gainNode) {
      this.gainNode.gain.value = this._volume;
    }
  }

  public get volume(): number {
    return this._volume;
  }

  public remove(): void {
    this.stop();
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = undefined;
    }
    this.audioBuffer = undefined;
    this.audioContext = undefined;
  }
}
