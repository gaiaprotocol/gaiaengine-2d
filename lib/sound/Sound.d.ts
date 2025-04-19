import { EventContainer } from "@commonmodule/ts";
export default class Sound extends EventContainer<{
    ended: () => void;
}> {
    private readonly src;
    private readonly loop;
    private _volume;
    private isPlaying;
    private isPaused;
    private audioBuffer?;
    private audioContext?;
    private gainNode?;
    private source?;
    private startTime;
    private pauseTime;
    private offset;
    protected isAudioInitialized: boolean;
    constructor(src: string, loop?: boolean, _volume?: number);
    private initializeAudio;
    play(): this;
    private stopSource;
    pause(): this;
    stop(): this;
    set volume(volume: number);
    get volume(): number;
    remove(): void;
}
//# sourceMappingURL=Sound.d.ts.map