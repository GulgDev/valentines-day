import { Body } from "../game/objects/body.js";

export const level1 = {
  characters: [
    { x: -128, y: 0, direction: 1 },
    { x: 128, y: 0, direction: -1 },
  ],
  init(world) {
    world.bodies.add(Object.assign(new Body(0, 64, 512, 64), { static: true }));
  },
};
