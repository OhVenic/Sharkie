class Character extends MovableObject {
  height = 200; // Set the height of the character
  width = 220; // Set the width of the character
  speed = 8;
  world;
  isAttacking = false;
  lastActionTime = Date.now();
  isIdleAnimationPlaying = false;
  coins = 0;
  poisonFlasks = 0;

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
    "img/1.Sharkie/2.Long_IDLE/i2.png",
    "img/1.Sharkie/2.Long_IDLE/i3.png",
    "img/1.Sharkie/2.Long_IDLE/i4.png",
    "img/1.Sharkie/2.Long_IDLE/i5.png",
    "img/1.Sharkie/2.Long_IDLE/i6.png",
    "img/1.Sharkie/2.Long_IDLE/i7.png",
    "img/1.Sharkie/2.Long_IDLE/i8.png",
    "img/1.Sharkie/2.Long_IDLE/i9.png",
    "img/1.Sharkie/2.Long_IDLE/i10.png",
    "img/1.Sharkie/2.Long_IDLE/i11.png",
    "img/1.Sharkie/2.Long_IDLE/i12.png",
    "img/1.Sharkie/2.Long_IDLE/i13.png",
    "img/1.Sharkie/2.Long_IDLE/i14.png",
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

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
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
    this.swimSound.volume = 0.1;
    this.bubbleSound.volume = 0.4;
    this.finSound.volume = 0.4;

    this.animate();
  }

  playSwimSound() {
    if (this.swimSound.paused) {
      this.swimSound.currentTime = 0;
      this.swimSound.play();
    }
  }

  animate() {
    setInterval(() => {
      if (!gameIsRunning) return;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
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
    }, 1000 / 60);

    this.animateSharkie();
  }

  animateSharkie() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        showGameOver();
      } else if (this.wasShocked()) {
        this.playAnimation(this.IMAGES_SHOCKED);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAttacking) {
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
    }, 100);
  }

  longIdle() {
    let now = Date.now();
    return now - this.lastActionTime > 5000;
  }

  registerAction() {
    this.lastActionTime = Date.now(); // Update the last action time
  }

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

  startFinAttack() {
    if (!gameIsRunning) return;
    if (this.isAttacking) return;
    this.lastActionTime = Date.now();
    this.isAttacking = true;
    this.currentImage = 0;
    let finHitbox;
    this.finSound.currentTime = 0;
    this.finSound.play();

    let interval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK_FIN);

      if (this.currentImage >= this.IMAGES_ATTACK_FIN.length) {
        clearInterval(interval);
        if (this.otherDirection) {
          finHitbox = new ThrowableObject(
            this.x - 10,
            this.y + 110,
            0,
            this.world,
            "fin"
          );
          this.world.throwableObjects.push(finHitbox);
          this.isAttacking = false;
        } else {
          finHitbox = new ThrowableObject(
            this.x + 200,
            this.y + 110,
            0,
            this.world,
            "fin"
          );
          this.world.throwableObjects.push(finHitbox);
          this.isAttacking = false;
        }
      }
    }, 100);
  }
}
