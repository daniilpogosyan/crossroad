import { Position } from "../../../types/position";
import { RoadEdge } from "../road-edge/road-edge";

let i = 0;
export class RoadNode {
  public id = i++;
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
    return { ...this.position };
  }

  constructor(private position: Position) {
    this.setPosition(position);
  }

  public addNeighbor(roadNode: RoadNode) {
    const existingEdgeFromRoadNodeToThisNode = roadNode
      .getNeighbors()
      .find((x) => x.node === this);
    console.log(`L30`, existingEdgeFromRoadNodeToThisNode);

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
