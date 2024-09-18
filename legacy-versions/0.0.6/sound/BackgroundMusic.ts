import AudioManager from "./AudioManager.js";
import Sound from "./Sound.js";

export default class BackgroundMusic extends Sound {
  constructor(urls: { ogg?: string; mp3: string }) {
    super(AudioManager.canPlayOgg && urls.ogg ? urls.ogg : urls.mp3);
  }
}
