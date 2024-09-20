import Sound from "./Sound.js";

class SFXPlayer {
  public play(url: string): void {
    const sound: Sound = new Sound(url)
      .play()
      .on("ended", () => sound.remove());
  }
}

export default new SFXPlayer();
