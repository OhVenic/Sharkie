/**
 * Represents the final boss enemy.
 * Handles spawning, animations, being hurt, dying, and triggering the game win state.
 */
class Endboss extends MovableObject {
  height = 550;
  width = 400;
  x = 3000;
  y = -50;
  speed = 1.5;
  health = 3;
  hurt = false;
  dead = false;
  hadFirstContact = false;
  spawningDone = false;

  /** @type {World} Reference to the game world */
  world;

  /** Image arrays for different animations */
  IMAGES_SPAWNING = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  IMAGES_WALKING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
    "img/2.Enemy/3 Final Enemy/Attack/5.png",
    "img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  /** Collision offset for better hit detection */
  offset = {
    top: 250,
    bottom: 100,
    left: 20,
    right: 20,
  };

  /**
   * Initializes the endboss and its animations.
   * @param {World} world - Reference to the current game world.
   */
  constructor(world) {
    super();
    this.world = world;
    this.loadImage(this.IMAGES_SPAWNING[0]); // ✅ Corrected
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.winSound = new Audio("audio/game-win.mp3");
    this.winSound.volume = 0.1;
    this.enemyDeadSound = new Audio("audio/enemy-dead.mp3");
    this.startAnimationLoop();
  }

  /**
   * Starts the main loop to animate the boss.
   */
  startAnimationLoop() {
    this.animationInterval = intervals.push(setInterval(() => {
      if (!gameIsRunning) return;

      if (this.world.character.x >= 2350 && !this.hadFirstContact) {
        this.hadFirstContact = true;
        this.startSpawning();
      }

      if (this.spawningDone && !this.dead) {
        const images = this.isHurt() ? this.IMAGES_HURT : this.IMAGES_WALKING;
        this.playAnimation(images);
      }

      if (this.dead) {
        this.playAnimation(this.IMAGES_DEAD);
        showGameWon();
        this.winSound.currentTime = 0;
        this.winSound.play();
        this.dead = false; // Prevent further animation
      }
    }, 150));
  }

  /**
   * Starts the intro animation and begins movement.
   */
  startSpawning() {
    let i = 0;
    const interval = setInterval(() => {
      this.playAnimation(this.IMAGES_SPAWNING);
      i++;
      if (i >= this.IMAGES_SPAWNING.length) {
        clearInterval(interval);
        this.spawningDone = true;
        this.moveLeft();
      }
    }, 150);
  }

  /**
   * Reduces health on hit and handles death.
   */
  takeHit() {
    if (this.dead || !this.spawningDone) return;
    this.health--;
    this.setHurt();
    this.world.enemyDeadSound.currentTime = 0;
    this.world.enemyDeadSound.play();

    if (this.health <= 0) {
      this.die();
    }
  }

  /**
   * Triggers hurt animation state for a short time.
   */
  setHurt() {
    this.hurt = true;
    setTimeout(() => (this.hurt = false), 500);
  }

  /**
   * Returns whether the boss is in hurt state.
   * @returns {boolean}
   */
  isHurt() {
    return this.hurt;
  }

  /**
   * Handles the death of the boss and cleanup.
   */
  die() {
    this.dead = true;
    this.speed = 0;
    this.world.enemyDeadSound.currentTime = 0;
    this.world.enemyDeadSound.play();

    setTimeout(() => {
      this.world.level.enemies = this.world.level.enemies.filter(
        (e) => e !== this
      );
    }, 3000);
  }
}
