import { canvas } from "../../canvas";
import { getRandomColor } from "../../utils/get-random-color";
import { RoadEdge } from "./road-edge";

export class RoadEdgeView {
  constructor(private roadEdge: RoadEdge) {}

  draw() {
    const posA = this.roadEdge.aNode.getPosition();
    const posB = this.roadEdge.bNode.getPosition();
    if (!posA || !posB) {
      throw new Error("Cannot draw edge. Node positions is not specified");
    }

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(posA.x, posA.y);
    canvas.ctx.lineWidth = 3 * 6;
    canvas.ctx.strokeStyle = getRandomColor();
    canvas.ctx.lineTo(posB.x, posB.y);
    canvas.ctx.stroke();
  }
}
