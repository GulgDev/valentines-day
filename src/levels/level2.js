import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { Laser } from "./objects/laser.js";
import { Lever } from "./objects/lever.js";
import { Wool } from "./objects/wool.js";
import { CHARACTER_SIZE } from "../game/objects/character.js";
import { BIG_SIZE, INSET, W_WALL, X_EDGE } from "../const/size.js";
import { level3 } from "./level3.js";
import { place, stretch } from "../util/math.js";

export const level2 = {
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

    // Other
    world.bodies.add(new Wool(...place(0, -64, 0.5, 1, W_WALL, BIG_SIZE)));

    const laser1 = new Laser(
      ...stretch(
        -W_WALL / 2,
        0,
        CHARACTER_SIZE / 2 + INSET / 2,
        -64 - INSET / 2,
      ),
    );
    world.bodies.add(laser1);
    world.bodies.add(new Lever(-SCREEN_WIDTH / 2 + 10, 0, 3, [laser1]));

    const laser2 = new Laser(
      ...stretch(
        0,
        W_WALL / 2,
        CHARACTER_SIZE / 2 + INSET / 2,
        -64 - INSET / 2,
      ),
    );
    world.bodies.add(laser2);
    world.bodies.add(new Lever(SCREEN_WIDTH / 2 - 10, 0, 1, [laser2]));
  },

  complete(game) {
    game.transition(level3);
  },
};
