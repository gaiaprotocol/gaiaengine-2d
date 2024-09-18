declare class AudioManager {
    private bufferCache;
    readonly audioContext: AudioContext;
    readonly canPlayOgg: boolean;
    constructor();
    private setupAutoResume;
    loadAudio(url: string): Promise<AudioBuffer>;
}
declare const _default: AudioManager;
export default _default;
//# sourceMappingURL=AudioManager.d.ts.map