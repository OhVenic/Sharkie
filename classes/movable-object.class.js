class MovableObject extends DrawableObject {
  speed = 0.05; // Speed of the object
  otherDirection = false;
  life = 100;
  lastHit = 0;
  speedx = 20;

  playAnimation(images) {
    let i = this.currentImage % images.length; // Ensure the index is within bounds
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    setInterval(() => {
      this.x += this.speed; // Move the object to the left
    }, 1000 / 60); // Move the object to the left at 5 pixels per frame
  }

  moveLeft() {
    setInterval(() => {
      if (!gameIsRunning) return;
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveJellyFish() {
    let baseY = this.y;
    let t = 0;

    setInterval(() => {
           if (!gameIsRunning) return;
      this.x -= this.speed;
      this.y = baseY + Math.sin(t) * 10 + 20;
      t += 0.03; 
    }, 1000 / 60);
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit(type = "normal") {
    if (this.isDead()) return; // Prevent further hits if already dead
    this.life -= 20;
    this.damageSound.currentTime = 0; // Reset sound to start
    this.damageSound.play();
    if (this.life <= 0) {
      this.life = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.lastHitType = type; 
    }
  }

  wasShocked() {
    return this.lastHitType === "jelly" && this.isHurt();
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
