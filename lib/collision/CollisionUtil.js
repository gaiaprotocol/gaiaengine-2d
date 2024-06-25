import ColliderType from "./ColliderType.js";
class CollisionUtil {
    checkBetween(point, start, end) {
        return (start - point) * (end - point) <= 0;
    }
    checkPointInRect(px, py, rx, ry, rw, rh, rsin, rcos) {
        px -= rx;
        py -= ry;
        const x = rx + rcos * px + rsin * py;
        const y = ry - rsin * px + rcos * py;
        rx -= rw / 2;
        ry -= rh / 2;
        return this.checkBetween(x, rx, rx + rw) &&
            this.checkBetween(y, ry, ry + rh);
    }
    checkLineAndLine(asx, asy, aex, aey, bsx, bsy, bex, bey) {
        const d = (aex - asx) * (bey - bsy) - (bex - bsx) * (aey - asy);
        if (d === 0)
            return false;
        else {
            const ua = ((bey - bsy) * (bex - asx) + (bsx - bex) * (bey - asy)) / d;
            const ub = ((asy - aey) * (bex - asx) + (aex - asx) * (bey - asy)) / d;
            return 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1;
        }
    }
    checkRectAndRect(ac, at, bc, bt) {
        const ax = at.x + ac.x * at.scaleX;
        const ay = at.y + ac.y * at.scaleY;
        const bx = bt.x + bc.x * bt.scaleX;
        const by = bt.y + bc.y * bt.scaleY;
        const aw = ac.width * at.scaleX;
        const ah = ac.height * at.scaleY;
        const bw = bc.width * bt.scaleX;
        const bh = bc.height * bt.scaleY;
        const acos = Math.cos(at.rotation);
        const asin = Math.sin(at.rotation);
        const bcos = Math.cos(bt.rotation);
        const bsin = Math.sin(bt.rotation);
        const acw = acos * aw * 0.5;
        const ach = acos * ah * 0.5;
        const asw = -asin * aw * 0.5;
        const ash = -asin * ah * 0.5;
        const a1x = ax - acw - ash;
        const a1y = ay - ach + asw;
        const a2x = ax + acw - ash;
        const a2y = ay - ach - asw;
        const a3x = ax + acw + ash;
        const a3y = ay + ach - asw;
        const a4x = ax - acw + ash;
        const a4y = ay + ach + asw;
        if (this.checkPointInRect(a1x, a1y, bx, by, bw, bh, bsin, bcos) ||
            this.checkPointInRect(a2x, a2y, bx, by, bw, bh, bsin, bcos) ||
            this.checkPointInRect(a3x, a3y, bx, by, bw, bh, bsin, bcos) ||
            this.checkPointInRect(a4x, a4y, bx, by, bw, bh, bsin, bcos)) {
            return true;
        }
        const bcw = bcos * bw * 0.5;
        const bch = bcos * bh * 0.5;
        const bsw = -bsin * bw * 0.5;
        const bsh = -bsin * bh * 0.5;
        const b1x = bx - bcw - bsh;
        const b1y = by - bch + bsw;
        const b2x = bx + bcw - bsh;
        const b2y = by - bch - bsw;
        const b3x = bx + bcw + bsh;
        const b3y = by + bch - bsw;
        const b4x = bx - bcw + bsh;
        const b4y = by + bch + bsw;
        if (this.checkPointInRect(b1x, b1y, ax, ay, aw, ah, asin, acos) ||
            this.checkPointInRect(b2x, b2y, ax, ay, aw, ah, asin, acos) ||
            this.checkPointInRect(b3x, b3y, ax, ay, aw, ah, asin, acos) ||
            this.checkPointInRect(b4x, b4y, ax, ay, aw, ah, asin, acos)) {
            return true;
        }
        return this.checkLineAndLine(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) ||
            this.checkLineAndLine(a1x, a1y, a2x, a2y, b2x, b2y, b3x, b3y) ||
            this.checkLineAndLine(a1x, a1y, a2x, a2y, b3x, b3y, b4x, b4y) ||
            this.checkLineAndLine(a1x, a1y, a2x, a2y, b4x, b4y, b1x, b1y) ||
            this.checkLineAndLine(a2x, a2y, a3x, a3y, b1x, b1y, b2x, b2y) ||
            this.checkLineAndLine(a2x, a2y, a3x, a3y, b2x, b2y, b3x, b3y) ||
            this.checkLineAndLine(a2x, a2y, a3x, a3y, b3x, b3y, b4x, b4y) ||
            this.checkLineAndLine(a2x, a2y, a3x, a3y, b4x, b4y, b1x, b1y) ||
            this.checkLineAndLine(a3x, a3y, a4x, a4y, b1x, b1y, b2x, b2y) ||
            this.checkLineAndLine(a3x, a3y, a4x, a4y, b2x, b2y, b3x, b3y) ||
            this.checkLineAndLine(a3x, a3y, a4x, a4y, b3x, b3y, b4x, b4y) ||
            this.checkLineAndLine(a3x, a3y, a4x, a4y, b4x, b4y, b1x, b1y) ||
            this.checkLineAndLine(a4x, a4y, a1x, a1y, b1x, b1y, b2x, b2y) ||
            this.checkLineAndLine(a4x, a4y, a1x, a1y, b2x, b2y, b3x, b3y) ||
            this.checkLineAndLine(a4x, a4y, a1x, a1y, b3x, b3y, b4x, b4y) ||
            this.checkLineAndLine(a4x, a4y, a1x, a1y, b4x, b4y, b1x, b1y);
    }
    check(ac, at, bc, bt) {
        if (ac.type === ColliderType.Rect && bc.type === ColliderType.Rect) {
            return this.checkRectAndRect(ac, at, bc, bt);
        }
        return false;
    }
}
export default new CollisionUtil();
//# sourceMappingURL=CollisionUtil.js.map