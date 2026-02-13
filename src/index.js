import { Game } from "./game/index.js";
import { level1 } from "./levels/level1.js";

const canvas = document.querySelector("canvas");

const game = new Game(canvas, level1);
