class Pufferfish extends MovableObject {
  height = 100; // Set the height of the Pufferfish
  width = 100; // Set the width of the Pufferfish
  y = 350; // Set the y position of the Pufferfish
  transitionRunning = false; // Flag to check if transition is running
  dead = false;

  IMAGES_WALKING = [
  ];

  IMAGES_TRANSITION = [
  ];

  IMAGES_BUBBLESWIM = [
  ];

  IMAGES_DEAD = [
  ];

  offset = {
    top: 10,
    bottom: 30,
    left: 10,
    right: 20,
  };

  constructor(world) {
    super()
    this.world = world; // Set the world property to the passed world object
    this.x = 350 + Math.random() * 2500; // Random x position
    this.speed = 0.25 + Math.random() * 0.15; // Random speed between 0.05 and 0.15
    this.y = 400 - Math.random() * 400; // Random y position
  }

  die(callback) {
    if (this.dead) return;
    this.dead = true;
  let i = 0;
  let deathInterval = setInterval(() => {
    this.width -= 5;
    this.height -= 5;
    this.y -= 5;
    this.x += 15
    this.img = this.imageCache[this.IMAGES_DEAD[i]];
    i++;
    if (i >= this.IMAGES_DEAD.length) {
      clearInterval(deathInterval);
      if (callback) callback(); // Entfernen nach Animation
    }
  }, 1000/20); // 100ms pro Frame
}

  animate() {
    let currentImages = this.IMAGES_WALKING;
    let currentImageIndex = 0;
    let transitionRunning = false;
    this.moveLeft();

    setInterval(() => {
      if (this.dead) return
      if (this.isColliding(this.world.character) && !transitionRunning) {
        transitionRunning = true;
        currentImages = this.IMAGES_TRANSITION;
        currentImageIndex = 0;
      }

      // Aktuelles Bild anzeigen
      this.img = this.imageCache[currentImages[currentImageIndex]];
      currentImageIndex++;

      // Wenn Animation vorbei ist
      if (currentImageIndex >= currentImages.length) {
        if (transitionRunning) {
          // Nach Transition: in Bubbleswim wechseln
          currentImages = this.IMAGES_BUBBLESWIM;
          currentImageIndex = 0;
        } else {
          // Wenn normale Animation wieder von vorn
          currentImageIndex = 0;
        }
      }
    }, 1000 / 8);
  }
}
