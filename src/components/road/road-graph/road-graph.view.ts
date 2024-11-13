import { RoadEdgeView } from "../road-edge/road-edge.view";
import { RoadNodeView } from "../road-node/road-node.view";
import { RoadGraph } from "./road-graph";

export class RoadGraphView {
  constructor(private roadGraph: RoadGraph) {
    roadGraph.root;
  }

  draw() {
    const { edges, nodes } = this.roadGraph.getAllEdgesAndNodes();

    for (const edge of edges) {
      const roadEdgeView = new RoadEdgeView(edge);
      roadEdgeView.draw();
    }

    for (const node of nodes) {
      const roadNodeView = new RoadNodeView(node);
      roadNodeView.draw();
    }
  }
}
