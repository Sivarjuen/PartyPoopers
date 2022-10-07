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

  constructor(sceneName: string) {
    super(sceneName);
  }

  /**
   * overridden in scene class
   */
  create() {
    this.debug = this.registry.get("debug");
    this.mobile = this.registry.get("mobile");
    // if(this.mobile && window.innerHeight < window.innerWidth) {
    //   this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Please turn your device \nto portrait mode and \nrefresh the page")
    //     .setFontSize(40)
    //     .setOrigin(0.5)
    //     .setPadding(10)
    //     .setStyle({fill: '#fff', align: 'center'})
    //   return
    // }
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
