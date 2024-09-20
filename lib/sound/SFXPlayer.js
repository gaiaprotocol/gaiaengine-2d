import Sound from "./Sound.js";
class SFXPlayer {
    play(url) {
        const sound = new Sound(url)
            .play()
            .on("ended", () => sound.remove());
    }
}
export default new SFXPlayer();
//# sourceMappingURL=SFXPlayer.js.map