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
  const isCharacter = mo instanceof Character;
  const moveUp = this.keyboard.UP;
  const moveDown = this.keyboard.DOWN;
  const shouldRotate = isCharacter && (moveUp || moveDown);
  mo.drawFrame(this.ctx);

  if (shouldRotate) {
  this.rotateCharacter(mo);
  } else {
    if (mo.otherDirection) {
     this.flipImage(mo);
    } else {
     mo.draw(this.ctx);
    }}
  this.ctx.restore();
}

flipImage(mo) {
   this.ctx.translate(mo.x + mo.width, 0);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
}

rotateCharacter(mo) {
    let angle = this.keyboard.UP ? -15 : 15;
    if (mo.otherDirection) angle = -angle;
    const rad = angle * Math.PI / 180;
 
    const centerX = mo.x + mo.width / 2;
    const centerY = mo.y + mo.height / 2;

    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(rad);

    if (mo.otherDirection) this.ctx.scale(-1, 1);

    this.ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
}
}
