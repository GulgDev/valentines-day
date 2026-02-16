export function eq(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function moveTowards(current, target, maxDistanceDelta) {
  const dx = target.x - current.x,
    dy = target.y - current.y;
  const dist = Math.sqrt(dx ** 2 + dy ** 2);
  if (dist <= maxDistanceDelta) return target;
  return {
    x: current.x + (dx / dist) * maxDistanceDelta,
    y: current.y + (dy / dist) * maxDistanceDelta,
  };
}

export function place(x, y, anchorX, anchorY, w, h) {
  return [x - (anchorX - 0.5) * w, y - (anchorY - 0.5) * h, w, h];
}

export function stretchY(x, y1, y2, anchorX, w) {
  return [x - (anchorX - 0.5) * w, (y1 + y2) / 2, w, Math.abs(y2 - y1)];
}
