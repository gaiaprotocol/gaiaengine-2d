import { IntegerUtils } from "@common-module/ts";
import { SpritesheetData } from "pixi.js";
import Coordinates from "../core/Coordinates.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AnimatedRectTerrainMapTile from "./AnimatedRectTerrainMapTile.js";
import RectTerrainMapTile from "./RectTerrainMapTile.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
import TileRange from "./TileRange.js";

interface SpritesheetInfo {
  src: string;
  atlas: SpritesheetData;
}

interface SpriteInfo {
  spritesheet: string;
  frame?: string;
  animation?: string;
  fps?: number;
  zIndex: number;
}

type TerrainDefinition = {
  [direction in TerrainDirection]?: SpriteInfo[];
};

interface TerrainDefinitions {
  [terrainId: string]: TerrainDefinition;
}

interface ObjectDefinitions {
  [objectId: string]: SpriteInfo;
}

interface MapObject {
  x: number;
  y: number;
  objectId: string;
}

export interface RectTerrainMapOptions {
  extraLoadTileCount?: number;
  debounceDelay?: number;
  tileFadeDuration?: number;
  onLoadTiles?: (coordinates: Coordinates[]) => void;
  onDeleteTiles?: (coordinates: Coordinates[]) => void;
  onTileRangeChanged?: (range: TileRange) => void;
}

export default class RectTerrainMap extends RectTileLoader {
  private tiles = new Map<
    string,
    (RectTerrainMapTile | AnimatedRectTerrainMapTile)[]
  >();
  private spritesheetsLoaded = false;

  constructor(
    tileSize: number,
    private spritesheets: { [id: string]: SpritesheetInfo },
    private terrains: TerrainDefinitions,
    private objects: ObjectDefinitions,
    private terrainMap: { [coordinateKey: string]: string },
    private mapObjects: MapObject[],
    private _options: RectTerrainMapOptions = {},
  ) {
    super(tileSize, {
      extraLoadTileCount: _options.extraLoadTileCount,
      debounceDelay: _options.debounceDelay,
      onLoadTiles: (coordinates) => {
        coordinates.forEach(({ x, y }) => this.renderTile(x, y));
        _options.onLoadTiles?.(coordinates);
      },
      onDeleteTiles: (coordinates) => {
        coordinates.forEach(({ x, y }) => this.deleteTile(x, y));
        _options.onDeleteTiles?.(coordinates);
      },
      onTileRangeChanged: (range) => _options.onTileRangeChanged?.(range),
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

    const tile = frame.animation
      ? new AnimatedRectTerrainMapTile(
        x * this.tileSize,
        y * this.tileSize,
        spritesheetInfo.src,
        spritesheetInfo.atlas,
        frame.animation,
        frame.fps!,
        this._options.tileFadeDuration,
      )
      : new RectTerrainMapTile(
        x * this.tileSize,
        y * this.tileSize,
        spritesheetInfo.src,
        spritesheetInfo.atlas,
        frame.frame,
        this._options.tileFadeDuration,
      );
    tile.zIndex = frame.zIndex;
    this.append(tile);

    const coordinateKey = this.createCoordinateKey(x, y);
    if (!this.tiles.has(coordinateKey)) {
      this.tiles.set(coordinateKey, []);
    }
    this.tiles.get(coordinateKey)!.push(tile);
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
          const tile = objectInfo.animation
            ? new AnimatedRectTerrainMapTile(
              mapObject.x,
              mapObject.y,
              spritesheetInfo.src,
              spritesheetInfo.atlas,
              objectInfo.animation,
              objectInfo.fps!,
              this._options.tileFadeDuration,
            )
            : new RectTerrainMapTile(
              mapObject.x,
              mapObject.y,
              spritesheetInfo.src,
              spritesheetInfo.atlas,
              objectInfo.frame,
              this._options.tileFadeDuration,
            );
          tile.zIndex = objectInfo.zIndex;
          this.append(tile);
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
    const nodes = this.tiles.get(coordinateKey);
    if (nodes) {
      nodes.forEach((node) => node.remove());
      this.tiles.delete(coordinateKey);
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
