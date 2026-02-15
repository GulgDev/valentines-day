import { Game } from "./game/index.js";
import { level1 } from "./levels/level1.js";

const canvas = document.getElementById("game");

import { level2 } from "./levels/level2.js";
const game = new Game(canvas, level2); // level1
game.start();
