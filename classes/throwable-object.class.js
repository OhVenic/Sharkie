/**
 * Represents a throwable object (e.g. bubble or fin attack) used by the player.
 * Inherits from {@link MovableObject}.
 */
class ThrowableObject extends MovableObject {
  /**
   * Marks the object for removal from the game loop.
   * @type {boolean}
   */
  markedForDeletion = false;

  /**
   * Horizontal movement speed.
   * @type {number}
   */
  speedx = 0;

  /**
   * Type of throwable object (e.g., "bubble", "fin").
   * @type {"bubble" | "fin"}
   */
  type = "bubble";

  /**
   * Collision offset values.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Reference to the game world.
   * @type {World}
   */
  world;

  /**
   * Creates a new ThrowableObject.
   * @param {number} x - Initial X position.
   * @param {number} y - Initial Y position.
   * @param {number} speedx - Horizontal speed.
   * @param {World} world - Reference to the game world.
   * @param {"bubble" | "fin"} [type="bubble"] - Type of object.
   */
  constructor(x, y, speedx, world, type = "bubble") {
    super();
    this.x = x;
    this.y = y;
    this.speedx = speedx;
    this.height = 30;
    this.width = 30;
    this.world = world;
    this.type = type;

    this.loadTypeImage();
    this.throw();
    this.checkDespawn();
  }

  /**
   * Loads the correct image based on object type.
   */
  loadTypeImage() {
    if (this.type === "bubble") {
      this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    } else if (this.type === "fin") {
      this.img = new Image(); // Placeholder, replace if needed
    }
  }

  /**
   * Automatically despawns the object after a duration (only for "fin").
   */
  checkDespawn() {
    if (this.type === "fin") {
      setTimeout(() => this.markedForDeletion = true, 200);
    }
  }

  /**
   * Starts the object's movement animation.
   */
  throw() {
    setInterval(() => {
      this.x += this.speedx;
    }, 1000 / 60);
  }
}
