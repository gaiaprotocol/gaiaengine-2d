import { KebabCase } from "@common-module/ts";
import GameScreen from "./GameScreen.js";
interface PanZoomGameScreenOptions {
    id: KebabCase<string>;
    minZoom: number;
    maxZoom: number;
    dragThreshold: number;
    zoomSensitivity: number;
    backgroundColor?: number;
    initialCameraX?: number;
    initialCameraY?: number;
    initialCameraZoom?: number;
}
export default class PanZoomGameScreen extends GameScreen {
    private options;
    private store;
    private isMousePressed;
    private isDraggingView;
    private initialDragX;
    private initialDragY;
    private previousMouseX;
    private previousMouseY;
    constructor(options: PanZoomGameScreenOptions);
    private initializeCamera;
    private attachEventListeners;
    private handleMouseDown;
    private handleMouseMove;
    private handleDragMove;
    private handleMouseUp;
    private handleMouseWheel;
}
export {};
//# sourceMappingURL=PanZoomGameScreen.d.ts.map