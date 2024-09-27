import { IntegerUtils } from "@common-module/ts";
import { SpritesheetData } from "pixi.js";
import GameNode from "../core/GameNode.js";
import Sprite from "../image/Sprite.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";

interface SpritesheetInfo {
  src: string;
  atlas: SpritesheetData;
}

interface TerrainFrame {
  spritesheet: string;
  frame: string;
  zIndex: number;
}

type TerrainFramesByDirection = {
  [direction in TerrainDirection]?: TerrainFrame[];
};

interface TerrainDefinitions {
  [terrainId: string]: TerrainFramesByDirection;
}

interface ObjectDefinitions {
  [objectId: string]: TerrainFrame;
}

interface MapObject {
  x: number;
  y: number;
  objectId: string;
}

interface RectTerrainMapOptions {
  extraTileLoadWidth?: number;
  extraTileLoadHeight?: number;
}

export default class RectTerrainMap extends RectTileLoader {
  private tileNodes = new Map<string, GameNode[]>();
  private spritesheetsLoaded = false;

  constructor(
    tileSize: number,
    private spritesheets: { [id: string]: SpritesheetInfo },
    private terrains: TerrainDefinitions,
    private objects: ObjectDefinitions,
    private terrainMap: { [coordinateKey: string]: string },
    private mapObjects: MapObject[],
    options: RectTerrainMapOptions = {},
  ) {
    super(tileSize, {
      extraTileLoadWidth: options.extraTileLoadWidth ?? tileSize,
      extraTileLoadHeight: options.extraTileLoadHeight ?? tileSize,
      loadTiles: (coordinates) => {
        coordinates.forEach(({ row, col }) => this.renderTile(row, col));
      },
      deleteTiles: (coordinates) => {
        coordinates.forEach(({ row, col }) => this.deleteTile(row, col));
      },
    });

    this.loadSpritesheets();
  }

  private async loadSpritesheets() {
    await Promise.all(
      Object.values(this.spritesheets).map(({ src, atlas }) =>
        SpritesheetLoader.load(src, atlas)
      ),
    );
    this.spritesheetsLoaded = true;
  }

  private createCoordinateKey(row: number, col: number): string {
    return `${row},${col}`;
  }

  private getTerrainAt(row: number, col: number): string | undefined {
    return this.terrainMap[this.createCoordinateKey(row, col)];
  }

  private getNeighborTerrains(row: number, col: number) {
    return {
      topLeft: this.getTerrainAt(row - 1, col - 1),
      top: this.getTerrainAt(row - 1, col),
      topRight: this.getTerrainAt(row - 1, col + 1),
      left: this.getTerrainAt(row, col - 1),
      right: this.getTerrainAt(row, col + 1),
      bottomLeft: this.getTerrainAt(row + 1, col - 1),
      bottom: this.getTerrainAt(row + 1, col),
      bottomRight: this.getTerrainAt(row + 1, col + 1),
    };
  }

  private renderTerrain(
    row: number,
    col: number,
    terrainId: string,
    direction: TerrainDirection,
  ) {
    const terrain = this.terrains[terrainId];
    if (!terrain) {
      throw new Error(`Terrain ID ${terrainId} not found.`);
    }

    const frames = terrain[direction];
    if (!frames || frames.length === 0) {
      throw new Error(
        `No frames found for direction ${direction} of terrain ${terrainId}.`,
      );
    }

    const frameIndex = IntegerUtils.random(0, frames.length - 1);
    const frame = frames[frameIndex];
    const spritesheet = this.spritesheets[frame.spritesheet];

    const sprite = new Sprite(
      col * this.tileSize,
      row * this.tileSize,
      spritesheet.src,
      spritesheet.atlas,
      frame.frame,
    );
    sprite.zIndex = frame.zIndex;
    this.append(sprite);

    const coordinateKey = this.createCoordinateKey(row, col);
    if (!this.tileNodes.has(coordinateKey)) {
      this.tileNodes.set(coordinateKey, []);
    }
    this.tileNodes.get(coordinateKey)!.push(sprite);
  }

