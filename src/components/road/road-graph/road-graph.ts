import { RoadEdge } from "../road-edge/road-edge";
import { RoadNode } from "../road-node/road-node";

export class RoadGraph {
  constructor(public readonly root: RoadNode) {}

  getAllEdgesAndNodes() {
    const edges = new Set<RoadEdge>();
    const traversedNodes = new Set<RoadNode>();

    const traverse = (root: RoadNode) => {
      for (const { edge, node } of root.getNeighbors()) {
        edges.add(edge);
        if (!traversedNodes.has(node)) {
          traversedNodes.add(node);
          traverse(node);
        }
      }
    };

    traverse(this.root);

    return { edges, nodes: traversedNodes };
  }
}
