class PoisonFlask extends Collectible {
height = 60
width = 45

  IMAGES_COLLECTIBLE = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.y = y;
    this.x = x;
    this.loadImages(this.IMAGES_COLLECTIBLE);
    this.animate();
  }
}
