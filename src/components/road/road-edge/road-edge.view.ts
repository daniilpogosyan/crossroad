import { ROAD_WIDTH } from "../../../constants/index";
import { canvas } from "../../canvas";
import { getRandomColor } from "../../utils/get-random-color";
import { RoadEdge } from "./road-edge";

export class RoadEdgeView {
  constructor(private roadEdge: RoadEdge) {}

  draw() {
    const posA = this.roadEdge.aNode.getPosition();
    const posB = this.roadEdge.bNode.getPosition();

    canvas.ctx.lineWidth = ROAD_WIDTH;
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(posA.x, posA.y);
    canvas.ctx.strokeStyle = getRandomColor();
    canvas.ctx.lineTo(posB.x, posB.y);
    canvas.ctx.stroke();
  }
}
