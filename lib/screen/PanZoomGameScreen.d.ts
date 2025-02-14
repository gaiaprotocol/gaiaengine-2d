import GameScreen from "./GameScreen.js";
interface PanZoomGameScreenOptions {
    id: string;
    minZoom: number;
    maxZoom: number;
    dragThreshold: number;
    zoomSensitivity: number;
    backgroundColor?: number;
    initialCameraX?: number;
    initialCameraY?: number;
    initialCameraZoom?: number;
    pixelated?: boolean;
}
export default class PanZoomGameScreen extends GameScreen {
    private options;
    private store;
    protected isMousePressed: boolean;
    protected isDraggingView: boolean;
    private initialDragX;
    private initialDragY;
    private previousMouseX;
    private previousMouseY;
    constructor(options: PanZoomGameScreenOptions);
    private initializeCamera;
    private attachEventListeners;
    private handleMouseDown;
    protected handleMouseMove(event: MouseEvent): void;
    protected handleDragMove(mouseX: number, mouseY: number): void;
    protected handleMouseUp(event: MouseEvent): void;
    private handleMouseWheel;
}
export {};
//# sourceMappingURL=PanZoomGameScreen.d.ts.map