import { slime } from "../../../res/index.js";
import { Sprite9Slice } from "../../game/objects/9-slice.js";
import { Character } from "../../game/objects/character.js";

export class Slime extends Sprite9Slice {
  static = true;

  constructor(x, y, w, h) {
    super(x, y, w, h, slime, 4, 4, 4, 4);

    this.addEventListener("bumped", ({ detail: { body } }) => {
          if (body instanceof Character) {
            body.static = true;
          }
        });
  }
}
