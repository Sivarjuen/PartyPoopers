import { IBaseScene } from "../interfaces/IBaseScene";
import Align from "../util/align";

import { AlignGrid } from "../util/alignGrid";

/**
 * The base scene includes extra information
 * as well as the standard scene
 * passed to other classes as the IBaseScene interface
 */
export class BaseScene extends Phaser.Scene implements IBaseScene {
  public gw: number;
  public gh: number;
  public mobile: boolean;
  public debug: boolean;
  
  //align grid
  public grid!: AlignGrid;
  /**
   * coordinates from align grid
   */
  public ch: number = 0;
  public cw: number = 0;
  public cd: number = 0;


  constructor(sceneName: string) {
    super(sceneName);
  }
  /**
   * 
   * @returns alginGrid
   */
  getGrid(): AlignGrid {
    return this.grid;
  }
  /**
   * overridden in scene class
   */
  create() {
    this.debug = this.registry.get("debug")
    this.mobile = this.registry.get("mobile")
    if(this.mobile && window.innerHeight < window.innerWidth) {
      this.add.text(window.innerWidth / 2, window.innerHeight / 2, "Please turn your device \nto portrait mode and \nrefresh the page")
        .setFontSize(40)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({fill: '#fff', align: 'center'})
      return
    }
    this.gw = this.game.config.width as number;
    this.gh = this.game.config.height as number;
  }
  /**
   * used when resizing the canvas
   * @param w 
   * @param h 
   */
  resetSize(w:number,h:number)
  {
    this.gw=w;
    this.gh=h;
  }
  /**
   * make the align grid
   * @param r rows
   * @param c columns
   */
  makeGrid(c: number = 11, r: number = 11) {
    this.grid = new AlignGrid(this, r, c);
    this.ch = this.grid.ch;
    this.cw = this.grid.cw;
    this.cd = this.grid.cd;
    if(this.debug) {
      this.grid.showNumbers();
    }
  }
  /**
   * 
   * @returns the real scene
   */
  public getScene(): Phaser.Scene {
    return this;
  }
  /**
   * 
   * @returns the games width
   */
  public getW(): number {
    return this.gw;
  }
  /**
   * 
   * @returns the game height
   */
  public getH(): number {
    return this.gh;
  }
}
