import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { BIG_SIZE } from "../const/size.js";
import { CHARACTER_SIZE } from "../game/objects/character.js";
import { Cloud } from "./objects/cloud.js";
import { Slime } from "./objects/slime.js";
import { Wool } from "./objects/wool.js";
import { end } from "./end.js";

export const level3 = {
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
    world.bodies.add(
      new Wool(0, -112 + 4, 64, 256),
    );

    world.bodies.add(new Cloud(128, -64, 128, -192));

    world.bodies.add(new Slime(128 - 64, -364, 32, 256));
    world.bodies.add(new Slime(128 + 64, -364, 32, 256));
  },

  complete: end,
};
