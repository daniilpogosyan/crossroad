import { CAR_WIDTH } from "../../constants/index";
import { canvas } from "../canvas";
import { Car } from "./car";

export class CarView {
  constructor(private car: Car) {}

  draw() {
    const position = this.car.position;
    if (!position) return;

    canvas.ctx.beginPath();
    canvas.ctx.lineWidth = CAR_WIDTH / 2;
    canvas.ctx.strokeStyle = "#aa0000";
    canvas.ctx.arc(position.x, position.y, CAR_WIDTH / 2, 0, 2 * Math.PI);
    canvas.ctx.stroke();
  }
}
