class JellyFish extends Pufferfish {

    width = 100;
    height = 100;

  offset = {
    top: 10,
    bottom: 30,
    left: 10,
    right: 20,
  };

  IMAGES_WALKING = [
  ];

  IMAGES_POISONOUS = [
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
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.world = world; // Set the world property to the passed world object
        this.x = 350 + Math.random() * 2500; // Random x position
    this.speed = 0.25 + Math.random() * 0.15; // Random speed between 0.05 and 0.15
    this.y = 400 - Math.random() * 400; // Random y position

    this.animateJellyFish();
  }

  animateJellyFish() {
    this.moveJellyFish();
    setInterval(() => {
         if (this.dead) return;
         if (this.isColliding(this.world.character)) {
            this.playAnimation(this.IMAGES_POISONOUS);
      } else {
            this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

   jellyFishDie(callback) {
    if (this.dead) return;
    this.dead = true;
  let i = 0;
  let deathInterval = setInterval(() => {
    this.speed = 0;
    this.y -= 2; // Jellyfish sinks down
    this.img = this.imageCache[this.IMAGES_DEAD[i]];
    i++;
    if (i >= this.IMAGES_DEAD.length) {
      clearInterval(deathInterval);
      if (callback) callback(); // Entfernen nach Animation
    }
  }, 1000/5); // 100ms pro Frame
}


}