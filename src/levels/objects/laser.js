import { laser } from "../../../res/index.js";
import { Sprite9Slice } from "../../game/objects/9-slice.js";
import { Character } from "../../game/objects/character.js";

export class Laser extends Sprite9Slice {
  static = true;
  collidable = false;

  constructor(x1, y1, x2, y2) {
    super(
      (x1 + x2) / 2,
      (y1 + y2) / 2,
      Math.abs(x2 - x1),
      Math.abs(y2 - y1),
      laser,
      0,
      4,
      0,
      4,
    );

    this.addEventListener("touch", ({ detail: { body } }) => {
      if (body instanceof Character) body.kill();
    });
  }
}
