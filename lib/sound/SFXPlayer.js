import { IntegerUtils } from "@commonmodule/ts";
import Sound from "./Sound.js";
class SFXPlayer {
    play(urls, volume) {
        if (!Array.isArray(urls))
            urls = [urls];
        const url = urls[IntegerUtils.random(0, urls.length - 1)];
        const sound = new Sound(url, volume)
            .play()
            .on("ended", () => sound.remove());
    }
}
export default new SFXPlayer();
//# sourceMappingURL=SFXPlayer.js.map