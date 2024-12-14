import { IntegerUtils } from "@common-module/ts";
import { SpritesheetData } from "pixi.js";
import GameNode from "../core/GameNode.js";
import Sprite from "../image/Sprite.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
import TileRange from "./TileRange.js";

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

export interface RectTerrainMapOptions {
  extraTileLoadWidth?: number;
  extraTileLoadHeight?: number;
  onTileRangeChanged?: (range: TileRange) => void;
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
      onLoadTiles: (coordinates) =>
        coordinates.forEach(({ x, y }) => this.renderTile(x, y)),
      onDeleteTiles: (coordinates) =>
        coordinates.forEach(({ x, y }) => this.deleteTile(x, y)),
      onTileRangeChanged: (range) => options.onTileRangeChanged?.(range),
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

  private createCoordinateKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  private getTerrainAt(x: number, y: number): string | undefined {
    return this.terrainMap[this.createCoordinateKey(x, y)];
  }

  private getNeighborTerrains(x: number, y: number) {
    return {
      topLeft: this.getTerrainAt(x - 1, y - 1),
      top: this.getTerrainAt(x, y - 1),
      topRight: this.getTerrainAt(x + 1, y - 1),
      left: this.getTerrainAt(x - 1, y),
      right: this.getTerrainAt(x + 1, y),
      bottomLeft: this.getTerrainAt(x - 1, y + 1),
      bottom: this.getTerrainAt(x, y + 1),
      bottomRight: this.getTerrainAt(x + 1, y + 1),
    };
  }

  private renderTerrain(
    x: number,
    y: number,
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
    const spritesheetInfo = this.spritesheets[frame.spritesheet];

    const sprite = new Sprite(
      x * this.tileSize,
      y * this.tileSize,
      spritesheetInfo.src,
      spritesheetInfo.atlas,
      frame.frame,
    );
    sprite.zIndex = frame.zIndex;
    this.append(sprite);

    const coordinateKey = this.createCoordinateKey(x, y);
    if (!this.tileNodes.has(coordinateKey)) {
      this.tileNodes.set(coordinateKey, []);
    }
    this.tileNodes.get(coordinateKey)!.push(sprite);
  }

  private renderTile(x: number, y: number) {
    const centerTerrainId = this.getTerrainAt(x, y);
    if (centerTerrainId) {
      this.renderTerrain(x, y, centerTerrainId, TerrainDirection.Center);
    }

    const neighbors = this.getNeighborTerrains(x, y);

    // Render terrains based on neighboring tiles
    this.renderSurroundingTerrains(x, y, centerTerrainId, neighbors);

    // Render map objects located on this tile
    this.mapObjects.forEach((mapObject) => {
      const objectX = Math.floor(mapObject.x / this.tileSize);
      const objectY = Math.floor(mapObject.y / this.tileSize);
      if (objectX === x && objectY === y) {
        const objectInfo = this.objects[mapObject.objectId];
        if (objectInfo) {
          const spritesheetInfo = this.spritesheets[objectInfo.spritesheet];
          const sprite = new Sprite(
            mapObject.x,
            mapObject.y,
            spritesheetInfo.src,
            spritesheetInfo.atlas,
            objectInfo.frame,
          );
          sprite.zIndex = objectInfo.zIndex;
          this.append(sprite);
        }
      }
    });
  }

  private renderSurroundingTerrains(
    x: number,
    y: number,
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

    // Render corner merges
    if (
      bottomRight &&
      bottomRight !== centerTerrainId &&
      bottomRight !== right &&
      bottomRight !== bottom
    ) {
      this.renderTerrain(x, y, bottomRight, TerrainDirection.TopLeft);
    }
    if (
      bottom &&
      bottom !== centerTerrainId &&
      bottom !== left &&
      bottom !== right
    ) {
      this.renderTerrain(x, y, bottom, TerrainDirection.Top);
    }
    if (
      bottomLeft &&
      bottomLeft !== centerTerrainId &&
      bottomLeft !== left &&
      bottomLeft !== bottom
    ) {
      this.renderTerrain(x, y, bottomLeft, TerrainDirection.TopRight);
    }
    if (
      right &&
      right !== centerTerrainId &&
      right !== top &&
      right !== bottom
    ) {
      this.renderTerrain(x, y, right, TerrainDirection.Left);
    }
    if (
      left &&
      left !== centerTerrainId &&
      left !== top &&
      left !== bottom
    ) {
      this.renderTerrain(x, y, left, TerrainDirection.Right);
    }
    if (
      topRight &&
      topRight !== centerTerrainId &&
      topRight !== top &&
      topRight !== right
    ) {
      this.renderTerrain(x, y, topRight, TerrainDirection.BottomLeft);
    }
    if (
      top &&
      top !== centerTerrainId &&
      top !== left &&
      top !== right
    ) {
      this.renderTerrain(x, y, top, TerrainDirection.Bottom);
    }
    if (
      topLeft &&
      topLeft !== centerTerrainId &&
      topLeft !== top &&
      topLeft !== left
    ) {
      this.renderTerrain(x, y, topLeft, TerrainDirection.BottomRight);
    }

    // Complex fill logic
    if (top && top !== centerTerrainId) {
      if (left === top && right === top && bottom === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillFull);
      } else if (left === top && right === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillTopLeftRight);
      } else if (left === top && bottom === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillTopLeftBottom);
      } else if (right === top && bottom === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillTopRightBottom);
      } else if (left === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillTopLeft);
      } else if (right === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillTopRight);
      } else if (bottom === top) {
        this.renderTerrain(x, y, top, TerrainDirection.FillTopBottom);
      }
    }

    if (left && left !== centerTerrainId) {
      if (right === left && bottom === left) {
        this.renderTerrain(x, y, left, TerrainDirection.FillBottomLeftRight);
      } else if (right === left) {
        this.renderTerrain(x, y, left, TerrainDirection.FillLeftRight);
      } else if (bottom === left) {
        this.renderTerrain(x, y, left, TerrainDirection.FillBottomLeft);
      }
    }

    if (right && right !== centerTerrainId) {
      if (bottom === right) {
        this.renderTerrain(x, y, right, TerrainDirection.FillBottomRight);
      }
    }

    if (bottom && bottom !== centerTerrainId) {
      if (left === bottom && right === bottom) {
        this.renderTerrain(x, y, bottom, TerrainDirection.FillBottomLeftRight);
      } else if (left === bottom) {
        this.renderTerrain(x, y, bottom, TerrainDirection.FillBottomLeft);
      } else if (right === bottom) {
        this.renderTerrain(x, y, bottom, TerrainDirection.FillBottomRight);
      }
    }
  }

  private deleteTile(x: number, y: number) {
    const coordinateKey = this.createCoordinateKey(x, y);
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
