import { whitePaw } from "../../res/index.js";
import { Sprite9Slice } from "../game/objects/9-slice.js";
import { fadeIn, fadeOut } from "../transition.js";

export const level1 = {
  characters: [
    { x: -128, y: 0, direction: 1 },
    { x: 128, y: 0, direction: -1 },
  ],
  init(world) {
    world.bodies.add(
      Object.assign(
        new Sprite9Slice(
          0,
          64,
          512,
          64,
          whitePaw,
          whitePaw,
          whitePaw,
          whitePaw,
          whitePaw,
          whitePaw,
          whitePaw,
          whitePaw,
          whitePaw,
        ),
        {
          static: true,
        },
      ),
    );
  },
  async complete() {
    await fadeOut();
    await fadeIn();
  },
};
