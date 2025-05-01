export default interface Movable {
  x: number;
  y: number;

  minX: number;
  maxX: number;

  minY: number;
  maxY: number;

  speedX: number;
  speedY: number;

  accelX: number;
  accelY: number;

  minSpeedX: number;
  maxSpeedX: number;

  minSpeedY: number;
  maxSpeedY: number;

  targetX?: number;
  targetY?: number;
  onArrive?: () => void;
}
