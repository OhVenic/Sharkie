class Pufferfish extends MovableObject {
  height = 100; // Set the height of the Pufferfish
  width = 100; // Set the width of the Pufferfish
  y = 350; // Set the y position of the Pufferfish
  transitionRunning = false; // Flag to check if transition is running

  IMAGES_WALKING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];

  IMAGES_BUBBLESWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  offset = {
    top: 10,
    bottom: 30,
    left: 10,
    right: 20,
  };

  constructor(world) {
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.world = world; // Set the world property to the passed world object
    this.x = 250 + Math.random() * 500; // Random x position
    this.speed = 0.25 + Math.random() * 0.15; // Random speed between 0.05 and 0.15
    this.y = 350 - Math.random() * 300; // Random y position
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGES_BUBBLESWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    let currentImages = this.IMAGES_WALKING;
    let currentImageIndex = 0;
    let transitionRunning = false;
    this.moveLeft();

    setInterval(() => {
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
