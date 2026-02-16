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
