class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen, um die Animation zu starten
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.save();

    if (mo.otherDirection) {
      this.ctx.translate(mo.x + mo.width, 0); // Ursprung verschieben
      this.ctx.scale(-1, 1); // Horizontal spiegeln
      this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height); // Zeichne relativ zum neuen Ursprung
    } else {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    this.ctx.restore();
  }
}
