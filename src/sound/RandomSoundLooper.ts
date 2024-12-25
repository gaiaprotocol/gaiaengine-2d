import { BrowserInfo } from "@common-module/app";
import { IntegerUtils } from "@common-module/ts";
import Sound from "./Sound.js";

export default class RandomSoundLooper {
  private readonly sounds: Sound[] = [];
  private currentSound?: Sound;
  private currentIndex: number = -1;
  private isRemoved: boolean = false;

  constructor(
    sources: string[],
    private _volume = 0.8,
  ) {
    for (const src of sources) {
      const sound = new Sound(src, false, _volume);
      sound.on("ended", this.handleSoundEnded);
      this.sounds.push(sound);
    }

    if (BrowserInfo.isMobileDevice()) {
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
  }

  private getRandomIndex(): number {
    return IntegerUtils.random(0, this.sounds.length - 1);
  }

  private handleSoundEnded = () => {
    if (this.isRemoved || !this.currentSound) {
      return;
    }
    this.currentSound.stop();
    this.playNextTrack();
  };

  private handleVisibilityChange = (): void => {
    document.hidden ? this.pause() : this.play();
  };

  private playNextTrack(): void {
    this.currentIndex = this.getRandomIndex();
    this.currentSound = this.sounds[this.currentIndex];
    this.currentSound.play();
  }

  public play(): this {
    if (!this.currentSound) {
      this.playNextTrack();
    } else {
      this.currentSound.play();
    }
    return this;
  }

  public pause(): this {
    this.currentSound?.pause();
    return this;
  }

  public stop(): this {
    this.currentSound?.stop();
    this.currentSound = undefined;
    this.currentIndex = -1;
    return this;
  }

  public set volume(volume: number) {
    this._volume = volume;
    for (const sound of this.sounds) {
      sound.volume = volume;
    }
  }

  public get volume(): number {
    return this.currentSound ? this.currentSound.volume : this._volume;
  }

  public remove(): void {
    this.isRemoved = true;
    this.stop();

    for (const sound of this.sounds) {
      sound.remove();
    }
    this.sounds.length = 0;

    if (BrowserInfo.isMobileDevice()) {
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
  }
}
