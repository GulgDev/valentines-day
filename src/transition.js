import { gingerPaw, whitePaw } from "../res/index.js";

const ROWS = 5;
const COLS = 10;

const container = document.getElementById("overlay");

export async function fadeOut() {
  await Promise.all([
    container.animate(
      [{ backgroundColor: "transparent" }, { backgroundColor: "white" }],
      {
        duration: 12 * COLS * ROWS,
        fill: "both",
        easing: "linear",
      },
    ).finished,
    ...Array.from({ length: ROWS }).flatMap((_, i) =>
      Array.from({ length: COLS }).map((_, j) => {
        container
          .appendChild(((i + j) % 2 === 0 ? gingerPaw : whitePaw).cloneNode())
          .animate(
            [
              { width: 0, height: 0 },
              { width: "100%", height: "100%" },
            ],
            {
              duration: 32,
              delay: 12 * (i * COLS + j),
              fill: "both",
              easing: "ease-in",
            },
          ).finished;
      }),
    ),
  ]);
}

export async function fadeIn() {
  await Promise.all([
    container.animate(
      [{ backgroundColor: "white" }, { backgroundColor: "transparent" }],
      {
        duration: 12 * COLS * ROWS,
        fill: "both",
        easing: "linear",
      },
    ).finished,
    ...Array.from(container.childNodes).map(
      (img, i) =>
        img.animate(
          [
            { width: "100%", height: "100%" },
            { width: 0, height: 0 },
          ],
          {
            duration: 32,
            delay: 12 * i + 32,
            fill: "both",
            easing: "ease-out",
          },
        ).finished,
    ),
  ]);

  container.childNodes.forEach((child) => child.remove());
}
