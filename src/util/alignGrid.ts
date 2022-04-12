import { GameObjects } from "phaser";
import { Pos } from "./position";
import IBaseScene from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";

/*jshint esversion: 6 */
export class AlignGrid extends Phaser.GameObjects.Grid {
  private rows: number = 0;
  private cols: number = 0;
  private colour: Phaser.Display.Color;
  private container: Phaser.GameObjects.Container;
  private graphics!: Phaser.GameObjects.Graphics;
  private numberArray:GameObjects.Text[]=[];
  
  constructor(
    scene: IBaseScene,
    cols: number = 11,
    rows: number = 11,
    width: number = -1,
    height: number = -1,
    container?: Phaser.GameObjects.Container,
    colour: Phaser.Display.Color = Phaser.Display.Color.RandomRGB()
  ) {
    super(scene.getScene())
    this.setOrigin(0)
    this.x = 0
    this.y = 0

    this.colour = colour

    if (height === -1) {
      this.height = container ? container.getBounds().height : scene.getH();
    } else {
      this.height = height
    }
    if (width === -1) {
      this.width = container ? container.getBounds().width : scene.getW();
    } else {
      this.width = width
    }

    this.rows = rows;
    this.cols = cols;

    //cell width
    this.cellWidth = this.width / this.cols;
    //cell height
    this.cellHeight = this.height / this.rows;

    this.height = scene.getH();
    this.width = scene.getW();

    console.log(this.rows)
  }

  show() {
    this.setOutlineStyle(this.colour.color, 0.6);
  }

  placeAt(xx: number, yy: number, obj: IGameObj) {
    //calc position based upon the cellwidth and cellheight
    let x2 = this.cellWidth * xx + this.cellWidth / 2;
    let y2 = this.cellHeight * yy + this.cellHeight / 2;

    obj.x = x2;
    obj.y = y2;
  }

  placeAt2(xx: number, yy: number, obj: IGameObj) {
    let x2 = this.cellWidth * (xx - 1) + this.cellWidth;
    let y2 = this.cellHeight * (yy - 1) + this.cellHeight;

    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index: number, obj: IGameObj, useCenter = true) {
    let yy = Math.floor(index / this.cols);
    let xx = index - yy * this.cols;
    if (useCenter === true) {
      this.placeAt(xx, yy, obj);
    } else {
      this.placeAt2(xx, yy, obj);
    }
  }

  showNumbers() {
    this.show();
    let count = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let numText = this.scene
          .add.text(0, 0, count.toString(), { color: this.getColourString() });
        numText.setOrigin(0.5, 0.5);
        this.numberArray.push(numText);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }

  showPos() {
    this.show();
    let count = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let numText = this.scene
          .add.text(0, 0, j + "\n" + i, { color: this.getColourString() });
        numText.setOrigin(0.5, 0.5);
        this.numberArray.push(numText);
        this.placeAtIndex(count, numText);

        count++;
      }
    }
  }

  findNearestIndex(xx: number, yy: number) {
    let row = Math.floor(yy / this.cellHeight);
    let col = Math.floor(xx / this.cellWidth);
    let index = row * this.cols + col;
    return index;
  }

  findNearestGridXY(xx: number, yy: number) {
    let row = Math.floor(yy / this.cellHeight);
    let col = Math.floor(xx / this.cellWidth);
    return {
      x: col,
      y: row,
    };
  }

  hide()
  {
    if (this.graphics)
    {
      this.graphics.clear();
    }
   
    this.numberArray.forEach((t:Phaser.GameObjects.Text)=>{t.destroy()});
  }

  getPosByXY(xx: number, yy: number) {
    let index = this.findNearestIndex(xx, yy);
    return this.getPosByIndex(index);
  }

  getRealXY(xx: number, yy: number) {
    let x1: number = xx * this.cellWidth;
    let y1: number = yy * this.cellHeight;
    return new Pos(x1, y1);
  }

  getRealMiddleBotton(xx:number,yy:number)
  {
    let x1: number = (xx * this.cellWidth)+this.cellWidth/2;
    let y1: number = (yy + 1) * this.cellHeight;
    y1+=this.cellHeight;
    return new Pos(x1, y1);
  }

  getRealBottom(xx: number, yy: number) {
    let x1: number = xx * this.cellWidth;
    let y1: number = (yy + 1) * this.cellHeight;
    y1+=this.cellHeight;
    return new Pos(x1, y1);
  }

  getPosByIndex(index: number) {
    let yy = Math.floor(index / this.cols);
    let xx = index - yy * this.cols;
    let x2 = this.cellWidth * xx + this.cellWidth / 2;
    let y2 = this.cellHeight * yy + this.cellHeight / 2;
    return new Pos(x2, y2);
  }

  getColourString() {
    return Phaser.Display.Color.RGBToString(this.colour.red, this.colour.green, this.colour.blue)
  }
}
