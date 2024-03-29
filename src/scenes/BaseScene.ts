/**
 * The base scene includes extra information
 * as well as the standard scene
 * passed to other classes as the IBaseScene interface
 */
export class BaseScene extends Phaser.Scene {
  public gw: number;
  public gh: number;
  public mobile: boolean;
  public debug: boolean;

  constructor(config: string) {
    super(config);
  }

  /**
   * overridden in scene class
   */
  create() {
    this.debug = this.registry.get("debug");
    this.mobile = this.registry.get("mobile");
    this.gw = this.game.config.width as number;
    this.gh = this.game.config.height as number;
  }

  /**
   * used when resizing the canvas
   * @param w
   * @param h
   */
  resetSize(w: number, h: number) {
    this.gw = w;
    this.gh = h;
  }

  /**
   * @returns the real scene
   */
  public getScene(): Phaser.Scene {
    return this;
  }

  /**
   * @returns the games width
   */
  public getW(): number {
    return this.gw;
  }

  /**
   * @returns the game height
   */
  public getH(): number {
    return this.gh;
  }
}
