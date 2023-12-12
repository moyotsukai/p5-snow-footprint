export type Vec2 = {
  x: number,
  y: number
}

export const distance = (a: Vec2, b: Vec2): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

export const angleBwtween = (a: Vec2, b: Vec2): number => {
  const theta = Math.atan(-(b.y - a.y) / (b.x - a.x))
  if (isNaN(theta)) {
    if (b.y > a.y) {
      return 270
    } else {
      return 90
    }
  }

  if ((b.x - a.x) < 0) {
    return theta / Math.PI * 180 + 180
  }

  return theta / Math.PI * 180
}