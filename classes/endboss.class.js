class Endboss extends MovableObject {
  height = 550;
  width = 400;
  y = -50;
  x = 3000;
  speed = 1.5;
  health = 3;
  hurt = false;
  dead = false;
  world;
  hadFirstContact = false;
  spawningDone = false;

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
  offset = {
    top: 250,
    bottom: 100,
    left: 20,
    right: 20,
  };

  constructor(world) {
    super().loadImage(this.IMAGES_SPAWNING[0]);
    this.world = world;
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.winSound = new Audio("audio/game-win.mp3");
    this.winSound.volume = 0.1;
    this.enemyDeadSound = new Audio("audio/enemy-dead.mp3");
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    this.animationInterval = intervals.push(
      setInterval(() => {
        if (!gameIsRunning) return;

        if (this.world.character.x >= 2350 && !this.hadFirstContact) {
          this.hadFirstContact = true;
          this.startSpawning();
        }

        if (this.spawningDone && !this.dead) {
          this.playAnimation(
            this.isHurt() ? this.IMAGES_HURT : this.IMAGES_WALKING
          );
        }

        if (this.dead) {
          this.playAnimation(this.IMAGES_DEAD);
          showGameWon();
          this.winSound.currentTime = 0;
          this.winSound.play();
          this.dead = false;
        }
      }, 150)
    );
  }

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

  setHurt() {
    this.hurt = true;
    setTimeout(() => (this.hurt = false), 500);
  }

  isHurt() {
    return this.hurt;
  }

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
