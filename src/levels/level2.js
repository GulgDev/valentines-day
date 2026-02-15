import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { Laser } from "./objects/laser.js";
import { Lever } from "./objects/lever.js";
import { Wool } from "./objects/wool.js";
import { CHARACTER_SIZE } from "../game/objects/character.js";
import { BIG_SIZE } from "../const/size.js";
import { end } from "./end.js";

export const level2 = {
  characters: [
    { x: -128, y: 0, direction: 1 },
    { x: 128, y: 0, direction: -1 },
  ],

  init(world) {
    // Floor
    world.bodies.add(
      new Wool(
        0,
        SCREEN_HEIGHT * 0.5 - (SCREEN_HEIGHT - CHARACTER_SIZE) / 4,
        SCREEN_WIDTH,
        (SCREEN_HEIGHT - CHARACTER_SIZE) / 2,
      ),
    );

    // Walls
    world.bodies.add(
      new Wool(SCREEN_WIDTH * -0.5 - BIG_SIZE / 2 + 4, 0, BIG_SIZE, BIG_SIZE),
    );
    world.bodies.add(
      new Wool(SCREEN_WIDTH * 0.5 + BIG_SIZE / 2 - 4, 0, BIG_SIZE, BIG_SIZE),
    );

    // Other
    world.bodies.add(new Wool(0, -64 - BIG_SIZE / 2, 58, BIG_SIZE));

    const laser1 = new Laser(-24, CHARACTER_SIZE / 2 + 2, 0, -64 - 2);
    world.bodies.add(laser1);
    world.bodies.add(
      new Lever(-SCREEN_WIDTH / 2 + 10, 0, 3, () => laser1.deactivate()),
    );

    const laser2 = new Laser(0, CHARACTER_SIZE / 2 + 2, 24, -64 - 2);
    world.bodies.add(laser2);
    world.bodies.add(
      new Lever(SCREEN_WIDTH / 2 - 10, 0, 1, () => laser2.deactivate()),
    );
  },

  complete() {
    end();
  },
};
