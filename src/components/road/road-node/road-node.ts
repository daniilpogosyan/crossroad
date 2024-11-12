import { Position } from "../../../types/position";
import { RoadEdge } from "../road-edge/road-edge";

export class RoadNode {
  private position: Position | null = null;

  private neighbors: {
    node: RoadNode;
    edge: RoadEdge;
  }[] = [];

  public setPosition(position: Position) {
    this.position = position;
  }

  public getNeighbors() {
    return this.neighbors;
  }

  public getPosition() {
    if (!this.position) {
      return null;
    }

    return { ...this.position };
  }

  constructor(position?: Position) {
    if (position) {
      this.setPosition(position);
    }
  }

  protected canAddNeighbor() {
    return true;
  }

  public addNeighbor(roadNode: RoadNode) {
    if (!this.canAddNeighbor()) {
      throw new Error("Cannot add neighbor to road");
    }

    const existingEdgeFromRoadNodeToThisNode = roadNode
      .getNeighbors()
      .find((x) => x.node === this);

    const roadEdge =
      existingEdgeFromRoadNodeToThisNode?.edge ?? new RoadEdge(this, roadNode);

    this.neighbors.push({ edge: roadEdge, node: roadNode });
  }

  public removeNeighbor(roadNode: RoadNode) {
    this.neighbors = this.neighbors.filter(
      (neighbor) => roadNode !== neighbor.node
    );
  }
}
