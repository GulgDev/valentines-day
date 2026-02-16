import { laser, laserDeactivated } from "../../../res/index.js";
import { Sprite9Slice } from "../../game/objects/9-slice.js";
import { Character } from "../../game/objects/character.js";

export class Laser extends Sprite9Slice {
  static = true;
  collidable = false;

  constructor(x1, y1, x2, y2, active = true) {
    super(
      (x1 + x2) / 2,
      (y1 + y2) / 2,
      Math.abs(x2 - x1),
      Math.abs(y2 - y1),
      active ? laser : laserDeactivated,
      0,
      4,
      0,
      4,
    );
    this.touchable = active;

    this.addEventListener("touch", ({ detail: { body } }) => {
      if (body instanceof Character) body.kill();
    });
  }

  trigger() {
    if (this.touchable) {
      this.setImage(laserDeactivated, 0, 4, 0, 4);
      this.touchable = false;
    } else {
      this.setImage(laser, 0, 4, 0, 4);
      this.touchable = true;
    }
  }
}
