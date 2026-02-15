import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { Wool } from "./objects/wool.js";
import { CHARACTER_SIZE } from "../game/objects/character.js";
import { level2 } from "./level2.js";
import { BIG_SIZE } from "../const/size.js";

export const level1 = {
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
  },

  complete(game) {
    game.transition(level2);
  },
};
