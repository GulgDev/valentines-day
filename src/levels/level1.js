import { Body } from "../game/objects/body.js";

export const level1 = {
  spawnPoints: [
    { x: -128, y: 0 },
    { x: 128, y: 0 },
  ],
  init(world) {
    world.bodies.add(Object.assign(new Body(0, 64, 512, 64), { static: true }));
  },
};
