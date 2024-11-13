import { ROAD_WIDTH } from "../../../constants/index";
import { canvas } from "../../canvas";
import { RoadNode } from "./road-node";

export class RoadNodeView {
  constructor(private roadNode: RoadNode) {}

  draw() {
    const position = this.roadNode.getPosition();

    canvas.ctx.beginPath();
    canvas.ctx.lineWidth = ROAD_WIDTH / 2;
    canvas.ctx.arc(position.x, position.y, ROAD_WIDTH / 4, 0, 2 * Math.PI);
    canvas.ctx.stroke();
  }
}
