import { canvas } from "../const/canvas.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../const/screen.js";
import { wool } from "../factory/wool.js";
import { Game } from "../game/index.js";
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
      wool(
        0,
        SCREEN_HEIGHT * 0.5 - (SCREEN_HEIGHT - CHARACTER_SIZE) / 4,
        SCREEN_WIDTH,
        (SCREEN_HEIGHT - CHARACTER_SIZE) / 2,
      ),
    );

    // Walls
    world.bodies.add(
      wool(
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
    );
    world.bodies.add(
      wool(
        SCREEN_WIDTH * 0.5 + (SCREEN_WIDTH - CHARACTER_SIZE) / 4 - 4,
        0,
        (SCREEN_WIDTH - CHARACTER_SIZE) / 2,
        SCREEN_HEIGHT,
      ),
    );
  },

  async complete() {
    await fadeOut();

    const game = new Game(canvas, level2);

    await fadeIn();

    game.start();
  },
};
