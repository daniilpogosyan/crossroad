import { RoadEdge } from "../road-edge/road-edge";
import { RoadNode } from "../road-node/road-node";

export class RoadGraph {
  constructor(public readonly root: RoadNode) {}

  getAllEdges() {
    const edges = new Set<RoadEdge>();
    const traversedNodes = new Set<RoadNode>();

    const traverse = (root: RoadNode) => {
      for (const { edge, node } of root.getNeighbors()) {
        if (!traversedNodes.has(node)) {
          traversedNodes.add(node);
          edges.add(edge);
          traverse(node);
        }
      }
    };

    traverse(this.root);

    return edges;
  }
}
