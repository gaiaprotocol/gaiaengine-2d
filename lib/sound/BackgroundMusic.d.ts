export default class BackgroundMusic {
    private _volume;
    private readonly sounds;
    private currentSound?;
    private currentIndex;
    constructor(sources: {
        ogg?: string;
        mp3: string;
    }[], _volume?: number);
    private getRandomTrack;
    private handleSoundEnded;
    private handleVisibilityChange;
    play(): this;
    pause(): this;
    stop(): this;
    set volume(volume: number);
    get volume(): number;
    remove(): void;
}
//# sourceMappingURL=BackgroundMusic.d.ts.map