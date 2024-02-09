import { BaseScene } from "./BaseScene";

/**
 * The base game scene includes extra information
 * as well as the standard scene
 * passed to other classes as the IBaseScene interface
 */
export class GameScene extends BaseScene {
    constructor(config: string) {
        super(config);
    }

    /**
     * overridden in scene class
     */
    create() {
        super.create();
    }
}
