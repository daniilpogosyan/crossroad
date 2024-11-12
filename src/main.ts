import "../style.css";
import { RoadGraph } from "./components/road/road-graph/road-graph";
import { RoadGraphView } from "./components/road/road-graph/road-graph.view";
import { RoadNode } from "./components/road/road-node/road-node";

const nodes = [
  new RoadNode({ x: 0, y: 0 }),
  new RoadNode({ x: 50, y: 0 }),
  new RoadNode({ x: 50, y: 200 }),
  new RoadNode({ x: 100, y: 100 }),
  new RoadNode({ x: 200, y: 100 }),
];

nodes[0].addNeighbor(nodes[1]);
nodes[1].addNeighbor(nodes[2]);
nodes[2].addNeighbor(nodes[3]);
nodes[3].addNeighbor(nodes[0]);
nodes[3].addNeighbor(nodes[4]);

const graph = new RoadGraph(nodes[0]);
const graphView = new RoadGraphView(graph);

graphView.draw();

// const canvas = canvascavnas.canvas;
// const ctx = canvascavnas.ctx;
const canvas = document.createElement("canvas");

document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

if (!ctx) throw "gondon";

let raf: number;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function draw() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  // graphView.draw();

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
