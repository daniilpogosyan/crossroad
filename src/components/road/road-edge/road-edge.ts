import { RoadNode } from "../road-node/road-node";

export class RoadEdge {
  constructor(public aNode: RoadNode, public bNode: RoadNode) {
    console.log(`L5`, "CREATE EDGE", aNode, bNode);
  }
}
