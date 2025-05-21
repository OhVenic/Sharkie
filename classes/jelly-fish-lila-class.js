class JellyFishLila extends JellyFish {

    constructor(world) {
  super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.world = world; // Set the world property to the passed world object
     this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_POISONOUS);
    this.loadImages(this.IMAGES_DEAD);
    this.animateJellyFish();
  }

  IMAGES_WALKING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_POISONOUS = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];
}
