import { fadeIn, fadeOut } from "../transition.js";

export async function end() {
  await fadeOut();

  document.getElementById("valentine").classList.add("visible");

  await fadeIn();

  new Vara(
    "#heart-text",
    "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Parisienne/Parisienne.json",
    [
      {
        text: "Happy Valentine's Day!",
      },
    ],
    {
      fontSize: (document.body.clientHeight / 100) * 6,
      strokeWidth: (document.body.clientHeight / 100) * 0.1,
      color: "gold",
      textAlign: "center",
    },
  );
}
