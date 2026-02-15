import { wool } from "../../../res/index.js";
import { Sprite9Slice } from "../../game/objects/9-slice.js";

export class Wool extends Sprite9Slice {
  static = true;

  constructor(x, y, w, h) {
    super(x, y, w, h, wool, 4, 4, 4, 4);
  }
}
