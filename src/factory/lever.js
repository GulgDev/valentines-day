import { leverOff, leverOn } from "../../res/index.js";
import { Character } from "../game/objects/character.js";
import { Sprite } from "../game/objects/sprite.js";

export function lever(x, y, callback) {
  const sprite = Object.assign(new Sprite(x, y, 16, 16, leverOff), {
    static: true,
    collidable: false,
  });
  sprite.addEventListener("touch", ({ detail: { body } }) => {
    if (body instanceof Character) {
      sprite.img = leverOn;
      callback(body);
    }
  });
  return sprite;
}
