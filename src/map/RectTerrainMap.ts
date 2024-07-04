import { IntegerUtil } from "@common-module/app";
import { SpritesheetData } from "pixi.js";
import Node from "../base/Node.js";
import Sprite from "../image/Sprite.js";
import SpritesheetLoader from "../texture/SpritesheetLoader.js";
import RectTileLoader from "./RectTileLoader.js";
import TerrainDirection from "./TerrainDirection.js";

interface RectTerrainMapOptions {
  extraTileLoadWidth?: number;
  extraTileLoadHeight?: number;
}

export default class RectTerrainMap extends RectTileLoader {
  private tileNodes: { [cord: string]: Node[] } = {};
  private spritesheetLoaded = false;

  constructor(
    tileSize: number,
    private spritesheets: {
      [id: string]: { src: string; atlas: SpritesheetData };
    },
    private terrains: {
      [id: string]: {
        [direction: string]: { spritesheet: string; frame: string }[];
      };
    },
    private terrainMap: { [cord: string]: string }, // { row, col } -> terrainId
    objects: {
      x: number;
      y: number;
      spritesheet: string;
      frame: string;
    }[],
    options: RectTerrainMapOptions = {},
  ) {
    super(tileSize, {
      extraTileLoadWidth: options.extraTileLoadWidth === undefined ||
          options.extraTileLoadWidth < tileSize
        ? tileSize
        : options.extraTileLoadWidth,
      extraTileLoadHeight: options.extraTileLoadHeight === undefined ||
          options.extraTileLoadHeight < tileSize
        ? tileSize
        : options.extraTileLoadHeight,
      loadTiles: (cords) => {
        for (const cord of cords) this.renderTile(cord.row, cord.col);
      },
      deleteTiles: (cords) => {
        for (const cord of cords) this.deleteTile(cord.row, cord.col);
      },
    });
    this.loadSpritesheets();
  }

  private async loadSpritesheets() {
    await Promise.all(
      Object.entries(this.spritesheets).map(async ([id, { src, atlas }]) =>
        await SpritesheetLoader.load(src, atlas)
      ),
    );
    this.spritesheetLoaded = true;
  }

  private renderTerrainTile(
    row: number,
    col: number,
    terrainId: string,
    direction: TerrainDirection,
  ) {
    const frames = this.terrains[terrainId]?.[direction];
    if (!frames || frames.length === 0) {
      throw new Error(`Terrain not found: ${terrainId}, ${direction}`);
    }

    const frame = frames[IntegerUtil.random(0, frames.length - 1)];
    const spritesheet = this.spritesheets[frame.spritesheet];
    const sprite = new Sprite(
      col * this.tileSize,
      row * this.tileSize,
      spritesheet.src,
      spritesheet.atlas,
      frame.frame,
    );
    this.append(sprite);

    const cordStr = `${row},${col}`;
    if (!this.tileNodes[cordStr]) this.tileNodes[cordStr] = [];
    this.tileNodes[cordStr].push(sprite);
  }

  private renderTile(row: number, col: number) {
    const center = this.terrainMap[`${row},${col}`];
    if (center) {
      this.renderTerrainTile(row, col, center, TerrainDirection.Center);
    }

    const topLeft = this.terrainMap[`${row - 1},${col - 1}`];
    const top = this.terrainMap[`${row - 1},${col}`];
    const topRight = this.terrainMap[`${row - 1},${col + 1}`];
    const left = this.terrainMap[`${row},${col - 1}`];
    const right = this.terrainMap[`${row},${col + 1}`];
    const bottomLeft = this.terrainMap[`${row + 1},${col - 1}`];
    const bottom = this.terrainMap[`${row + 1},${col}`];
    const bottomRight = this.terrainMap[`${row + 1},${col + 1}`];

    if (topLeft && top !== topLeft && left !== topLeft) {
      this.renderTerrainTile(row, col, topLeft, TerrainDirection.BottomRight);
    }
    if (top && left !== top && right !== top) {
      this.renderTerrainTile(row, col, top, TerrainDirection.Bottom);
    }
    if (topRight && top !== topRight && right !== topRight) {
      this.renderTerrainTile(row, col, topRight, TerrainDirection.BottomLeft);
    }
    if (left && top !== left && bottom !== left) {
      this.renderTerrainTile(row, col, left, TerrainDirection.Right);
    }
    if (right && top !== right && bottom !== right) {
      this.renderTerrainTile(row, col, right, TerrainDirection.Left);
    }
    if (bottomLeft && bottom !== bottomLeft && left !== bottomLeft) {
      this.renderTerrainTile(row, col, bottomLeft, TerrainDirection.TopRight);
    }
    if (bottom && left !== bottom && right !== bottom) {
      this.renderTerrainTile(row, col, bottom, TerrainDirection.Top);
    }
    if (bottomRight && bottom !== bottomRight && right !== bottomRight) {
      this.renderTerrainTile(row, col, bottomRight, TerrainDirection.TopLeft);
    }
  }

  private deleteTile(row: number, col: number) {
    const cordStr = `${row},${col}`;
    for (const tile of this.tileNodes[cordStr] ?? []) tile.delete();
    delete this.tileNodes[cordStr];
  }

  protected update(deltaTime: number): void {
    if (this.spritesheetLoaded) super.update(deltaTime);
  }

  public delete(): void {
    for (const data of Object.values(this.spritesheets)) {
      SpritesheetLoader.release(data.src);
    }
    super.delete();
  }
}
