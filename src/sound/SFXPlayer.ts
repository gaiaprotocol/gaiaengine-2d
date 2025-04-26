import { IntegerUtils } from "@commonmodule/ts";
import Sound from "./Sound.js";

class SFXPlayer {
  public play(urls: string | string[], volume: number): void {
    if (!Array.isArray(urls)) urls = [urls];
    const url = urls[IntegerUtils.random(0, urls.length - 1)];
    const sound: Sound = new Sound(url, volume)
      .play()
      .on("ended", () => sound.remove());
  }
}

export default new SFXPlayer();
