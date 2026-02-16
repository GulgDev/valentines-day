import { Game } from "./game/index.js";
import { level1 } from "./levels/level1.js";

const canvas = document.getElementById("game");

import { level3 as level } from "./levels/level3.js";
const game = new Game(canvas, level); // level1
game.start();
