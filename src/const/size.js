import { SCREEN_WIDTH } from "./screen.js";

export const BIG_SIZE = 2048;

export const W_WALL = 64;
export const W_SECONDARY = 32;
export const X_EDGE = SCREEN_WIDTH / 2 - 4;
export const X_MID = (0 + W_WALL / 2 + X_EDGE) / 2;
export const X_MID0 = (0 + W_WALL / 2 + X_MID - W_SECONDARY / 2) / 2;
export const X_MID1 = (X_MID + W_SECONDARY / 2 + X_EDGE) / 2;
