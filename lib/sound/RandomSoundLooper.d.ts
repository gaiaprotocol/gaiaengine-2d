export default class RandomSoundLooper {
    private _volume;
    private readonly sounds;
    private currentSound?;
    private currentIndex;
    private isRemoved;
    constructor(sources: string[], _volume?: number);
    private getRandomIndex;
    private handleSoundEnded;
    private handleVisibilityChange;
    private playNextTrack;
    play(): this;
    pause(): this;
    stop(): this;
    set volume(volume: number);
    get volume(): number;
    remove(): void;
}
//# sourceMappingURL=RandomSoundLooper.d.ts.map