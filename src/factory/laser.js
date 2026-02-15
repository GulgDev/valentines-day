import { laser as img } from "../../res/index.js";
import { Sprite9Slice } from "../game/objects/9-slice.js";
import { Character } from "../game/objects/character.js";

export function laser(x1, y1, x2, y2) {
  const sprite = Object.assign(
    new Sprite9Slice(
      (x1 + x2) / 2,
      (y1 + y2) / 2,
      Math.abs(x2 - x1),
      Math.abs(y2 - y1),
      img,
      0,
      4,
      0,
      4,
    ),
    {
      static: true,
    },
  );
  sprite.addEventListener("touch", ({ detail: { body } }) => {
    console.log(body);
    if (body instanceof Character) body.kill();
  });
  return sprite;
}
