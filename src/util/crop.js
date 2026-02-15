const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

export function crop(img, x1, y1, x2, y2) {
  const cropped = new Image();
  if (img.complete) draw();
  else img.addEventListener("load", draw);
  return cropped;

  function draw() {
    const width = x2 - x1,
      height = y2 - y1;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, x1, y1, width, height, 0, 0, width, height);

    cropped.src = canvas.toDataURL();

    ctx.clearRect(0, 0, width, height);
  }
}
