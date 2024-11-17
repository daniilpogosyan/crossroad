import { RoadNode } from "./road-node";

describe("RoadNode", () => {
  describe("position", () => {
    test("Can get position that is used in init", () => {
      const initPosition = { x: 5, y: 10 };
      const n = new RoadNode(initPosition);
      const nodePosition = n.getPosition();

      expect(nodePosition).toEqual(initPosition);
    });

    test("Can change position multiple times", () => {
      const initPosition = { x: 0, y: 0 };
      const n = new RoadNode(initPosition);
      expect(n.getPosition()).toEqual(initPosition);

      const newPosition1 = { x: 11, y: 22 };
      n.setPosition(newPosition1);
      expect(n.getPosition()).toEqual(newPosition1);

      const newPosition2 = { x: 100, y: 200 };
      n.setPosition(newPosition2);
      expect(n.getPosition()).toEqual(newPosition2);
    });
  });

  describe("addNeighbor", () => {
    const isCorrectGraphOf2Nodes = (n1: RoadNode, n2: RoadNode) => {
      const neighborsOfN1 = n1.getNeighbors();
      const neighborsOfN2 = n2.getNeighbors();

      expect(neighborsOfN1).toHaveLength(1);
      expect(neighborsOfN2).toHaveLength(1);

      expect(neighborsOfN1[0].edge).toBe(neighborsOfN2[0].edge);

      expect(neighborsOfN1[0].node).toBe(n2);
      expect(neighborsOfN2[0].node).toBe(n1);
    };

    test("works in both direction reusing existing edge", () => {
      const n1 = new RoadNode({ x: 1, y: 0 });
      const n2 = new RoadNode({ x: 2, y: 0 });

      n1.addNeighbor(n2);

      isCorrectGraphOf2Nodes(n1, n2);
    });

    test("doesn't have any effect with repeated calls", () => {
      const n1 = new RoadNode({ x: 1, y: 0 });
      const n2 = new RoadNode({ x: 2, y: 0 });

      n1.addNeighbor(n2);
      n1.addNeighbor(n2);
      n1.addNeighbor(n2);

      isCorrectGraphOf2Nodes(n1, n2);
    });

    test("has commutative property", () => {
      const n1 = new RoadNode({ x: 1, y: 0 });
      const n2 = new RoadNode({ x: 2, y: 0 });

      n1.addNeighbor(n2);
      n2.addNeighbor(n1);

      isCorrectGraphOf2Nodes(n1, n2);
    });
  });

  describe("removeNeighbor", () => {
    const isCorrectGraphOf2SeparateNodes = (n1: RoadNode, n2: RoadNode) => {
      const neighborsOfN1 = n1.getNeighbors();
      const neighborsOfN2 = n2.getNeighbors();

      expect(neighborsOfN1).toHaveLength(0);
      expect(neighborsOfN2).toHaveLength(0);
    };

    test("deletes edge between two nodes", () => {
      const n1 = new RoadNode({ x: 1, y: 0 });
      const n2 = new RoadNode({ x: 2, y: 0 });

      n1.addNeighbor(n2);

      n1.removeNeighbor(n2);

      isCorrectGraphOf2SeparateNodes(n1, n2);
    });

    test("deletes edge between two nodes", () => {
      const n1 = new RoadNode({ x: 1, y: 0 });
      const n2 = new RoadNode({ x: 2, y: 0 });

      n1.addNeighbor(n2);
      n1.addNeighbor(n2);
      n2.addNeighbor(n1);

      n1.removeNeighbor(n2);

      isCorrectGraphOf2SeparateNodes(n1, n2);
    });
  });
});
