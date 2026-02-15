import { wool } from "../../res/index.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { Sprite9Slice } from "../game/objects/9-slice.js";
import { CHARACTER_SIZE } from "../game/objects/character.js";
import { fadeIn, fadeOut } from "../transition.js";

export const level1 = {
  characters: [
    { x: -128, y: 0, direction: 1 },
    { x: 128, y: 0, direction: -1 },
  ],
  init(world) {
    // Floor
    world.bodies.add(
      Object.assign(
        new Sprite9Slice(
          0,
          SCREEN_HEIGHT * 0.5 - (SCREEN_HEIGHT - CHARACTER_SIZE) / 4,
          SCREEN_WIDTH,
          (SCREEN_HEIGHT - CHARACTER_SIZE) / 2,
          wool,
          4,
          4,
          4,
          4,
        ),
        {
          static: true,
        },
      ),
    );

    // Walls
    world.bodies.add(
      Object.assign(
        new Sprite9Slice(
          SCREEN_WIDTH * -0.5 - (SCREEN_WIDTH - CHARACTER_SIZE) / 4 + 4,
          0,
          (SCREEN_WIDTH - CHARACTER_SIZE) / 2,
          SCREEN_HEIGHT,
          wool,
          4,
          4,
          4,
          4,
        ),
        {
          static: true,
        },
      ),
    );
    world.bodies.add(
      Object.assign(
        new Sprite9Slice(
          SCREEN_WIDTH * 0.5 + (SCREEN_WIDTH - CHARACTER_SIZE) / 4 - 4,
          0,
          (SCREEN_WIDTH - CHARACTER_SIZE) / 2,
          SCREEN_HEIGHT,
          wool,
          4,
          4,
          4,
          4,
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
