import { Game } from "./game/index.js";

const canvas = document.querySelector("canvas");

const game = new Game(canvas.getContext("2d"));
game.start();
