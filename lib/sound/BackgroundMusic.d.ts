export default class BackgroundMusic {
    private readonly sounds;
    private currentSound?;
    private currentIndex;
    constructor(sources: {
        ogg?: string;
        mp3: string;
    } | {
        ogg?: string;
        mp3: string;
    }[]);
    private changeVolumeHandler;
    private getRandomTrack;
    private handleSoundEnded;
    private handleVisibilityChange;
    play(): this;
    pause(): this;
    stop(): this;
    remove(): void;
}
//# sourceMappingURL=BackgroundMusic.d.ts.map