export default interface Coordinates {
  x: number;
  y: number;
}

export function compareCoordinates(
  a: Coordinates | undefined,
  b: Coordinates | undefined,
) {
  return a?.x === b?.x && a?.y === b?.y;
}
