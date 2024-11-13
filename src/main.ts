import { Car } from "./components/car/car";
import { CarView } from "./components/car/car.view";
import { RoadGraph } from "./components/road/road-graph/road-graph";
import { RoadGraphView } from "./components/road/road-graph/road-graph.view";
import { RoadNode } from "./components/road/road-node/road-node";

const nodes = [
  new RoadNode({ x: 50, y: 50 }),
  new RoadNode({ x: 100, y: 50 }),
  new RoadNode({ x: 200, y: 100 }),
  new RoadNode({ x: 100, y: 100 }),
  new RoadNode({ x: 100, y: 200 }),
  new RoadNode({ x: 50, y: 200 }),
  new RoadNode({ x: 200, y: 200 }),
];
nodes[0].addNeighbor(nodes[1]);
nodes[1].addNeighbor(nodes[2]);
nodes[1].addNeighbor(nodes[3]);
nodes[2].addNeighbor(nodes[3]);
nodes[3].addNeighbor(nodes[4]);
nodes[4].addNeighbor(nodes[5]);
nodes[5].addNeighbor(nodes[0]);
nodes[2].addNeighbor(nodes[6]);
nodes[6].addNeighbor(nodes[5]);

for (const node of nodes) {
  console.log(`L22`, node.getNeighbors().length, node.getPosition());
}

const graph = new RoadGraph(nodes[0]);

console.log(`L29`, graph.getAllEdgesAndNodes());
const graphView = new RoadGraphView(graph);

// graphView.draw();

function speedFunction(distance: number, distanceLeft: number) {
  return Math.sin((distanceLeft / distance) * Math.PI) + 0.1;
}

const cars = [
  new Car(speedFunction, nodes[0], nodes[1]),
  new Car(speedFunction, nodes[1], nodes[2]),
  new Car(speedFunction, nodes[1], nodes[3]),
  new Car(speedFunction, nodes[4], nodes[5]),
];

const carViews = cars.map((car) => new CarView(car));

function draw() {
  graphView.draw();

  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    const carView = carViews[i];
    car.move();

    if (car.hasArrived()) {
      const destination = car.getDestination();
      const destinationNeighbors = destination.getNeighbors();
      console.log(`L38`, destinationNeighbors);
      const nextDestination =
        destinationNeighbors[
          Math.floor(destinationNeighbors.length * Math.random())
        ];
      car.place(destination, nextDestination.node);
    }

    carView.draw();
  }

  // return;

  requestAnimationFrame(draw);
}

draw();
