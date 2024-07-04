import { IntegerUtil } from "@common-module/app";
import { Rectangle, Sprite, Texture } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
import TerrainDirection from "./TerrainDirection.js";

interface TilesetTile {
  tilesetId: string;
  row: number;
  col: number;
}

interface AutotileTile {
  autotileId: string;
}

type TileData = TilesetTile | AutotileTile;

interface TilemapData {
  tileSize: number;
  autotiles: { [id: string]: { [direction: string]: TilesetTile[] } };
  tiles: { [position: string]: TileData };
}

class Tilemap extends Node {
  private tileTextures: { [key: string]: Texture } = {};
  private sprites: { [position: string]: Sprite[] } = {};

  constructor(
    x: number,
    y: number,
    private tilesetImages: { [tilesetId: string]: string },
    private data: TilemapData,
  ) {
    super(x, y);
    this.loadTextures();
  }

  private async loadTextures() {
    await Promise.all(
      Object.entries(this.tilesetImages).map(async ([tilesetId, src]) => {
        const texture = await TextureLoader.load(src);
        if (texture) {
          for (
            let row = 0;
            row < Math.floor(texture.height / this.data.tileSize);
            row++
          ) {
            for (
              let col = 0;
              col < Math.floor(texture.width / this.data.tileSize);
              col++
            ) {
              this.tileTextures[`${tilesetId}:${row},${col}`] = new Texture({
                source: texture.source,
                frame: new Rectangle(
                  col * this.data.tileSize,
                  row * this.data.tileSize,
                  this.data.tileSize,
                  this.data.tileSize,
                ),
              });
            }
          }
        }
      }),
    );

    if (this.deleted) return;

    const positions = Object.keys(this.data.tiles);
    if (positions.length === 0) return;

    let minRow = -Infinity;
    let minCol = -Infinity;
    let maxRow = Infinity;
    let maxCol = Infinity;

    for (const position of positions) {
      const split = position.split(",");
      const row = parseInt(split[0]);
      const col = parseInt(split[1]);
      if (row < minRow) minRow = row;
      if (col < minCol) minCol = col;
      if (row > maxRow) maxRow = row;
      if (col > maxCol) maxCol = col;
    }

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        const tile = this.data.tiles[`${row},${col}`];
        if (tile) this.renderSingleTile(row, col, tile);
      }
    }
  }

  private renderTilesetTile(row: number, col: number, tile: TilesetTile) {
    const texture =
      this.tileTextures[`${tile.tilesetId}:${tile.row},${tile.col}`];
    if (!texture) return;

    const sprite = new Sprite({
      x: col * this.data.tileSize,
      y: row * this.data.tileSize,
      texture,
      anchor: { x: 0.5, y: 0.5 },
    });
    this.container.addChild(sprite);

    const position = `${row},${col}`;
    if (!this.sprites[position]) this.sprites[position] = [];
    this.sprites[position].push(sprite);
  }

  private renderAutotileTile(
    row: number,
    col: number,
    autotileId: string,
    direction: TerrainDirection,
  ) {
    const autotile = this.data.autotiles[autotileId];
    const frames = autotile?.[direction];
    if (frames && frames.length > 0) {
      const frame = frames[IntegerUtil.random(0, frames.length - 1)];
      this.renderTilesetTile(row, col, frame);
    }
  }

  private renderSingleTile(row: number, col: number, tile: TileData) {
    const position = `${row},${col}`;
    for (const sprite of this.sprites[position] ?? []) {
      sprite.destroy();
    }
    this.sprites[position] = [];

    if ("tilesetId" in tile) {
      this.renderTilesetTile(row, col, tile);
    } else if ("autotileId" in tile) {
      this.renderAutotileTile(
        row,
        col,
        tile.autotileId,
        TerrainDirection.Center,
      );
    }

    const topLeft: any = this.data.tiles[`${row - 1},${col - 1}`] ?? {};
    const top: any = this.data.tiles[`${row - 1},${col}`] ?? {};
    const topRight: any = this.data.tiles[`${row - 1},${col + 1}`] ?? {};
    const left: any = this.data.tiles[`${row},${col - 1}`] ?? {};
    const right: any = this.data.tiles[`${row},${col + 1}`] ?? {};
    const bottomLeft: any = this.data.tiles[`${row + 1},${col - 1}`] ?? {};
    const bottom: any = this.data.tiles[`${row + 1},${col}`] ?? {};
    const bottomRight: any = this.data.tiles[`${row + 1},${col + 1}`] ?? {};

    // Check to draw bottom right
    if ("autotileId" in topLeft) {
      const autotileId = topLeft.autotileId;
      if (top.autotileId !== autotileId && left.autotileId !== autotileId) {
        this.renderAutotileTile(
          row,
          col,
          autotileId,
          TerrainDirection.BottomRight,
        );
      }
    }

    // Check to draw bottom
    if ("autotileId" in top) {
      const autotileId = top.autotileId;
      if (left.autotileId !== autotileId && right.autotileId !== autotileId) {
        this.renderAutotileTile(row, col, autotileId, TerrainDirection.Bottom);
      }
    }

    // Check to draw bottom left
    if ("autotileId" in topRight) {
      const autotileId = topRight.autotileId;
      if (top.autotileId !== autotileId && right.autotileId !== autotileId) {
        this.renderAutotileTile(
          row,
          col,
          autotileId,
          TerrainDirection.BottomLeft,
        );
      }
    }

    // Check to draw right
    if ("autotileId" in left) {
      const autotileId = left.autotileId;
      if (top.autotileId !== autotileId && bottom.autotileId !== autotileId) {
        this.renderAutotileTile(row, col, autotileId, TerrainDirection.Right);
      }
    }

    // Check to draw left
    if ("autotileId" in right) {
      const autotileId = right.autotileId;
      if (top.autotileId !== autotileId && bottom.autotileId !== autotileId) {
        this.renderAutotileTile(row, col, autotileId, TerrainDirection.Left);
      }
    }

    // Check to draw top right
    if ("autotileId" in bottomLeft) {
      const autotileId = bottomLeft.autotileId;
      if (bottom.autotileId !== autotileId && left.autotileId !== autotileId) {
        this.renderAutotileTile(
          row,
          col,
          autotileId,
          TerrainDirection.TopRight,
        );
      }
    }

    // Check to draw top
    if ("autotileId" in bottom) {
      const autotileId = bottom.autotileId;
      if (left.autotileId !== autotileId && right.autotileId !== autotileId) {
        this.renderAutotileTile(row, col, autotileId, TerrainDirection.Top);
      }
    }

    // Check to draw top left
    if ("autotileId" in bottomRight) {
      const autotileId = bottomRight.autotileId;
      if (bottom.autotileId !== autotileId && right.autotileId !== autotileId) {
        this.renderAutotileTile(
          row,
          col,
          autotileId,
          TerrainDirection.TopLeft,
        );
      }
    }
  }

  public addTile(row: number, col: number, tile: TileData) {
    this.data.tiles[`${row},${col}`] = tile;
    this.renderSingleTile(row, col, tile);
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r === row && c === col) continue;
        const tile = this.data.tiles[`${r},${c}`];
        if (!tile) continue;
        this.renderSingleTile(r, c, tile);
      }
    }
  }

  public delete(): void {
    for (const tileTexture of Object.values(this.tileTextures)) {
      for (const texture of Object.values(tileTexture)) {
        texture.destroy();
      }
    }
    (this.tileTextures as any) = undefined;

    for (const src of Object.values(this.tilesetImages)) {
      TextureLoader.release(src);
    }

    (this.sprites as any) = undefined;
    super.delete();
  }

  public getTileTexture(
    tilesetId: string,
    row: number,
    col: number,
  ): Texture | undefined {
    return this.tileTextures[`${tilesetId}:${row},${col}`];
  }
}
