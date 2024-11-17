import { Car } from "./components/car/car";
import { CarView } from "./components/car/car.view";
import { RoadGraph } from "./components/road/road-graph/road-graph";
import { RoadGraphView } from "./components/road/road-graph/road-graph.view";
import { RoadNode } from "./components/road/road-node/road-node";
import { getDistance } from "./components/utils/get-random-color";

const nodes = [
  new RoadNode({ x: 50, y: 50 }),
  new RoadNode({ x: 100, y: 50 }),
  new RoadNode({ x: 200, y: 100 }),
  new RoadNode({ x: 100, y: 100 }),
  new RoadNode({ x: 100, y: 200 }),
  new RoadNode({ x: 50, y: 200 }),
];
nodes[0].addNeighbor(nodes[1]);
nodes[1].addNeighbor(nodes[2]);
nodes[1].addNeighbor(nodes[3]);
nodes[2].addNeighbor(nodes[3]);
nodes[3].addNeighbor(nodes[4]);
nodes[4].addNeighbor(nodes[5]);
nodes[5].addNeighbor(nodes[0]);

const graph = new RoadGraph(nodes[0]);
const graphView = new RoadGraphView(graph);

// graphView.draw();

const car = new Car(
  (car) => {
    const distance = getDistance(
      car.getStart().getPosition(),
      car.getDestination().getPosition()
    );
    const distanceLeft = getDistance(
      car.position,
      car.getDestination().getPosition()
    );
    return Math.sin((distanceLeft / distance) * Math.PI) + 0.1;
  },
  nodes[0],
  nodes[1]
);
car.place(nodes[0], nodes[1]);
const carView = new CarView(car);

function draw() {
  car.move();

  if (car.hasArrived()) {
    const destination = car.getDestination();
    const start = car.getStart();
    const destinationNeighborsWithoutStart = destination
      .getNeighbors()
      .filter((x) => x.node !== start);

    const nextDestination =
      destinationNeighborsWithoutStart[
        Math.floor(destinationNeighborsWithoutStart.length * Math.random())
      ]?.node ?? start;

    car.place(destination, nextDestination);
  }

  graphView.draw();
  carView.draw();

  requestAnimationFrame(draw);
}

draw();
