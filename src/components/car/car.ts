import { CAR_WIDTH } from "../../constants/index";
import { Position } from "../../types/position";
import { RoadNode } from "../road/road-node/road-node";
import { getDistance, getNormalizedVector } from "../utils/get-random-color";
// (.)(.)
export class Car {
  private from: RoadNode;
  private to: RoadNode;
  public position: Position;

  constructor(
    public speed: (distance: number, distanceLeft: number) => number,
    from: RoadNode,
    to: RoadNode
  ) {
    this.from = from;
    this.to = to;
    this.position = from.getPosition();
  }

  move() {
    const fromPosition = this.from.getPosition();
    const toPosition = this.to.getPosition();

    const { x, y } = getNormalizedVector(this.position, toPosition);
    const currentSpeed = this.speed(
      getDistance(fromPosition, toPosition),
      getDistance(this.position, toPosition)
    );
    console.log(`L30`, currentSpeed);
    this.position.x += x * currentSpeed;
    this.position.y += y * currentSpeed;
  }

  getDestination() {
    return this.to;
  }

  place(from: RoadNode, to: RoadNode) {
    this.from = from;
    this.to = to;
    const startPosition = from.getPosition();
    this.position = startPosition;
  }

  hasArrived() {
    return getDistance(this.position, this.to.getPosition()) < CAR_WIDTH / 10;
  }
}
