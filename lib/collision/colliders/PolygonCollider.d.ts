import ColliderType from "./ColliderType.js";
export default interface PolygonCollider {
    type: ColliderType.Polygon;
    x: number;
    y: number;
    points: {
        x: number;
        y: number;
    }[];
}
//# sourceMappingURL=PolygonCollider.d.ts.map