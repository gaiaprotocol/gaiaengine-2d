import Node from "../base/Node.js";

interface RectTileMapOptions {
  extraTileLoadWidth?: number;
  extraTileLoadHeight?: number;
  loadTiles: (cords: { row: number; col: number }[]) => void;
  deleteTiles: (cords: { row: number; col: number }[]) => void;
}

export default class RectTileLoader extends Node {
  private prevCameraX: number | undefined;
  private prevCameraY: number | undefined;
  private prevCameraScale: number | undefined;

  protected startTileRow: number | undefined;
  protected endTileRow: number | undefined;
  protected startTileCol: number | undefined;
  protected endTileCol: number | undefined;

  constructor(protected tileSize: number, private options: RectTileMapOptions) {
    super(0, 0);
  }

  private loadTilesInViewport(
    boundLeft: number,
    boundRight: number,
    boundTop: number,
    boundBottom: number,
  ) {
    const startTileRow = Math.floor(boundTop / this.tileSize);
    const endTileRow = Math.ceil(boundBottom / this.tileSize);
    const startTileCol = Math.floor(boundLeft / this.tileSize);
    const endTileCol = Math.ceil(boundRight / this.tileSize);

    if (
      startTileRow !== this.startTileRow ||
      endTileRow !== this.endTileRow ||
      startTileCol !== this.startTileCol ||
      endTileCol !== this.endTileCol
    ) {
      const toDeleteCords: { row: number; col: number }[] = [];
      if (
        this.startTileRow !== undefined &&
        this.endTileRow !== undefined &&
        this.startTileCol !== undefined &&
        this.endTileCol !== undefined
      ) {
        for (let row = this.startTileRow; row < this.endTileRow; row++) {
          for (let col = this.startTileCol; col < this.endTileCol; col++) {
            toDeleteCords.push({ row, col });
          }
        }
      }

      const toLoadCords: { row: number; col: number }[] = [];
      for (let row = startTileRow; row < endTileRow; row++) {
        for (let col = startTileCol; col < endTileCol; col++) {
          const index = toDeleteCords.findIndex((cord) =>
            cord.row === row && cord.col === col
          );
          if (index !== -1) toDeleteCords.splice(index, 1);
          else toLoadCords.push({ row, col });
        }
      }

      if (toLoadCords.length > 0) this.options.loadTiles(toLoadCords);
      if (toDeleteCords.length > 0) this.options.deleteTiles(toDeleteCords);

      this.startTileRow = startTileRow;
      this.endTileRow = endTileRow;
      this.startTileCol = startTileCol;
      this.endTileCol = endTileCol;
    }
  }

  protected update(deltaTime: number): void {
    if (this.screen) {
      const cameraScale = this.screen.camera.scale;
      if (
        this.screen.camera.x !== this.prevCameraX ||
        this.screen.camera.y !== this.prevCameraY ||
        cameraScale !== this.prevCameraScale
      ) {
        const extraTileLoadWidth = this.options.extraTileLoadWidth ?? 0;
        const extraTileLoadHeight = this.options.extraTileLoadHeight ?? 0;
        const halfScreenWidth = this.screen.width / 2 + extraTileLoadWidth;
        const halfScreenHeight = this.screen.height / 2 + extraTileLoadHeight;
        this.loadTilesInViewport(
          this.screen.camera.x - halfScreenWidth / cameraScale,
          this.screen.camera.x + halfScreenWidth / cameraScale,
          this.screen.camera.y - halfScreenHeight / cameraScale,
          this.screen.camera.y + halfScreenHeight / cameraScale,
        );
        this.prevCameraX = this.screen.camera.x;
        this.prevCameraY = this.screen.camera.y;
        this.prevCameraScale = cameraScale;
      }
    }
    super.update(deltaTime);
  }
}
