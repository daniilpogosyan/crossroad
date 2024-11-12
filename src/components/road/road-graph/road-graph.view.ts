import { RoadEdgeView } from "../road-edge/road-edge.view";
import { RoadGraph } from "./road-graph";

export class RoadGraphView {
  constructor(private roadGraph: RoadGraph) {
    roadGraph.root;
  }

  draw() {
    const edges = this.roadGraph.getAllEdges();

    for (const edge of edges) {
      const roadEdgeView = new RoadEdgeView(edge);
      roadEdgeView.draw();
    }
  }
}
