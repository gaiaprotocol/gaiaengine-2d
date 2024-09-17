declare class AudioManager {
    private bufferCache;
    audioContext: AudioContext;
    canPlayOgg: boolean;
    private setupAutoResume;
    constructor();
    loadAudio(url: string): Promise<AudioBuffer>;
}
declare const _default: AudioManager;
export default _default;
//# sourceMappingURL=AudioManager.d.ts.map