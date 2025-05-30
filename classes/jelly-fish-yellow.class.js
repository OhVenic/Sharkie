class JellyFishYellow extends JellyFish {

    width = 80;
    height = 80;

    constructor(world) {
  super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.world = world;
       this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_POISONOUS);
    this.loadImages(this.IMAGES_DEAD);
    this.animateJellyFish();
  }

  IMAGES_WALKING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  IMAGES_POISONOUS = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];
}
