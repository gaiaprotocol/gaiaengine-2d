import GameNode from "../core/GameNode.js";
export default class ZoneManager extends GameNode {
    zoneSize;
    objects = new Set();
    zones = new Map();
    constructor(zoneSize) {
        super();
        this.zoneSize = zoneSize;
    }
    addObject(object) {
        const zoneX = Math.floor(object.x / this.zoneSize);
        const zoneY = Math.floor(object.y / this.zoneSize);
        object.__zoneX = zoneX;
        object.__zoneY = zoneY;
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
    getObjectsInZone(zoneX, zoneY) {
        return this.zones.get(zoneX)?.get(zoneY);
    }
    removeObject(object) {
        const zoneX = object.__zoneX;
        const zoneY = object.__zoneY;
        const zoneSet = this.zones.get(zoneX);
        const objectSet = zoneSet.get(zoneY);
        objectSet.delete(object);
        if (objectSet.size === 0)
            zoneSet.delete(zoneY);
        if (zoneSet.size === 0)
            this.zones.delete(zoneX);
        delete object.__zoneX;
        delete object.__zoneY;
        this.objects.delete(object);
    }
    update(deltaTime) {
        super.update(deltaTime);
        for (const object of this.objects) {
            const zoneX = object.__zoneX;
            const zoneY = object.__zoneY;
            const newZoneX = Math.floor(object.x / this.zoneSize);
            const newZoneY = Math.floor(object.y / this.zoneSize);
            if (newZoneX !== zoneX) {
                const zoneSet = this.zones.get(zoneX);
                const objectSet = zoneSet.get(zoneY);
                objectSet.delete(object);
                if (objectSet.size === 0)
                    zoneSet.delete(zoneY);
                if (zoneSet.size === 0)
                    this.zones.delete(zoneX);
                object.__zoneX = newZoneX;
                object.__zoneY = newZoneY;
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
            }
            else if (newZoneY !== zoneY) {
                const zoneSet = this.zones.get(zoneX);
                const objectSet = zoneSet.get(zoneY);
                objectSet.delete(object);
                if (objectSet.size === 0)
                    zoneSet.delete(zoneY);
                object.__zoneY = newZoneY;
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
//# sourceMappingURL=ZoneManager.js.map