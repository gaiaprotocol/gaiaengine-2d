import { DomNode } from "@commonmodule/app";
export default class TransitionOverlay extends DomNode {
    constructor(callback) {
        super();
        this.style({
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: "999999",
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            opacity: "0",
            transition: "opacity 0.5s ease",
        });
        const fadeInHandler = (event) => {
            if (event.propertyName !== "opacity")
                return;
            this.offDom("transitionend", fadeInHandler);
            callback();
            this.style({ opacity: "0" });
            this.onDom("transitionend", fadeOutHandler);
        };
        const fadeOutHandler = (event) => {
            if (event.propertyName !== "opacity")
                return;
            this.remove();
        };
        this.onDom("transitionend", fadeInHandler);
        this.on("visible", () => requestAnimationFrame(() => this.style({ opacity: "1" })));
    }
}
//# sourceMappingURL=TransitionOverlay.js.map