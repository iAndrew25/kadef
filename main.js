import kontra from './lib/kontra.js';
import Borders from './src/borders.js';
// import Scene from './src/scene.js';
// initialize the game and setup the canvas
let { canvas, context } = kontra.init();

// const SCALE_FACTOR = 3;

kontra.initKeys();

const assetsToLoad = [
    './assets/sprite.png',
    './assets/sprite-mapper.tsj',
    './assets/tilemap-home.tmj',
]

let borders;

const gameInit = async () => {
    await kontra.load(...assetsToLoad);
    
    const map = kontra.dataAssets['./assets/tilemap-home'];

    window.tileEngine = kontra.TileEngine(map);

    canvas.height = map.tileheight * map.height;
    canvas.width = map.tilewidth * map.width;
    
    borders = new Borders(canvas);

    loop.start();
}

// create a basic sprite with a velocity
window.sprite = kontra.Sprite({
  x: 50,
  y: 50,
  dx: 1,
  dy: 1,
  width: 8,
  height: 16,
  color: 'red',
  // pass a custom update function to the sprite
  update: function() {
    var collisionBox = {
        y: this.y,
        x: this.x,
        width: this.width,
        height: this.height
      };

    // move the sprite with the keyboard
    if (kontra.keyPressed('arrowup')) {
        collisionBox.y -= this.dy;

        if(tileEngine.layerCollidesWith('blocker', collisionBox)) {
            return;
        }  

        this.y -= this.dy;
    }
    else if (kontra.keyPressed('arrowdown')) {
        collisionBox.y += this.dy;

        if(tileEngine.layerCollidesWith('blocker', collisionBox)) {
            return;
        }          
      this.y += this.dy;
    }

    if (kontra.keyPressed('arrowleft')) {
        collisionBox.x -= this.dx;

        if(tileEngine.layerCollidesWith('blocker', collisionBox)) {
            return;
        }              
      this.x -= this.dx;
    }
    else if (kontra.keyPressed('arrowright')) {
        collisionBox.x += this.dx;

        if(tileEngine.layerCollidesWith('blocker', collisionBox)) {
            return;
        }              
      this.x += this.dx;
    }

    if(tileEngine.layerCollidesWith('blocker', collisionBox)) {
        return;
    }    
  }
});


// prevent default key behavior
kontra.onKey(['arrowup', 'arrowdown', 'arrowleft', 'arrowright'], function(e) {
  e.preventDefault();
});

// clamp sprites movement to the game between x1, y1, and x2, y2
sprite.position.clamp(0, 0, canvas.width - sprite.width, canvas.height - sprite.height);

// create the game loop to update and render the sprite
window.loop = kontra.GameLoop({
  update: function() {
    sprite.update();
    borders.update();

    const collision = borders.checkCollision(sprite);
    if(collision.isCollision) {
      console.log('Collision detected with border: ', collision.collisionType);
    }

    if(tileEngine.layerCollidesWith('blocker', sprite)) {
        console.log('Collision detected with tile');
        return;
    }

    // else {
    //   sprite.color = 'red';
    //   leftBorder.color = 'blue';
    // }        
  },
  render: function() {
      tileEngine.render();
      sprite.render();
        borders.render();
  }
});

// start the loop


gameInit();