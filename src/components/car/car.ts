import { Position } from "../../types/position";
import { RoadNode } from "../road/road-node/road-node";
import { getDistance, getNormalizedVector } from "../utils/get-random-color";

export class Car {
  private to: RoadNode;
  private from: RoadNode;
  public position: Position;
  private speed: (car: Car) => number;

  constructor(speed: (car: Car) => number, from: RoadNode, to: RoadNode);
  constructor(speed: number, from: RoadNode, to: RoadNode);
  constructor(
    speed: ((car: Car) => number) | number,
    from: RoadNode,
    to: RoadNode
  ) {
    this.position = from.getPosition();
    this.to = to;
    this.from = from;

    this.speed = typeof speed === "function" ? speed : () => speed * 0.2;
  }

  move() {
    const toPosition = this.to.getPosition();

    const { x, y } = getNormalizedVector(this.position, toPosition);

    const dx =
      Math.sign(x) *
      Math.min(
        Math.abs(x * this.speed(this)),
        Math.abs(toPosition.x - this.position.x)
      );

    const dy =
      Math.sign(y) *
      Math.min(
        Math.abs(y * this.speed(this)),
        Math.abs(toPosition.y - this.position.y)
      );

    this.position.x += dx;
    this.position.y += dy;
  }

  getDestination() {
    return this.to;
  }

  getStart() {
    return this.from;
  }

  place(from: RoadNode, to: RoadNode) {
    this.to = to;
    this.from = from;

    const startPosition = from.getPosition();
    this.position = startPosition;
  }

  hasArrived() {
    return getDistance(this.position, this.to.getPosition()) < 1e-5;
  }

  getRoad() {
    return this.from.getNeighbors().find(({ node }) => node === this.to);
  }
}
