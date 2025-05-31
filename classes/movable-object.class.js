/**
 * Represents a movable object in the game, such as characters or enemies.
 * Inherits from {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {
  /** @type {number} Movement speed (horizontal). */
  speed = 0.05;

  /** @type {boolean} Indicates if the object is facing the opposite direction (flipped). */
  otherDirection = false;

  /** @type {number} Current life/health of the object. */
  life = 100;

  /** @type {number} Timestamp of the last hit (in ms since epoch). */
  lastHit = 0;

  /** @type {number} Speed used for projectiles or bursts. */
  speedx = 20;

  /**
   * Plays the next frame of an animation sequence.
   * @param {string[]} images - Array of image paths representing the animation frames.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Starts moving the object to the right continuously.
   */
  moveRight() {
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }

  /**
   * Starts moving the object to the left continuously (only if the game is running).
   */
  moveLeft() {
    setInterval(() => {
      if (!gameIsRunning) return;
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Moves the object in a sinusoidal pattern (used for jellyfish).
   */
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

  /**
   * Checks for collision with another object.
   * @param {MovableObject} mo - The other object to check collision against.
   * @returns {boolean} True if this object is colliding with the given object.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Applies damage to the object and triggers hurt state.
   * @param {"normal" | "jelly"} [type="normal"] - Type of hit (used to distinguish special damage like electric shock).
   */
  hit(type = "normal") {
    if (this.isDead()) return;
    this.life -= 20;
    this.damageSound.currentTime = 0;
    this.damageSound.play();

    if (this.life <= 0) {
      this.life = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.lastHitType = type;
    }
  }

  /**
   * Checks if the object was hit by a jellyfish and is currently hurt.
   * @returns {boolean} True if object was shocked by a jellyfish recently.
   */
  wasShocked() {
    return this.lastHitType === "jelly" && this.isHurt();
  }

  /**
   * Checks whether the object is dead.
   * @returns {boolean} True if life is 0 or below.
   */
  isDead() {
    return this.life <= 0;
  }

  /**
   * Checks whether the object was hit recently and is still in a hurt state.
   * @returns {boolean} True if the hit occurred within the last 0.75 seconds.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed / 1000 < 0.75;
  }
}
