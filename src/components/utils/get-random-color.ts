import { Position } from "../../types/position";

export function getRandomColor(): string {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const opacity = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");

  return "#aaaaaa";
  // return `#${red}${green}${blue}${99}`;
}

export function isCloseToZero(n: number, eps: number = 1e-5) {
  return Math.abs(n) < Math.abs(eps);
}

export function getNormalizedVector(from: Position, to: Position) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (isCloseToZero(dx) && isCloseToZero(dy)) {
    return {
      x: 0,
      y: 0,
    };
  }

  const normalizer = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  return {
    x: dx / normalizer,
    y: dy / normalizer,
  };
}

export function getDistance(p1: Position, p2: Position) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
