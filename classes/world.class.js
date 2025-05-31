/**
 * Represents the main game world, including the character, enemies, items, and rendering logic.
 */
class World {
  character = new Character();
  level = createLevel1();
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

  /**
   * Creates the game world and initializes canvas, keyboard, and game objects.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkThrowObjects();
    this.checkCollisions();
    this.checkEnemyHits();
    this.character.life = 100;
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

  /**
   * Assigns the current world to the character and adds enemies.
   */
  setWorld() {
    this.character.world = this;
    this.addEnemies();
  }

  /**
   * Adds a set of enemies including the Endboss to the level.
   */
  addEnemies() {
    this.endboss = new Endboss(this);
    this.level.enemies = [
      new PufferFishGreen(this), new PufferFishGreen(this),
      new PufferFishGreen(this), new PufferFishGreen(this),
      new PufferFishLightRose(this), new PufferFishLightRose(this),
      new PufferFishLightRose(this), new PufferFishLightRose(this),
      new PufferFishPurple(this), new PufferFishPurple(this),
      new PufferFishPurple(this), new PufferFishPurple(this), new PufferFishPurple(this),
      this.endboss,
      new JellyFishYellow(this), new JellyFishYellow(this), new JellyFishYellow(this),
      new JellyFishLila(this), new JellyFishLila(this), new JellyFishLila(this)
    ];
  }

  /**
   * Checks if the player triggered any throwable object attacks or healing.
   */
  checkThrowObjects() {
    setInterval(() => {
      if (!gameIsRunning) return;
      if (this.keyboard.D && !this.character.isAttacking) this.character.startBubbleAttack();
      if (this.keyboard.SPACE && !this.character.isAttacking) this.character.startFinAttack();
      if (this.keyboard.E && !this.character.isAttacking) this.addHealth();
    }, 1000 / 60);
  }

  /**
   * Checks for collisions between the character and all enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      intervals.push(setInterval(() => {
        if (!gameIsRunning) return;
        if (!enemy.dead && this.character.isColliding(enemy)) {
          const type = enemy instanceof JellyFish ? "jelly" : "normal";
          this.character.hit(type);
        }
        this.lifeBar.setPercentage(this.character.life);
      }, 1000));
    });
  }

  /**
   * Checks for collection of coins and poison flasks by the character.
   */
checkCollectibles() {
  this.collectCoins();
  this.collectPoisonFlasks();
}

collectCoins() {
  this.level.coins = this.level.coins.filter((coin) => {
    if (this.character.isColliding(coin)) {
      this.collectedCoins += 20;
      if (this.collectedCoins > 100) this.collectedCoins = 100;
      this.coinSound.currentTime = 0;
      this.coinSound.play();
      this.coinBar.setPercentage(this.collectedCoins);
      return false;
    }
    return true;
  });
}

collectPoisonFlasks() {
  this.level.poisonFlasks = this.level.poisonFlasks.filter((flask) => {
    if (this.character.isColliding(flask)) {
      this.collectedPoison += 20;
      if (this.collectedPoison > 100) this.collectedPoison = 100;
      this.poisonSound.currentTime = 0;
      this.poisonSound.play();
      this.poisonBar.setPercentage(this.collectedPoison);
      return false;
    }
    return true;
  });
}

  /**
   * Adds health to the character if enough coins are available.
   */
  addHealth() {
    const now = Date.now();
    if (now - this.lastHealthTime < 1000 || this.lifeBar.percentage === 100 || this.collectedCoins < 20) return;
    this.character.life += 20;
    this.collectedCoins -= 20;
    this.lifeBar.setPercentage(this.character.life);
    this.coinBar.setPercentage(this.collectedCoins);
    this.lastHealthTime = now;
    this.healSound.currentTime = 0;
    this.healSound.play();
  }

  /**
   * Checks if any throwable object has hit an enemy.
   */
checkEnemyHits() {
  setInterval(() => {
    if (!gameIsRunning) return;

    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.throwableObjects.forEach((bubble, bubbleIndex) => {
        if (bubble.isColliding(enemy) && !enemy.dead) {
          this.handleEnemyHit(enemy, enemyIndex);
          this.throwableObjects.splice(bubbleIndex, 1);
        }
      });
    });
  }, 1000 / 30);
}

handleEnemyHit(enemy, enemyIndex) {
  if (enemy instanceof JellyFish) {
    this.playEnemyDeath(() => enemy.jellyFishDie(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }));
  } else if (enemy instanceof Endboss) {
    enemy.takeHit();
  } else {
    this.playEnemyDeath(() => enemy.die(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }));
  }
}

playEnemyDeath(callback) {
  this.enemyDeadSound.currentTime = 0;
  this.enemyDeadSound.play();
  callback();
}

  /**
   * Draws all objects on the canvas and updates camera.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.poisonFlasks);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.lifeBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.throwableObjects = this.throwableObjects.filter(obj => !obj.markedForDeletion);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds an array of drawable objects to the canvas.
   * @param {DrawableObject[]} objects - Array of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds a single drawable object to the canvas with optional rotation/flip.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    this.ctx.save();
    const isCharacter = mo instanceof Character;
    const moveUp = this.keyboard.UP;
    const moveDown = this.keyboard.DOWN;
    const shouldRotate = isCharacter && (moveUp || moveDown);

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

  /**
   * Flips a drawable object's image horizontally.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.translate(mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
  }

  /**
   * Rotates the character image when moving up or down.
   * @param {DrawableObject} mo - The character object to rotate.
   */
  rotateCharacter(mo) {
    let angle = this.keyboard.UP ? -15 : 15;
    if (mo.otherDirection) angle = -angle;
    const rad = (angle * Math.PI) / 180;

    const centerX = mo.x + mo.width / 2;
    const centerY = mo.y + mo.height / 2;

    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(rad);

    if (mo.otherDirection) this.ctx.scale(-1, 1);

    this.ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
  }
}
