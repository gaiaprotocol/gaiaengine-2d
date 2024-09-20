import Sound from "./Sound.js";
export default class BackgroundMusic extends Sound {
    constructor(urls: {
        ogg?: string;
        mp3: string;
    }, volume?: number);
    private handleVisibilityChange;
    remove(): void;
}
//# sourceMappingURL=BackgroundMusic.d.ts.map