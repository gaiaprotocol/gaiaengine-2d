import { Store } from "@commonmodule/app";
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
  private store: Store;

  protected isMousePressed = false;
  protected isDraggingView = false;

  private initialDragX = 0;
  private initialDragY = 0;
  private previousMouseX = 0;
  private previousMouseY = 0;

  constructor(private options: PanZoomGameScreenOptions) {
    super({
      width: 0,
      height: 0,
      backgroundColor: options.backgroundColor,
      pixelated: options.pixelated,
    });
    this.store = new Store(options.id);

    this.initializeCamera();
    this.attachEventListeners();
  }

  private initializeCamera(): void {
    this.camera.setPosition(
      -(this.store.get<number>("cameraX") ??
        (this.options.initialCameraX ?? 0)),
      -(this.store.get<number>("cameraY") ??
        (this.options.initialCameraY ?? 0)),
    );
    this.camera.scale = this.store.get<number>("cameraZoom") ??
      (this.options.initialCameraZoom ?? 1);
  }

  private attachEventListeners(): void {
    this
      .onDom("mousedown", this.handleMouseDown.bind(this))
      .onDom("mousemove", this.handleMouseMove.bind(this))
      .onDom("mouseup", this.handleMouseUp.bind(this))
      .onDom("wheel", this.handleMouseWheel.bind(this));
  }

  private handleMouseDown(event: MouseEvent): void {
    event.preventDefault();

    const { clientX: mouseX, clientY: mouseY } = event;

    this.isMousePressed = true;
    this.isDraggingView = false;
    this.initialDragX = mouseX;
    this.initialDragY = mouseY;
    this.previousMouseX = mouseX;
    this.previousMouseY = mouseY;
  }

  protected handleMouseMove(event: MouseEvent): void {
    const { clientX: mouseX, clientY: mouseY } = event;
    if (this.isMousePressed) {
      this.handleDragMove(mouseX, mouseY);
    }
  }

  protected handleDragMove(mouseX: number, mouseY: number): void {
    const cameraX = this.camera.getX();
    const cameraY = this.camera.getY();
    const scale = this.camera.scale;

    const distanceMoved = Math.sqrt(
      (mouseX - this.initialDragX) ** 2 + (mouseY - this.initialDragY) ** 2,
    );

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

  protected handleMouseUp(event: MouseEvent): void {
    this.isMousePressed = false;
    this.isDraggingView = false;
  }

  private handleMouseWheel(event: WheelEvent): void {
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
    updatedZoom = Math.max(
      this.options.minZoom,
      Math.min(updatedZoom, this.options.maxZoom),
    );

    const newCameraX = worldX - (mouseX - centerX) / updatedZoom;
    const newCameraY = worldY - (mouseY - centerY) / updatedZoom;

    this.camera.scale = updatedZoom;
    this.camera.setPosition(newCameraX, newCameraY);

    this.store.setPermanent("cameraZoom", updatedZoom);
    this.store.setPermanent("cameraX", -this.camera.getX());
    this.store.setPermanent("cameraY", -this.camera.getY());
  }
}
