import { BrowserInfo } from "@common-module/app";
import AudioManager from "./AudioBufferManager.js";
import Sound from "./Sound.js";

export default class BackgroundMusic extends Sound {
  constructor(urls: { ogg?: string; mp3: string }, volume = 0.8) {
    super(
      AudioManager.canPlayOgg && urls.ogg ? urls.ogg : urls.mp3,
      true,
      volume,
    );

    if (BrowserInfo.isMobileDevice()) {
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
  }

  private handleVisibilityChange = (): void => {
    if (this.isAudioInitialized) {
      document.hidden ? this.pause() : this.play();
    }
  };

  public remove(): void {
    if (BrowserInfo.isMobileDevice()) {
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
      );
    }
    super.remove();
  }
}
