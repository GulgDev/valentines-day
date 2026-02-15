import { wool as img } from "../../res/index.js";
import { Sprite9Slice } from "../game/objects/9-slice.js";

export function wool(x, y, w, h) {
  return Object.assign(new Sprite9Slice(x, y, w, h, img, 4, 4, 4, 4), {
    static: true,
  });
}
