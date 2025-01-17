import { IntegerUtils } from "@common-module/ts";
import Coordinates from "../core/Coordinates.js";
import GameObject from "../core/GameObject.js";
import Atlas from "../data/Atlas.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AnimatedRectMapObject from "./AnimatedRectMapObject.js";
import AnimatedRectMapTerrain from "./AnimatedRectMapTerrain.js";
import MapData from "./MapData.js";
import MapDataTransformer from "./MapDataTransformer.js";
import RectMapObject from "./RectMapObject.js";
import RectMapTerrain from "./RectMapTerrain.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";
import TileRange from "./TileRange.js";

export interface RectMapOptions {
  extraLoadTileCount?: number;
  debounceDelay?: number;
  tileFadeDuration?: number;
  onLoadTiles?: (coordinates: Coordinates[]) => void;
  onDeleteTiles?: (coordinates: Coordinates[]) => void;
  onTileRangeChanged?: (range: TileRange) => void;
}

export default class RectMap extends RectTileLoader {
  private altases: Record<string, Atlas> = {};
  private spritesheetsLoaded = false;

  private terrainLayer: GameObject;
  private objectLayer: GameObject;
  private tiles = new Map<
    string,
    (RectMapTerrain | AnimatedRectMapTerrain)[]
  >();
  private objects = new Map<
    string,
    (RectMapObject | AnimatedRectMapObject)[]
  >();

  constructor(
    tileSize: number,
    private spritesheets: { [id: string]: string },
    private mapData: MapData,
    private _options: RectMapOptions = {},
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

    this.append(
      this.terrainLayer = new GameObject(0, 0),
      this.objectLayer = new GameObject(0, 0),
    );

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
    if (!terrainEntries || terrainEntries.length === 0) return;

    const entryIndex = IntegerUtils.random(0, terrainEntries.length - 1);
    const entry = terrainEntries[entryIndex];
    const spritesheetSrc = this.spritesheets[entry.spritesheet];

    let tile;
    if (entry.frames.length > 1) {
      tile = new AnimatedRectMapTerrain(
        x * this.tileSize,
        y * this.tileSize,
        {
          src: spritesheetSrc,
          atlas: this.altases[entry.spritesheet],
          animation: `terrain_${terrainId}_${direction}_${entryIndex}`,
          fps: entry.fps!,
          fadeDuration: this._options.tileFadeDuration,
        },
      );
    } else if (entry.frames.length === 1) {
      const frame = entry.frames[0];
      tile = new RectMapTerrain(
        x * this.tileSize,
        y * this.tileSize,
        spritesheetSrc,
        this.altases[entry.spritesheet],
        `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`,
        this._options.tileFadeDuration,
      );
    }

    if (tile) {
      tile.drawingOrder = terrain.drawingOrder;

      this.terrainLayer.append(tile);

      const coordinateKey = this.createCoordinateKey(x, y);
      if (!this.tiles.has(coordinateKey)) {
        this.tiles.set(coordinateKey, []);
      }
      this.tiles.get(coordinateKey)!.push(tile);
    }
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

          let object;
          if (objectInfo.frames.length > 1) {
            object = new AnimatedRectMapObject(
              mapObject.x,
              mapObject.y,
              {
                src: spritesheetSrc,
                atlas: this.altases[objectInfo.spritesheet],
                animation: `object_${mapObject.object}`,
                fps: objectInfo.fps!,
                fadeDuration: this._options.tileFadeDuration,
              },
            );
          } else {
            const frame = objectInfo.frames[0];
            object = new RectMapObject(
              mapObject.x,
              mapObject.y,
              spritesheetSrc,
              this.altases[objectInfo.spritesheet],
              `frame_${frame.x}_${frame.y}_${frame.width}_${frame.height}`,
              this._options.tileFadeDuration,
            );
          }

          if (objectInfo.drawingOrder) {
            object.drawingOrder = objectInfo.drawingOrder;
          }
          if (objectInfo.useYForDrawingOrder) {
            object.enableYBasedDrawingOrder();
          }

          this.objectLayer.append(object);

          const coordinateKey = this.createCoordinateKey(x, y);
          if (!this.objects.has(coordinateKey)) {
            this.objects.set(coordinateKey, []);
          }
          this.objects.get(coordinateKey)!.push(object);
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
    const tiles = this.tiles.get(coordinateKey);
    if (tiles) {
      tiles.forEach((node) => node.remove());
      this.tiles.delete(coordinateKey);
    }
    const objects = this.objects.get(coordinateKey);
    if (objects) {
      objects.forEach((node) => node.remove());
      this.objects.delete(coordinateKey);
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