  private renderTile(row: number, col: number) {
    const centerTerrainId = this.getTerrainAt(row, col);
    if (centerTerrainId) {
      this.renderTerrain(row, col, centerTerrainId, TerrainDirection.Center);
    }

    const neighbors = this.getNeighborTerrains(row, col);

    // Render terrains based on neighboring tiles
    this.renderSurroundingTerrains(row, col, centerTerrainId, neighbors);

    // Render map objects located on this tile
    this.mapObjects.forEach((mapObject) => {
      const objectRow = Math.floor(mapObject.y / this.tileSize);
      const objectCol = Math.floor(mapObject.x / this.tileSize);
      if (objectRow === row && objectCol === col) {
        const objectInfo = this.objects[mapObject.objectId];
        if (objectInfo) {
          const spritesheet = this.spritesheets[objectInfo.spritesheet];
          const sprite = new Sprite(
            mapObject.x,
            mapObject.y,
            spritesheet.src,
            spritesheet.atlas,
            objectInfo.frame,
          );
          sprite.zIndex = objectInfo.zIndex;
          this.append(sprite);
        }
      }
    });
  }

  private renderSurroundingTerrains(
    row: number,
    col: number,
    centerTerrainId: string | undefined,
    neighbors: Record<string, string | undefined>,
  ) {
    const {
      topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight,
    } = neighbors;

    if (
      bottomRight &&
      bottomRight !== centerTerrainId &&
      bottomRight !== right &&
      bottomRight !== bottom
    ) {
      this.renderTerrain(row, col, bottomRight, TerrainDirection.TopLeft);
    }

    if (
      bottom &&
      bottom !== centerTerrainId &&
      bottom !== left &&
      bottom !== right
    ) {
      this.renderTerrain(row, col, bottom, TerrainDirection.Top);
    }

    if (
      bottomLeft &&
      bottomLeft !== centerTerrainId &&
      bottomLeft !== left &&
      bottomLeft !== bottom
    ) {
      this.renderTerrain(row, col, bottomLeft, TerrainDirection.TopRight);
    }

    if (
      right &&
      right !== centerTerrainId &&
      right !== top &&
      right !== bottom
    ) {
      this.renderTerrain(row, col, right, TerrainDirection.Left);
    }

    if (
      left &&
      left !== centerTerrainId &&
      left !== top &&
      left !== bottom
    ) {
      this.renderTerrain(row, col, left, TerrainDirection.Right);
    }

    if (
      topRight &&
      topRight !== centerTerrainId &&
      topRight !== top &&
      topRight !== right
    ) {
      this.renderTerrain(row, col, topRight, TerrainDirection.BottomLeft);
    }

    if (
      top &&
      top !== centerTerrainId &&
      top !== left &&
      top !== right
    ) {
      this.renderTerrain(row, col, top, TerrainDirection.Bottom);
    }

    if (
      topLeft &&
      topLeft !== centerTerrainId &&
      topLeft !== top &&
      topLeft !== left
    ) {
      this.renderTerrain(row, col, topLeft, TerrainDirection.BottomRight);
    }

    if (top && top !== centerTerrainId) {
      if (left === top) {
        if (right === top) {
          if (bottom === top) {
            this.renderTerrain(row, col, top, TerrainDirection.FillFull);
          } else {
            this.renderTerrain(
              row,
              col,
              top,
              TerrainDirection.FillTopLeftRight,
            );
          }
        } else if (bottom === top) {
          this.renderTerrain(row, col, top, TerrainDirection.FillTopLeftBottom);
        } else {
          this.renderTerrain(row, col, top, TerrainDirection.FillTopLeft);
        }
      } else if (right === top) {
        if (bottom === top) {
          this.renderTerrain(
            row,
            col,
            top,
            TerrainDirection.FillTopRightBottom,
          );
        } else {
          this.renderTerrain(row, col, top, TerrainDirection.FillTopRight);
        }
      } else if (bottom === top) {
        this.renderTerrain(row, col, top, TerrainDirection.FillTopBottom);
      }
    }

    if (left && left !== centerTerrainId) {
      if (right === left) {
        if (bottom === left) {
          this.renderTerrain(row, col, left, TerrainDirection.FillLeftRight);
        }
      } else if (bottom === left) {
        this.renderTerrain(row, col, left, TerrainDirection.FillBottomLeft);
      }
    }

    if (right && right !== centerTerrainId) {
      if (bottom === right) {
        this.renderTerrain(row, col, right, TerrainDirection.FillBottomRight);
      }
    }
  }

  private deleteTile(row: number, col: number) {
    const coordinateKey = this.createCoordinateKey(row, col);
    const nodes = this.tileNodes.get(coordinateKey);
    if (nodes) {
      nodes.forEach((node) => node.remove());
      this.tileNodes.delete(coordinateKey);
    }
  }

  protected update(deltaTime: number): void {
    if (this.spritesheetsLoaded) {
      super.update(deltaTime);
    }
  }

  public remove(): void {
    Object.values(this.spritesheets).forEach(({ src }) =>
      SpritesheetLoader.release(src)
    );
    super.remove();
  }
}
