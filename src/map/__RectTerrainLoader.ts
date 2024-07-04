import Node from "../base/Node.js";
import RectTileLoader from "./RectTileLoader.js";

interface RectTileData {
}

interface RectTerrainLoaderOptions {
  extraTileLoadWidth?: number;
  extraTileLoadHeight?: number;
  loadTiles: (cords: { row: number; col: number }[]) => Promise<RectTileData[]>;
  onDeletedTiles?: (cords: { row: number; col: number }[]) => void;
}

/*
class RectTerrainLoader extends RectTileLoader {
  private loadingTiles: { row: number; col: number }[] = [];
  private tiles: { [cord: string]: Node[] } = {};

  constructor(tileSize: number, private options: RectTerrainLoaderOptions) {
    super(tileSize, {
      extraTileLoadWidth: options.extraTileLoadWidth === undefined ||
          options.extraTileLoadWidth < tileSize
        ? tileSize
        : options.extraTileLoadWidth,
      extraTileLoadHeight: options.extraTileLoadHeight === undefined ||
          options.extraTileLoadHeight < tileSize
        ? tileSize
        : options.extraTileLoadHeight,
      loadTiles: (cords) => this.loadTiles(cords),
      deleteTiles: (cords) => this.deleteTiles(cords),
    });
  }

  private renderTile() {
    //TODO:
  }

  private renderTerrain(row: number, col: number, data: RectTileData) {
    //TODO:
  }

  private async loadTiles(cords: { row: number; col: number }[]) {
    const toLoadCords: { row: number; col: number }[] = [];
    for (const cord of cords) {
      if (
        !this.loadingTiles.find((c) => c.row === cord.row && c.col === cord.col)
      ) toLoadCords.push(cord);
    }
    this.loadingTiles.push(...toLoadCords);

    const data = await this.options.loadTiles(toLoadCords);
    //TODO:
  }

  private deleteTiles(cords: { row: number; col: number }[]) {
    for (const cord of cords) {
      const cordStr = `${cord.row},${cord.col}`;
      for (const tile of this.tiles[cordStr] ?? []) tile.delete();
      delete this.tiles[cordStr];
    }
    if (this.options.onDeletedTiles) this.options.onDeletedTiles(cords);
  }
}
*/