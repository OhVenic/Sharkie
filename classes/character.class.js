class Character extends MovableObject {
  height = 250; // Set the height of the character
  width = 280; // Set the width of the character
  speed = 10;
  world;
  IMAGES_WALKING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed; // Move the character to the right
        this.otherDirection = false; // Set the direction to right
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed; // Move the character to the left
        this.otherDirection = true; // Set the direction to left
      }

      if (this.world.keyboard.UP && this.y > -70) {
        this.y -= this.speed; // Move the character up
      }
      if (
        this.world.keyboard.DOWN &&
        this.y < this.world.canvas.height - this.height
      ) {
        this.y += this.speed; // Move the character down
      }
      this.world.camera_x = -this.x;
    }, 1000 / 25);

    setInterval(() => {
      if (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.UP ||
        this.world.keyboard.DOWN
      ) {
        // Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  jump() {}
}
