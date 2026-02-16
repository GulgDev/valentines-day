import {
  leverOffTop,
  leverOffRight,
  leverOffBottom,
  leverOffLeft,
  leverOnTop,
  leverOnRight,
  leverOnBottom,
  leverOnLeft,
} from "../../../res/index.js";
import { Character } from "../../game/objects/character.js";
import { Sprite } from "../../game/objects/sprite.js";

const leverOffVariants = [
    leverOffTop,
    leverOffRight,
    leverOffBottom,
    leverOffLeft,
  ],
  leverOnVariants = [leverOnTop, leverOnRight, leverOnBottom, leverOnLeft];

export class Lever extends Sprite {
  static = true;
  collidable = false;

  constructor(x, y, rotation, targets) {
    super(x, y, 16, 16, leverOffVariants[rotation]);
    this.addEventListener("touch", ({ detail: { body } }) => {
      if (body instanceof Character) {
        this.touchable = false;
        this.img = leverOnVariants[rotation];
        targets.forEach((target) => target.trigger());
      }
    });
  }
}
