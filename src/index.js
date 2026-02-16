import { Game } from "./game/index.js";
import { level1 as level } from "./levels/index.js";

const canvas = document.getElementById("game");

const game = new Game(canvas, level);
game.start();
