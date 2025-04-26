import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";

export default class ZoneManager<T extends GameObject> extends GameNode {
  private readonly objects: Set<T> = new Set();
  private readonly zones: Map<number, Map<number, Set<T>>> = new Map();

  constructor(private zoneSize: number) {
    super();
  }

  public addObject(object: T): void {
    const zoneX = Math.floor(object.x / this.zoneSize);
    const zoneY = Math.floor(object.y / this.zoneSize);

    (object as any).__zoneX = zoneX;
    (object as any).__zoneY = zoneY;

    this.objects.add(object);

    let zoneSet = this.zones.get(zoneX);
    if (!zoneSet) {
      zoneSet = new Map();
      this.zones.set(zoneX, zoneSet);
    }
    let objectSet = zoneSet.get(zoneY);
    if (!objectSet) {
      objectSet = new Set();
      zoneSet.set(zoneY, objectSet);
    }
    objectSet.add(object);
  }

  public getObjectsInZone(
    zoneX: number,
    zoneY: number,
  ): Set<T> | undefined {
    return this.zones.get(zoneX)?.get(zoneY);
  }

  public removeObject(object: T): void {
    const zoneX = (object as any).__zoneX;
    const zoneY = (object as any).__zoneY;

    const zoneSet = this.zones.get(zoneX)!;
    const objectSet = zoneSet.get(zoneY)!;
    objectSet.delete(object);
    if (objectSet.size === 0) zoneSet.delete(zoneY);
    if (zoneSet.size === 0) this.zones.delete(zoneX);

    delete (object as any).__zoneX;
    delete (object as any).__zoneY;

    this.objects.delete(object);
  }

  protected update(deltaTime: number): void {
    super.update(deltaTime);

    for (const object of this.objects) {
      const zoneX = (object as any).__zoneX;
      const zoneY = (object as any).__zoneY;

      const newZoneX = Math.floor(object.x / this.zoneSize);
      const newZoneY = Math.floor(object.y / this.zoneSize);

      if (newZoneX !== zoneX) {
        const zoneSet = this.zones.get(zoneX)!;
        const objectSet = zoneSet.get(zoneY)!;
        objectSet.delete(object);
        if (objectSet.size === 0) zoneSet.delete(zoneY);
        if (zoneSet.size === 0) this.zones.delete(zoneX);

        (object as any).__zoneX = newZoneX;
        (object as any).__zoneY = newZoneY;

        let newZoneSet = this.zones.get(newZoneX);
        if (!newZoneSet) {
          newZoneSet = new Map();
          this.zones.set(newZoneX, newZoneSet);
        }
        let newObjectSet = newZoneSet.get(newZoneY);
        if (!newObjectSet) {
          newObjectSet = new Set();
          newZoneSet.set(newZoneY, newObjectSet);
        }
        newObjectSet.add(object);
      } else if (newZoneY !== zoneY) {
        const zoneSet = this.zones.get(zoneX)!;
        const objectSet = zoneSet.get(zoneY)!;
        objectSet.delete(object);
        if (objectSet.size === 0) zoneSet.delete(zoneY);

        (object as any).__zoneY = newZoneY;

        let newObjectSet = zoneSet.get(newZoneY);
        if (!newObjectSet) {
          newObjectSet = new Set();
          zoneSet.set(newZoneY, newObjectSet);
        }
        newObjectSet.add(object);
      }
    }
  }
}
