import { leverOff, leverOn } from "../../../res/index.js";
import { Character } from "../../game/objects/character.js";
import { Sprite } from "../../game/objects/sprite.js";

export class Lever extends Sprite {
  static = true;
  collidable = false;

  constructor(x, y, callback) {
    super(x, y, 16, 16, leverOff);

    this.addEventListener("touch", ({ detail: { body } }) => {
      if (body instanceof Character) {
        this.img = leverOn;
        callback(body);
      }
    });
  }
}
