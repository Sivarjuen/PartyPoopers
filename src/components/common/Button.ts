import "phaser";

import RexButton from "phaser3-rex-plugins/plugins/input/button/Button";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext.js";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import { Text } from "./Text";

export class Button {
  public shape: Phaser.GameObjects.Shape;
  public text: Text;
  public button: RexButton;
  public selected?: boolean;
  public applyBaseStyle?: () => void;
  public applyHoverStyle?: () => void;
  public applySelectedStyle?: () => void;
  public disableDefaultEvents = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    shape: Phaser.GameObjects.Shape,
    text?: string,
    textSize?: number,
    textStyle?: BBCodeText.TextStyle,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClick?: Function
  ) {
    if (shape) {
      this.shape = shape;
    } else {
      this.shape = new RoundRectangle(scene, x, y, width, height, 10);
      this.shape.setStrokeStyle(4, 0xffa500);
    }

    this.shape.setInteractive({ cursor: "pointer" });

    this.text = new Text(scene, x, y, text || "", "bFont", textSize || 36, textStyle);
    this.text.setOrigin(0.5, 0.5);

    if (textStyle === undefined) {
      this.text.setAlign("center");
      this.text.setColor("#FFA500");
    }

    this.button = new RexButton(this.shape, {});

    if (onClick) {
      this.button.on("click", (button, gameObject) => {
        onClick(button, gameObject);
      });
    }
  }

  private initEvents() {
    this.shape.on("pointerout", () => {
      if (this.applyBaseStyle && !this.disableDefaultEvents) {
        if (!this.selected || this.applySelectedStyle === undefined) {
          this.applyBaseStyle();
        }
      }
    });
    this.shape.on("pointerover", () => {
      if (this.applyHoverStyle && !this.disableDefaultEvents) {
        if (!this.selected || this.applySelectedStyle === undefined) {
          this.applyHoverStyle();
        }
      }
    });
    this.button.on("click", () => {
      if (this.applySelectedStyle && !this.disableDefaultEvents) {
        this.applySelectedStyle();
      }
    });
  }

  public addToScene(scene: Phaser.Scene) {
    scene.add.existing(this.shape);
    scene.add.existing(this.text);
  }

  public show() {
    this.shape.setVisible(true);
    this.text.setVisible(true);
  }

  public hide() {
    this.shape.setVisible(false);
    this.text.setVisible(false);
  }

  public setShapePosition(x: number, y: number) {
    this.shape.x = x;
    this.shape.y = y;
  }

  public setTextPosition(x: number, y: number) {
    this.text.x = x;
    this.text.y = y;
  }

  public setPosition(x: number, y: number) {
    this.setShapePosition(x, y);
    this.setTextPosition(x, y);
  }

  public setBaseStyle(fn: (b: Button) => void) {
    this.applyBaseStyle = () => fn(this);
    this.applyBaseStyle();
    this.initEvents();
  }

  public setHoverStyle(fn: (b: Button) => void) {
    this.applyHoverStyle = () => fn(this);
    this.initEvents();
  }

  public setSelectedStyle(fn: (b: Button) => void) {
    this.applySelectedStyle = () => fn(this);
    this.initEvents();
  }
}
