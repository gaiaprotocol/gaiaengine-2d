import GameObject from "../core/GameObject.js";

interface Coordinate {
  row: number;
  col: number;
}

interface RectTileLoaderOptions {
  extraTileLoadWidth?: number;
  extraTileLoadHeight?: number;
  loadTiles: (coordinates: Coordinate[]) => void;
  deleteTiles: (coordinates: Coordinate[]) => void;
}

export default class RectTileLoader extends GameObject {
  private prevCameraX?: number;
  private prevCameraY?: number;
  private prevCameraScale?: number;

  private startTileRow?: number;
  private endTileRow?: number;
  private startTileCol?: number;
  private endTileCol?: number;

  constructor(
    protected tileSize: number,
    private options: RectTileLoaderOptions,
  ) {
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
      const toDeleteCoordinates: Coordinate[] = [];
      if (
        this.startTileRow !== undefined &&
        this.endTileRow !== undefined &&
        this.startTileCol !== undefined &&
        this.endTileCol !== undefined
      ) {
        for (let row = this.startTileRow; row < this.endTileRow; row++) {
          for (let col = this.startTileCol; col < this.endTileCol; col++) {
            toDeleteCoordinates.push({ row, col });
          }
        }
      }

      const toLoadCoordinates: Coordinate[] = [];
      for (let row = startTileRow; row < endTileRow; row++) {
        for (let col = startTileCol; col < endTileCol; col++) {
          const index = toDeleteCoordinates.findIndex(
            (coord) => coord.row === row && coord.col === col,
          );
          if (index !== -1) {
            toDeleteCoordinates.splice(index, 1);
          } else {
            toLoadCoordinates.push({ row, col });
          }
        }
      }

      if (toLoadCoordinates.length > 0) {
        this.options.loadTiles(toLoadCoordinates);
      }
      if (toDeleteCoordinates.length > 0) {
        this.options.deleteTiles(toDeleteCoordinates);
      }

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

        const boundLeft = this.screen.camera.x - halfScreenWidth / cameraScale;
        const boundRight = this.screen.camera.x + halfScreenWidth / cameraScale;
        const boundTop = this.screen.camera.y - halfScreenHeight / cameraScale;
        const boundBottom = this.screen.camera.y +
          halfScreenHeight / cameraScale;

        this.loadTilesInViewport(boundLeft, boundRight, boundTop, boundBottom);

        this.prevCameraX = this.screen.camera.x;
        this.prevCameraY = this.screen.camera.y;
        this.prevCameraScale = cameraScale;
      }
    }
    super.update(deltaTime);
  }
}
