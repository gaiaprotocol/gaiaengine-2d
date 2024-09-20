declare class AudioBufferManager {
    private readonly buffers;
    private readonly loadingPromises;
    readonly canPlayOgg: boolean;
    constructor();
    getAudioContext(): Promise<AudioContext>;
    loadBuffer(src: string): Promise<AudioBuffer>;
    private fetchAndDecodeAudio;
}
declare const _default: AudioBufferManager;
export default _default;
//# sourceMappingURL=AudioBufferManager.d.ts.map