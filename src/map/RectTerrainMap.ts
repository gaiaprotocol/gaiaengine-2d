import { IntegerUtils } from "@common-module/ts";
import Coordinates from "../core/Coordinates.js";
import Atlas from "../data/Atlas.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AnimatedRectTerrainMapTile from "./AnimatedRectTerrainMapTile.js";
import MapData from "./MapData.js";
import MapDataTransformer from "./MapDataTransformer.js";
import RectTerrainMapTile from "./RectTerrainMapTile.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
import TileRange from "./TileRange.js";

export interface RectTerrainMapOptions {
  extraLoadTileCount?: number;
  debounceDelay?: number;
  tileFadeDuration?: number;
  onLoadTiles?: (coordinates: Coordinates[]) => void;
  onDeleteTiles?: (coordinates: Coordinates[]) => void;
  onTileRangeChanged?: (range: TileRange) => void;
}

export default class RectTerrainMap extends RectTileLoader {
  private altases: Record<string, Atlas> = {};
  private tiles = new Map<
    string,
    (RectTerrainMapTile | AnimatedRectTerrainMapTile)[]
  >();
  private spritesheetsLoaded = false;

  constructor(
    tileSize: number,
    private spritesheets: { [id: string]: string },
    private mapData: MapData,
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

    this.altases = MapDataTransformer.transformToAtlases(mapData);
    this.loadSpritesheets();
  }

  private async loadSpritesheets() {
    await Promise.all(
      Object.entries(this.spritesheets).map(([id, src]) =>
        SpritesheetLoader.load(id, src, this.altases[id])
      ),
    );
    this.spritesheetsLoaded = true;
  }

  private createCoordinateKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  private getTerrainAt(x: number, y: number): string | undefined {
    return this.mapData.terrainMap[this.createCoordinateKey(x, y)];
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
    const terrain = this.mapData.terrains[terrainId];
    if (!terrain) {
      throw new Error(`Terrain ID ${terrainId} not found.`);
    }

    const terrainEntries = terrain.directions[direction];
    if (!terrainEntries || terrainEntries.length === 0) {
      throw new Error(
        `No terrain entries found for terrain ID ${terrainId} and direction ${direction}.`,
      );
    }

    const entryIndex = IntegerUtils.random(0, terrainEntries.length - 1);
    const entry = terrainEntries[entryIndex];
    const spritesheetSrc = this.spritesheets[entry.spritesheet];

    let tile;
    if (entry.frames.length > 1) {
      tile = new AnimatedRectTerrainMapTile(
        x * this.tileSize,
        y * this.tileSize,
        spritesheetSrc,
        this.altases[entry.spritesheet],
        `terrain_${terrainId}_${direction}_${entryIndex}`,
        entry.fps!,
        this._options.tileFadeDuration,
      );
    } else {
      const frame = entry.frames[0];
      tile = new RectTerrainMapTile(
        x * this.tileSize,
        y * this.tileSize,
        spritesheetSrc,
        this.altases[entry.spritesheet],
        `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`,
        this._options.tileFadeDuration,
      );
    }

    tile.drawingOrder = terrain.drawingOrder;
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
      this.renderTerrain(x, y, centerTerrainId, TerrainDirection.FillFull);
    }

    const neighbors = this.getNeighborTerrains(x, y);

    // Render terrains based on neighboring tiles
    this.renderSurroundingTerrains(x, y, centerTerrainId, neighbors);

    // Render map objects located on this tile
    for (const mapObject of this.mapData.mapObjects) {
      const objectX = Math.floor(mapObject.x / this.tileSize);
      const objectY = Math.floor(mapObject.y / this.tileSize);
      if (objectX === x && objectY === y) {
        const objectInfo = this.mapData.objects[mapObject.object];
        if (objectInfo) {
          const spritesheetSrc = this.spritesheets[objectInfo.spritesheet];

          let tile;
          if (objectInfo.frames.length > 1) {
            tile = new AnimatedRectTerrainMapTile(
              mapObject.x,
              mapObject.y,
              spritesheetSrc,
              this.altases[objectInfo.spritesheet],
              `object_${mapObject.object}`,
              objectInfo.fps!,
              this._options.tileFadeDuration,
            );
          } else {
            const frame = objectInfo.frames[0];
            tile = new RectTerrainMapTile(
              mapObject.x,
              mapObject.y,
              spritesheetSrc,
              this.altases[objectInfo.spritesheet],
              `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`,
              this._options.tileFadeDuration,
            );
          }

          if (objectInfo.drawingOrder) {
            tile.drawingOrder = objectInfo.drawingOrder;
          }
          if (objectInfo.useYForDrawingOrder) {
            tile.enableYBasedDrawingOrder();
          }

          this.append(tile);
        }
      }
    }
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
    Object.keys(this.spritesheets).forEach((id) =>
      SpritesheetLoader.release(id)
    );
    super.remove();
  }
}
