import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { Wool } from "./objects/wool.js";
import { CHARACTER_SIZE } from "../game/objects/character.js";
import { level2 } from "./level2.js";
import { BIG_SIZE, X_EDGE } from "../const/size.js";
import { place } from "../util/math.js";

export const level1 = {
  characters: [
    { x: -128, y: 0, direction: 1 },
    { x: 128, y: 0, direction: -1 },
  ],

  init(world) {
    // Floor
    world.bodies.add(
      new Wool(
        ...place(
          0,
          CHARACTER_SIZE / 2,
          0.5,
          0,
          SCREEN_WIDTH,
          SCREEN_HEIGHT / 2,
        ),
      ),
    );

    // Walls
    world.bodies.add(
      new Wool(...place(-X_EDGE, 0, 1, 0.5, BIG_SIZE, BIG_SIZE)),
    );
    world.bodies.add(new Wool(...place(X_EDGE, 0, 0, 0.5, BIG_SIZE, BIG_SIZE)));
  },

  complete(game) {
    game.transition(level2);
  },
};
