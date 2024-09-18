import GameObject from "../core/GameObject.js";
export default class StateSet<T extends Record<string, GameObject>> {
    private states;
    private currentState;
    private currentObject;
    constructor(target: GameObject, states: T, currentState: keyof T);
    set state(state: keyof T);
    get state(): keyof T;
}
//# sourceMappingURL=StateSet.d.ts.map