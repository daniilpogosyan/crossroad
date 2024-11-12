class Canvas {
  public canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 1000;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Cannot access canvas context");

    document.body.appendChild(this.canvas);
  }

  get ctx() {
    // return this.context;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Cannot access canvas context");

    return ctx;
  }
}

export const canvas = new Canvas();
