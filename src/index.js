import { Game } from "./game/index.js";
import { level1 } from "./levels/level1.js";

const canvas = document.getElementById("game");

const game = new Game(canvas, level1);
game.start();
