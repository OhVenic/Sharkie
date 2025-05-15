class PufferFishPurple extends Pufferfish {
  height = 65;
  width = 65;

  IMAGES_WALKING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

  IMAGES_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];

  IMAGES_BUBBLESWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
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
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_TRANSITION);
    this.loadImages(this.IMAGES_BUBBLESWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }
}
