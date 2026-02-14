import { Solid } from "../game/objects/solid.js";
import { fadeIn, fadeOut } from "../transition.js";

export const level1 = {
  characters: [
    { x: -128, y: 0, direction: 1 },
    { x: 128, y: 0, direction: -1 },
  ],
  init(world) {
    world.bodies.add(
      Object.assign(new Solid(0, 64, 512, 64, "#444"), { static: true }),
    );
  },
  async complete() {
    await fadeOut();
    await fadeIn();
  },
};
