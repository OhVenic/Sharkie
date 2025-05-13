class MovableObject extends DrawableObject {
  speed = 0.05; // Speed of the object
  otherDirection = false;
  life = 100;
  lastHit = 0;

  playAnimation(images) {
    let i = this.currentImage % images.length; // Ensure the index is within bounds
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    setInterval(() => {
      this.x += this.speed; // Move the object to the left
    }, 1000 / 15); // Move the object to the left at 5 pixels per frame
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; // Move the object to the left
    }, 1000 / 15); // Move the object to the left at 5 pixels per frame
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // rechte Kante von this > linke Kante von mo
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // untere Kante von this > obere Kante von mo
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // linke Kante von this < rechte Kante von mo
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    ); // obere Kante von this < untere Kante von mo
  }

  hit() {
    this.life -= 20; // Decrease the life of the object by 20
    if (this.life <= 0) {
      this.life = 0; // Ensure life doesn't go below 0
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.life <= 0; // Check if the object is dead
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Convert to seconds
    return timepassed < 0.75; // Check if the object is hurt
  }
}
