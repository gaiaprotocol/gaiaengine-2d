import Sound from "./Sound";

export default class BackgroundMusic extends Sound {
  constructor(url: string) {
    super(url);
    this.loop = true;
  }

  public remove(): void {
    this.stop();
    //TODO:
  }
}
