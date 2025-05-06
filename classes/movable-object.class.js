class MovableObject {
    x = 50;
    y = 230;
    img;
    height = 150;
    width = 150;
    imageCache = []
    currentImage = 0; // Index of the current image in the array

    // loadImage("img/test.png");
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; 
        });
    }

    moveRight() {
        console.log("Moving right");
    }

    moveLeft() {
        console.log("Moving left");
    }
}