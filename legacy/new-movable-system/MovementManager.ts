import Movable from "./Movable.js";

class MovementManager {
  public static move(movable: Movable, deltaTime: number): void {
    movable.speedX += movable.accelX * deltaTime;
    movable.speedY += movable.accelY * deltaTime;

    if (movable.speedX < movable.minSpeedX) movable.speedX = movable.minSpeedX;
    if (movable.speedX > movable.maxSpeedX) movable.speedX = movable.maxSpeedX;
    if (movable.speedY < movable.minSpeedY) movable.speedY = movable.minSpeedY;
    if (movable.speedY > movable.maxSpeedY) movable.speedY = movable.maxSpeedY;

    movable.x += movable.speedX * deltaTime;
    movable.y += movable.speedY * deltaTime;

    if (movable.x < movable.minX) movable.x = movable.minX;
    if (movable.x > movable.maxX) movable.x = movable.maxX;
    if (movable.y < movable.minY) movable.y = movable.minY;
    if (movable.y > movable.maxY) movable.y = movable.maxY;

    if (movable.targetX !== undefined && movable.targetY !== undefined) {
      const toTargetX = movable.targetX - movable.x;
      const toTargetY = movable.targetY - movable.y;
      const distanceSq = toTargetX * toTargetX + toTargetY * toTargetY;

      // Predict distance we will move this frame. If we've arrived or overshot, snap to target.
      const travelledSq = (movable.speedX * deltaTime) ** 2 +
        (movable.speedY * deltaTime) ** 2;
      if (
        distanceSq <= travelledSq || Math.hypot(toTargetX, toTargetY) < 1e-3
      ) {
        movable.x = movable.targetX;
        movable.y = movable.targetY;
        movable.onArrive?.();
        this.stop(movable);
      }
    }
  }

  public static stop(movable: Movable): void {
    movable.speedX = 0;
    movable.speedY = 0;
    movable.targetX = undefined;
    movable.targetY = undefined;
    movable.onArrive = undefined;
  }
}

export default MovementManager;
