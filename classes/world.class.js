class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  lifeBar = new StatusBar("life", 40, 0);
  poisonBar = new StatusBar("poison", 40, 45);
  coinBar = new StatusBar("coins", 40, 90);
  throwableObjects = [];
  collectedCoins = 0;
  collectedPoison = 0;
  lastHealthTime = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkThrowObjects();
    this.checkCollisions();
    this.checkEnemyHits();
    this.coinSound = new Audio("audio/Coins.mp3");
    this.coinSound.volume = 0.2;
    this.poisonSound = new Audio("audio/Flask.mp3");
    this.poisonSound.volume = 0.2;
    this.healSound = new Audio("audio/heal.mp3");
    this.healSound.volume = 0.2;
    this.enemyDeadSound = new Audio("audio/enemy-dead.mp3");
    setInterval(() => {
      this.checkCollectibles();
    }, 1000 / 60);
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
      new Endboss(),
      new JellyFishYellow(this),
      new JellyFishYellow(this),
      new JellyFishYellow(this),
      new JellyFishLila(this),
      new JellyFishLila(this),
      new JellyFishLila(this),
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
      if (this.keyboard.E && !this.character.isAttacking) {
        this.addHealth();
      }
    }, 1000 / 60);
  }

checkCollisions() {
  this.level.enemies.forEach((enemy) => {
    setInterval(() => {
      if (!enemy.dead && this.character.isColliding(enemy)) {
        const type = enemy instanceof JellyFish ? "jelly" : "normal";
        this.character.hit(type);
      }
      this.lifeBar.setPercentage(this.character.life);
    }, 1000);
  });
}

  checkCollectibles() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins += 20;
        this.coinSound.currentTime = 0; // Reset sound to start
        this.coinSound.play();
        if (this.collectedCoins > 100) this.collectedCoins = 100;
        this.coinBar.setPercentage(this.collectedCoins);
        return false; // entfernt dieses Objekt
      }
      return true;
    });

    this.level.poisonFlasks = this.level.poisonFlasks.filter((flask) => {
      if (this.character.isColliding(flask)) {
        this.collectedPoison += 20;
        this.poisonSound.currentTime = 0; // Reset sound to start
        this.poisonSound.play();
        if (this.collectedPoison > 100) this.collectedPoison = 100;
        this.poisonBar.setPercentage(this.collectedPoison);
        return false;
      }
      return true;
    });
  }

  addHealth() {
    const now = Date.now();
    if(now - this.lastHealthTime < 1000) return; // Prevent spamming
    if (this.lifeBar.percentage === 100) return;
    if (this.collectedCoins < 20) return;
    this.character.life += 20;
    this.collectedCoins -= 20;
    this.lifeBar.setPercentage(this.character.life);
    this.coinBar.setPercentage(this.collectedCoins);
    this.lastHealthTime = now;
    this.healSound.currentTime = 0; // Reset sound to start
    this.healSound.play();
  }

  checkEnemyHits() {
    setInterval(() => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        this.throwableObjects.forEach((bubble, bubbleIndex) => {
                   this.enemyDeadSound.currentTime = 0; // Reset sound to start
            this.enemyDeadSound.play();
           if (bubble.isColliding(enemy) && !enemy.dead) {
          if (enemy instanceof JellyFish) {
            enemy.jellyFishDie(() => {
              this.level.enemies.splice(enemyIndex, 1);
            });
          } else {
            enemy.die(() => {
              this.level.enemies.splice(enemyIndex, 1);
            });
          }
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
    this.addObjectsToMap(this.level.poisonFlasks);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
    // SPACE FOR FIXED OBJECTS
    this.addToMap(this.lifeBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.coinBar);
    // SPACE END FOR FIXED OBJECTS
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.throwableObjects = this.throwableObjects.filter(
      (obj) => !obj.markedForDeletion
    );
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
