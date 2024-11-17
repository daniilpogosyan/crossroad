import { Position } from "../../../types/position";
import { RoadEdge } from "../road-edge/road-edge";

export class RoadNode {
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
    const existingNeighborOfThis = this.neighbors.find(
      (x) => x.node === roadNode
    );
    if (existingNeighborOfThis) return;

    const existingEdgeFromRoadNodeToThisNode = roadNode
      .getNeighbors()
      .find((x) => x.node === this);

    const roadEdge =
      existingEdgeFromRoadNodeToThisNode?.edge ?? new RoadEdge(this, roadNode);

    this.neighbors.push({ edge: roadEdge, node: roadNode });
    roadNode.addNeighbor(this);
  }

  public removeNeighbor(roadNode: RoadNode) {
    let removed: boolean = false;

    this.neighbors = this.neighbors.filter((neighbor) => {
      if (roadNode === neighbor.node) {
        removed = true;
        return false;
      }

      return true;
    });

    if (removed) {
      roadNode.removeNeighbor(this);
    }
  }
}
