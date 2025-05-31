/**
 * Represents the main character (Sharkie) in the game.
 * Controls movement, animations, attack behavior, and sound handling.
 */
class Character extends MovableObject {
  height = 200; // Set the height of the character
  width = 220; // Set the width of the character
  speed = 8;
  world;
  life = 100;
  isAttacking = false;
  lastActionTime = Date.now();
  isIdleAnimationPlaying = false;
  coins = 0;
  poisonFlasks = 0;

  // Animation image arrays for different states
  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/I2.png",
    "img/1.Sharkie/2.Long_IDLE/I3.png",
    "img/1.Sharkie/2.Long_IDLE/I4.png",
    "img/1.Sharkie/2.Long_IDLE/I5.png",
    "img/1.Sharkie/2.Long_IDLE/I6.png",
    "img/1.Sharkie/2.Long_IDLE/I7.png",
    "img/1.Sharkie/2.Long_IDLE/I8.png",
    "img/1.Sharkie/2.Long_IDLE/I9.png",
    "img/1.Sharkie/2.Long_IDLE/I10.png",
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  IMAGES_WALKING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];

  IMAGES_SHOCKED = [
    "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];

  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_ATTACK_BUBBLE = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  IMAGES_ATTACK_FIN = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

  offset = {
    top: 90,
    bottom: 40,
    left: 35,
    right: 35,
  };

   /**
   * Initializes the character by loading images and audio,
   * setting volume levels and starting the animation loop.
   */
  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.gameOverTriggered = false;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SHOCKED);
    this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_FIN);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.swimSound = new Audio("audio/Sharkie moving.mp3");
    this.bubbleSound = new Audio("audio/bubble.mp3");
    this.finSound = new Audio("audio/finAttack.mp3");
    this.damageSound = new Audio("audio/damage.mp3");
    this.loseSound = new Audio("audio/game-lose.mp3");
    this.loseSound.volume = 0.5;
    this.swimSound.volume = 0.1;
    this.bubbleSound.volume = 0.4;
    this.finSound.volume = 0.4;

    this.animate();
  }

  /**
   * Plays the swimming sound effect if it's not already playing.
   */
  playSwimSound() {
    if (this.swimSound.paused) {
      this.swimSound.currentTime = 0;
      this.swimSound.play();
    }
  }

  /**
   * Animates character movement and updates position and camera.
   * Also plays swim sound and stops it when idle.
   */
  animate() {
    intervals.push(
      setInterval(() => {
        if (!gameIsRunning) return;
        if (
          this.world.keyboard.RIGHT &&
          this.x < this.world.level.level_end_x
        ) {
          this.x += this.speed;
          this.otherDirection = false;
          this.registerAction();
          this.playSwimSound();
        }

        if (this.world.keyboard.LEFT && this.x > -600) {
          this.x -= this.speed;
          this.otherDirection = true;
          this.registerAction();
          this.playSwimSound();
        }

        if (this.world.keyboard.UP && this.y > -70) {
          this.y -= this.speed;
          this.registerAction();
          this.playSwimSound();
        }

        if (
          this.world.keyboard.DOWN &&
          this.y < this.world.canvas.height - this.height
        ) {
          this.y += this.speed;
          this.registerAction();
          this.playSwimSound();
        }

        let moving =
          this.world.keyboard.RIGHT ||
          this.world.keyboard.LEFT ||
          this.world.keyboard.UP ||
          this.world.keyboard.DOWN;
        if (!moving && !this.swimSound.paused) {
          this.swimSound.pause();
          this.swimSound.currentTime = 0;
        }

        this.world.camera_x = -this.x + 80;
      }, 1000 / 60)
    );
    this.animateSharkie();
  }

  /**
   * Controls the character's animation depending on current status (dead, hurt, idle, etc.).
   */
  animateSharkie() {
    intervals.push(
      setInterval(() => {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);
          if (!this.gameOverTriggered) {
            this.gameOverTriggered = true;
            showGameOver();
            this.loseSound.currentTime = 0;
            this.loseSound.play();
          }
        } else if (this.wasShocked()) {
          this.playAnimation(this.IMAGES_SHOCKED);
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
          // Do nothing; attack animations handled separately
        } else if (
          this.world.keyboard.RIGHT ||
          this.world.keyboard.LEFT ||
          this.world.keyboard.UP ||
          this.world.keyboard.DOWN
        ) {
          this.playAnimation(this.IMAGES_WALKING);
        } else if (this.longIdle()) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
          this.playAnimation(this.IMAGES_IDLE);
        }
      }, 100)
    );
  }

  /**
   * Checks if the character has been idle for more than 5 seconds.
   * @returns {boolean} True if idle for over 5 seconds.
   */
  longIdle() {
    let now = Date.now();
    return now - this.lastActionTime > 5000;
  }

  /**
   * Updates the timestamp of the last performed action.
   */
  registerAction() {
    this.lastActionTime = Date.now(); // Update the last action time
  }

  /**
   * Initiates the bubble attack animation and launches a bubble if enough poison is collected.
   */
  startBubbleAttack() {
    if (!gameIsRunning) return;
    if (this.isAttacking) return;
    if (this.world.collectedPoison <= 0) return;
    this.world.collectedPoison -= 20;
    this.world.poisonBar.setPercentage(this.world.collectedPoison);
    this.lastActionTime = Date.now();
    this.isAttacking = true;
    this.currentImage = 0;
    this.bubbleSound.currentTime = 0;
    this.bubbleSound.play();

    let interval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK_BUBBLE);

      if (this.currentImage >= this.IMAGES_ATTACK_BUBBLE.length) {
        clearInterval(interval);

        const bubble = new ThrowableObject(
          this.x + 180,
          this.y + 110,
          10,
          this.world,
          "bubble"
        );
        this.world.throwableObjects.push(bubble);
        this.isAttacking = false;
      }
    }, 100);
  }

  /**
   * Initiates the fin slap attack animation and spawns a hitbox after the animation ends.
   */
startFinAttack() {
  if (!gameIsRunning || this.isAttacking) return;

  this.lastActionTime = Date.now();
  this.isAttacking = true;
  this.currentImage = 0;
  this.finSound.currentTime = 0;
  this.finSound.play();

  const finX = this.otherDirection ? this.x - 10 : this.x + 200;
  const finY = this.y + 110;

  const interval = setInterval(() => {
    this.playAnimation(this.IMAGES_ATTACK_FIN);

    if (this.currentImage >= this.IMAGES_ATTACK_FIN.length) {
      clearInterval(interval);
      const finHitbox = new ThrowableObject(finX, finY, 0, this.world, "fin");
      this.world.throwableObjects.push(finHitbox);
      this.isAttacking = false;
    }
  }, 100);
}
}