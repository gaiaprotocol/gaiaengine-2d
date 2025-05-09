import { Store } from "@commonmodule/app";
import GameScreen from "./GameScreen.js";
export default class PanZoomGameScreen extends GameScreen {
    options;
    store;
    isMousePressed = false;
    isDraggingView = false;
    initialDragX = 0;
    initialDragY = 0;
    previousMouseX = 0;
    previousMouseY = 0;
    constructor(options) {
        super({
            width: 0,
            height: 0,
            backgroundColor: options.backgroundColor,
            pixelated: options.pixelated,
        });
        this.options = options;
        this.store = new Store(options.id);
        this.initializeCamera();
        this.attachEventListeners();
    }
    initializeCamera() {
        this.camera.setPosition(-(this.store.get("cameraX") ??
            (this.options.initialCameraX ?? 0)), -(this.store.get("cameraY") ??
            (this.options.initialCameraY ?? 0)));
        this.camera.scale = this.store.get("cameraZoom") ??
            (this.options.initialCameraZoom ?? 1);
    }
    attachEventListeners() {
        this
            .on("mousedown", this.handleMouseDown.bind(this))
            .on("mousemove", this.handleMouseMove.bind(this))
            .on("mouseup", this.handleMouseUp.bind(this))
            .on("wheel", this.handleMouseWheel.bind(this));
    }
    handleMouseDown(event) {
        event.preventDefault();
        const { clientX: mouseX, clientY: mouseY } = event;
        this.isMousePressed = true;
        this.isDraggingView = false;
        this.initialDragX = mouseX;
        this.initialDragY = mouseY;
        this.previousMouseX = mouseX;
        this.previousMouseY = mouseY;
    }
    handleMouseMove(event) {
        const { clientX: mouseX, clientY: mouseY } = event;
        if (this.isMousePressed) {
            this.handleDragMove(mouseX, mouseY);
        }
    }
    handleDragMove(mouseX, mouseY) {
        const cameraX = this.camera.getX();
        const cameraY = this.camera.getY();
        const scale = this.camera.scale;
        const distanceMoved = Math.sqrt((mouseX - this.initialDragX) ** 2 + (mouseY - this.initialDragY) ** 2);
        if (!this.isDraggingView && distanceMoved > this.options.dragThreshold) {
            this.isDraggingView = true;
        }
        if (this.isDraggingView) {
            const deltaX = (mouseX - this.previousMouseX) / scale;
            const deltaY = (mouseY - this.previousMouseY) / scale;
            this.camera.setPosition(cameraX - deltaX, cameraY - deltaY);
            this.store.setPermanent("cameraX", -this.camera.getX());
            this.store.setPermanent("cameraY", -this.camera.getY());
            this.previousMouseX = mouseX;
            this.previousMouseY = mouseY;
        }
    }
    handleMouseUp(event) {
        this.isMousePressed = false;
        this.isDraggingView = false;
    }
    handleMouseWheel(event) {
        event.preventDefault();
        const rect = this.calculateRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const worldX = this.camera.getX() + (mouseX - centerX) / this.camera.scale;
        const worldY = this.camera.getY() + (mouseY - centerY) / this.camera.scale;
        let updatedZoom = this.camera.scale -
            event.deltaY / this.options.zoomSensitivity;
        updatedZoom = Math.max(this.options.minZoom, Math.min(updatedZoom, this.options.maxZoom));
        const newCameraX = worldX - (mouseX - centerX) / updatedZoom;
        const newCameraY = worldY - (mouseY - centerY) / updatedZoom;
        this.camera.scale = updatedZoom;
        this.camera.setPosition(newCameraX, newCameraY);
        this.store.setPermanent("cameraZoom", updatedZoom);
        this.store.setPermanent("cameraX", -this.camera.getX());
        this.store.setPermanent("cameraY", -this.camera.getY());
    }
}
//# sourceMappingURL=PanZoomGameScreen.js.map