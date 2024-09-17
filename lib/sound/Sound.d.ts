export default class Sound {
    protected url: string;
    protected audioBuffer: AudioBuffer | undefined;
    protected gainNode: GainNode;
    protected sourceNode: AudioBufferSourceNode | undefined;
    protected isPlaying: boolean;
    protected isPaused: boolean;
    protected loop: boolean;
    protected volume: number;
    protected audioContext: AudioContext;
    constructor(url: string);
    load(): Promise<void>;
    play(): Promise<void>;
    pause(): void;
    stop(): void;
    setVolume(volume: number): void;
    getVolume(): number;
    setLoop(loop: boolean): void;
    isSoundPlaying(): boolean;
    protected stopSourceNode(): void;
}
//# sourceMappingURL=Sound.d.ts.map