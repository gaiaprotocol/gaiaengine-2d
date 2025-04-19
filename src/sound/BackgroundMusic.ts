import { Browser } from "@commonmodule/app";
import { IntegerUtils } from "@commonmodule/ts";
import AudioManager from "./AudioBufferManager.js";
import Sound from "./Sound.js";

export default class BackgroundMusic {
  private readonly sounds: Sound[] = [];
  private currentSound?: Sound;
  private currentIndex: number = -1;

  constructor(
    sources: { ogg?: string; mp3: string } | { ogg?: string; mp3: string }[],
    private _volume = 0.5,
  ) {
    if (!Array.isArray(sources)) sources = [sources];
    for (const src of sources) {
      const url = AudioManager.canPlayOgg && src.ogg ? src.ogg : src.mp3;
      const sound = new Sound(url, false, _volume);
      sound.on("ended", this.handleSoundEnded);
      this.sounds.push(sound);
    }

    if (Browser.isMobileDevice()) {
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
  }

  private getRandomTrack(): Sound {
    if (this.sounds.length <= 1) {
      return this.sounds[0];
    }

    let newIndex;
    do {
      newIndex = IntegerUtils.random(0, this.sounds.length - 1);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    return this.sounds[newIndex];
  }

  private handleSoundEnded = () => {
    this.currentSound?.stop();
    this.currentSound = this.getRandomTrack();
    this.currentSound.play();
  };

  private handleVisibilityChange = (): void => {
    document.hidden ? this.pause() : this.play();
  };

  public play(): this {
    if (!this.currentSound) {
      this.currentSound = this.getRandomTrack();
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

    if (Browser.isMobileDevice()) {
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
  }
}
