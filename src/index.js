import { canvas } from "./const/canvas.js";
import { Game } from "./game/index.js";
import { level1 } from "./levels/level1.js";

const game = new Game(canvas, level1);
game.start();
