import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
export default class ZoneManager<T extends GameObject> extends GameNode {
    private zoneSize;
    private readonly objects;
    private readonly zones;
    constructor(zoneSize: number);
    addObject(object: T): void;
    getObjectsInZone(zoneX: number, zoneY: number): Set<T> | undefined;
    removeObject(object: T): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=ZoneManager.d.ts.map