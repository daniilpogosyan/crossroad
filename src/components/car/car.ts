import { CAR_WIDTH } from "../../constants/index";
import { Position } from "../../types/position";
import { RoadNode } from "../road/road-node/road-node";
import { getDistance, getNormalizedVector } from "../utils/get-random-color";

export class Car {
  private to: RoadNode;
  public position: Position;

  constructor(public speed: number, from: RoadNode, to: RoadNode) {
    this.position = from.getPosition();
    this.to = to;
  }

  move() {
    const toPosition = this.to.getPosition();

    const { x, y } = getNormalizedVector(this.position, toPosition);
    this.position.x += x * this.speed;
    this.position.y += y * this.speed;
  }

  getDestination() {
    return this.to;
  }

  place(from: RoadNode, to: RoadNode) {
    this.to = to;
    const startPosition = from.getPosition();
    this.position = startPosition;
  }

  hasArrived() {
    return getDistance(this.position, this.to.getPosition()) < CAR_WIDTH / 10;
  }
}
