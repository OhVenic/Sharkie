class Character extends MovableObject {
 
      height = 250; // Set the height of the character
      width = 280; // Set the width of the character
      speed = 10
      world;
     IMAGES_WALKING = [
           "img/1.Sharkie/3.Swim/1.png",
           "img/1.Sharkie/3.Swim/2.png",
           "img/1.Sharkie/3.Swim/3.png",
           "img/1.Sharkie/3.Swim/4.png",
           "img/1.Sharkie/3.Swim/5.png",
           "img/1.Sharkie/3.Swim/6.png",
      ]

     constructor() {
           super().loadImage("img/1.Sharkie/1.IDLE/1.png"); 
           this.loadImages(this.IMAGES_WALKING);

           this.animate();
     }

     animate() {

      setInterval( () => { 
            if(this.world.keyboard.RIGHT) {
            this.x += this.speed; // Move the character to the right
            }

            if(this.world.keyboard.LEFT) {
                  this.x -= this.speed; // Move the character to the left
                  }
      }, 1000 / 25);

      setInterval( () => {

            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
 
            // Walk animation
            let i = this.currentImage % this.IMAGES_WALKING.length; // Ensure the index is within bounds
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            }
      }, 100);
     }

     jump() {

     }
}