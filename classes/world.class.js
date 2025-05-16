class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkThrowObjects();
    this.checkCollisions();
    this.checkEnemyHits();
  }

  setWorld() {
    this.character.world = this;
    this.addEnemies();
  }

  addEnemies() {
    this.level.enemies.push(
      new PufferFishGreen(this),
      new PufferFishGreen(this),
      new PufferFishGreen(this),
      new PufferFishGreen(this),
      new PufferFishLightRose(this),
      new PufferFishLightRose(this),
      new PufferFishLightRose(this),
      new PufferFishLightRose(this),
      new PufferFishPurple(this),
      new PufferFishPurple(this),
      new PufferFishPurple(this),
      new PufferFishPurple(this),
      new PufferFishPurple(this),
      new Endboss()
    );
  }

  checkThrowObjects() {
    setInterval(() => {
      if (this.keyboard.D && !this.character.isAttacking) {
        this.character.startBubbleAttack();
      }
      if (this.keyboard.SPACE && !this.character.isAttacking) {
        this.character.startFinAttack();
      }
    }, 1000 / 60);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      setInterval(() => {
        if (!enemy.dead && this.character.isColliding(enemy)) {
          this.character.hit();
        }
        this.statusBar.setPercentage(this.character.life);
      }, 1000);
    });
  }

  checkEnemyHits() {
    setInterval(() => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        this.throwableObjects.forEach((bubble, bubbleIndex) => {
          if (bubble.isColliding(enemy) && !enemy.dead) {
            enemy.die(() => {
              this.level.enemies.splice(enemyIndex, 1);
            });
            this.throwableObjects.splice(bubbleIndex, 1);
          }
        });
      });
    }, 1000 / 30);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.collectibles);
    this.ctx.translate(-this.camera_x, 0);
    // SPACE FOR FIXED OBJECTS
    this.addToMap(this.statusBar);
    // SPACE END FOR FIXED OBJECTS
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.throwableObjects = this.throwableObjects.filter(obj => !obj.markedForDeletion);
    this.addObjectsToMap(this.throwableObjects);

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
      }
    }
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
    const rad = (angle * Math.PI) / 180;

    const centerX = mo.x + mo.width / 2;
    const centerY = mo.y + mo.height / 2;

    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(rad);

    if (mo.otherDirection) this.ctx.scale(-1, 1);

    this.ctx.drawImage(
      mo.img,
      -mo.width / 2,
      -mo.height / 2,
      mo.width,
      mo.height
    );
  }
}
