import kontra from '../lib/kontra.js';
import Scene from './scene.js';
import Borders from './borders.js';
import {Sizes} from './constants.js';

const assetsToLoad = [
    './assets/sprite.png',
    './assets/characters.png',
    './assets/sprite-mapper.tsj',
    './assets/tilemap-home-new.tmj',
    './assets/tilemap-camp-new.tmj',
]
const INITIAL_SCENE = 'home';

class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.currentScene = null;
    }
    
    init = async () => {
        let { canvas, context } = kontra.init();
        this.canvas = canvas;
        this.context = context;

        kontra.initKeys();

        await kontra.load(...assetsToLoad);

        this.currentScene = new Scene({scene: INITIAL_SCENE}, this.canvas);
        
        canvas.height = Sizes.canvasHeight;
        canvas.width = Sizes.canvasWidth;
        
        // borders = new Borders(canvas);

        this.addEventListeners();
        this.gameLoop();
    }

    addEventListeners = () => {
        // prevent default key behavior
        kontra.onKey(['arrowup', 'arrowdown', 'arrowleft', 'arrowright'], function(e) {
            e.preventDefault();
        });

        kontra.on('newScene', (payload) => {
            console.log('My event was triggered', payload);
            this.currentScene = new Scene(payload, this.canvas);
        });          
    }

    gameLoop = () => {
        kontra.GameLoop({
            update: () => {
              // borders.update();
              this.currentScene.update();
          
              // const collision = borders.checkCollision(sprite);
              // if(collision.isCollision) {
              //   console.log('Collision detected with border: ', collision.collisionType);
              //   return;
              // }
          
              // if(currentScene.layerCollidesWith('blocker', sprite)) {
                  // console.log('Collision detected with tile');
                  // return;
              // }      
            },
            render: () => {
              this.currentScene.render();
              // borders.render();
            }
          }).start();        
    }
}

export default Game;