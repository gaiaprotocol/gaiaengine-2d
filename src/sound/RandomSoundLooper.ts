import { BrowserInfo } from "@common-module/app";
import { IntegerUtils } from "@common-module/ts";
import Sound from "./Sound.js";

export default class RandomSoundLooper {
  private readonly sounds: Sound[] = [];
  private currentSound?: Sound;
  private currentIndex: number = -1;

  constructor(sources: string[], private _volume = 0.8) {
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

  private getRandomSound(): Sound {
    if (this.sounds.length <= 1) {
      return this.sounds[0];
    }

    const newIndex = IntegerUtils.random(0, this.sounds.length - 1);
    this.currentIndex = newIndex;
    return this.sounds[newIndex];
  }

  private handleSoundEnded = () => {
    this.currentSound?.stop();
    this.currentSound = this.getRandomSound();
    this.currentSound.play();
  };

  private handleVisibilityChange = (): void => {
    document.hidden ? this.pause() : this.play();
  };

  public play(): this {
    if (!this.currentSound) {
      this.currentSound = this.getRandomSound();
    }
    this.currentSound.play();
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
    for (const sound of this.sounds) {
      sound.remove();
    }

    if (BrowserInfo.isMobileDevice()) {
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
  }
}
