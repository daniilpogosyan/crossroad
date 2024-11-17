import { RoadNode } from "../road/road-node/road-node";
import { getDistance } from "../utils/get-random-color";
import { Car } from "./car";

describe("Car", () => {
  describe("getDestination", () => {
    test("returns `to` node", () => {
      const from = new RoadNode({ x: 0, y: 0 });
      const to = new RoadNode({ x: 3, y: 4 });
      const speed: (car: Car) => number = (car) => 0.2;

      const car = new Car(speed, from, to);

      expect(car.getDestination()).toBe(to);
    });
  });

  describe("move", () => {
    describe.each([
      [
        { x: 10, y: 10 },
        { x: 10, y: 0 },
      ],
      [
        { x: 10, y: 10 },
        { x: 0, y: 10 },
      ],
      [
        { x: 10, y: 10 },
        { x: 10, y: 20 },
      ],
      [
        { x: 10, y: 10 },
        { x: 20, y: 10 },
      ],
      [
        { x: 10, y: 10 },
        { x: 15, y: 15 },
      ],
    ])("from %j to %j", (fromPosition, toPosition) => {
      test("decreases distance between car and destination", () => {
        const from = new RoadNode(fromPosition);
        const to = new RoadNode(toPosition);
        const speed: (car: Car) => number = (car) => 0.2;

        const car = new Car(speed, from, to);

        const initialDistance = getDistance(car.position, to.getPosition());
        car.move();
        const distanceAfterMovement = getDistance(
          car.position,
          to.getPosition()
        );

        expect(distanceAfterMovement).toBeLessThan(initialDistance);
      });

      test("makes car reach destination eventually", () => {
        const from = new RoadNode(fromPosition);
        const to = new RoadNode(toPosition);
        const speed: (car: Car) => number = (car) => 0.2;

        const car = new Car(speed, from, to);
        let prevDistance = getDistance(car.position, to.getPosition());

        while (true) {
          car.move();
          const currentDistance = getDistance(car.position, to.getPosition());

          if (currentDistance < prevDistance) {
            prevDistance = currentDistance;
          } else {
            break;
          }
        }

        expect(getDistance(car.position, to.getPosition())).toBeCloseTo(0);
      });

      test("movement after reaching destination won't have effect", () => {
        const from = new RoadNode(fromPosition);
        const to = new RoadNode(toPosition);
        const speed: (car: Car) => number = (car) => 1;

        const car = new Car(speed, from, to);

        while (!car.hasArrived()) {
          car.move();
        }

        car.move();
        expect(car.hasArrived()).toBe(true);

        car.move();
        expect(car.hasArrived()).toBe(true);

        car.move();
        expect(car.hasArrived()).toBe(true);
      });
    });
  });
});
