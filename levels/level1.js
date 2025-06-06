/**
 * Creates Level 1 with predefined background layers, coins, and poison flasks.
 * @returns {Level} A new Level instance with background objects, collectibles, and items.
 */
function createLevel1() {
  return new Level(
    [], // No enemies for this level

    [
      // Background layers (repeating every 720px for parallax effect)
      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", -720),
      new BackgroundObject("img/3. Background/Layers/1. Light/2.png", -720),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 0),
      new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 0),

      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", 720),
      new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 720),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 1440),
      new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 1440),

      new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", 2160),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L2.png", 2160),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L2.png", 2160),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", 2160),
      new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 2160),

      new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", 2880),
      new BackgroundObject("img/3. Background/Layers/3.Fondo 1/L1.png", 2880),
      new BackgroundObject("img/3. Background/Layers/4.Fondo 2/L1.png", 2880),
      new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", 2880),
      new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 2880),
    ],

    [
      // Coin collectibles
      new Coin("img/4. Marcadores/1. Coins/1.png", 500, 350),
      new Coin("img/4. Marcadores/1. Coins/1.png", 575, 275),
      new Coin("img/4. Marcadores/1. Coins/1.png", 650, 350),
      new Coin("img/4. Marcadores/1. Coins/1.png", 750, 200),
      new Coin("img/4. Marcadores/1. Coins/1.png", 900, 150),
      new Coin("img/4. Marcadores/1. Coins/1.png", 1200, 350),
      new Coin("img/4. Marcadores/1. Coins/1.png", 1400, 250),
      new Coin("img/4. Marcadores/1. Coins/1.png", 1600, 100),
      new Coin("img/4. Marcadores/1. Coins/1.png", 2000, 100),
      new Coin("img/4. Marcadores/1. Coins/1.png", 2200, 100),
      new Coin("img/4. Marcadores/1. Coins/1.png", 2100, 212.5),
      new Coin("img/4. Marcadores/1. Coins/1.png", 2000, 325),
      new Coin("img/4. Marcadores/1. Coins/1.png", 2200, 325),
      new Coin("img/4. Marcadores/1. Coins/1.png", -495, 250),
      new Coin("img/4. Marcadores/1. Coins/1.png", -420, 150),
      new Coin("img/4. Marcadores/1. Coins/1.png", -345, 250),
    ],

    [
      // Poison flask items
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 495, 75),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 570, 150),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 645, 75),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 800, 250),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 1000, 50),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 1100, 400),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 1300, 150),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 1350, 250),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 2095, 75),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 1900, 187.5),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 1995, 187.5),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 2195, 187.5),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", 2095, 300),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", -425, 225),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", -500, 125),
      new PoisonFlask("img/4. Marcadores/Posión/Animada/1.png", -350, 125),
    ]
  );
}
