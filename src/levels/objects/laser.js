import { laser, laserDeactivated } from "../../../res/index.js";
import { Sprite9Slice } from "../../game/objects/9-slice.js";
import { Character } from "../../game/objects/character.js";

export class Laser extends Sprite9Slice {
  static = true;
  collidable = false;

  constructor(x, y, w, h, active = true) {
    super(x, y, w, h, active ? laser : laserDeactivated, 0, 4, 0, 4);
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
