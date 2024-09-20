import { EventContainer } from "@common-module/ts";
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
    private pauseTime;
    private offset;
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