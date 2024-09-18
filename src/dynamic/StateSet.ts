import GameObject from "../core/GameObject.js";

export default class StateSet<T extends Record<string, GameObject>> {
  private currentObject: GameObject | undefined;

  constructor(
    target: GameObject,
    private states: T,
    private currentState: keyof T,
  ) {
    for (const state in states) {
      target.append(states[state]);
      if (state === currentState) this.currentObject = states[state];
      else states[state].hide();
    }
  }

  public set state(state: keyof T) {
    if (!this.states[state]) {
      throw new Error(`State "${String(state)}" does not exist.`);
    }
    this.currentObject?.hide();
    this.currentObject = this.states[state];
    this.currentObject.show();
    this.currentState = state;
  }

  public get state() {
    return this.currentState;
  }
}
