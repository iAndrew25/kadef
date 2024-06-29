import kontra from '../lib/kontra.js';

class Borders {
    constructor(canvas) {
      this.canvas = canvas;
      this.topBorder = null;
      this.rightBorder = null;
      this.bottomBorder = null;
      this.leftBorder = null;

      this.borderWidth = 5;
      this.init();
    }

    init = () => {
      this.leftBorder = kontra.Sprite({
        x: 0,
        y: 0,
        width: this.borderWidth,
        height: this.canvas.height,
        color: 'blue'
      });

      this.topBorder = kontra.Sprite({
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: this.borderWidth,
        color: 'blue'
      });

      this.rightBorder = kontra.Sprite({
        x: this.canvas.width - this.borderWidth,
        y: 0,
        width: this.borderWidth,
        height: this.canvas.height,
        color: 'blue'
      });

      this.bottomBorder = kontra.Sprite({
        x: 0,
        y: this.canvas.height - this.borderWidth,
        width: this.canvas.width,
        height: this.borderWidth,
        color: 'blue'
      });
    }

    checkCollision = hero => {
      if(kontra.collides(hero, this.topBorder)) {
        hero.color = 'blue';
        return {
          isCollision: true,
          collisionType: 'TOP_BORDER'
        }
      } else if(kontra.collides(hero, this.rightBorder)) {
        hero.color = 'blue';
        return {
          isCollision: true,
          collisionType: 'RIGHT_BORDER'
        }
      } else if(kontra.collides(hero, this.bottomBorder)) {
        hero.color = 'blue';
        return {
          isCollision: true,
          collisionType: 'BOTTOM_BORDER'
        }
      } else if(kontra.collides(hero, this.leftBorder)) {
        hero.color = 'blue';
        return {
          isCollision: true,
          collisionType: 'LEFT_BORDER'
        }
      } else {
        hero.color = 'red';
        return {
          isCollision: false
        }
      }
    }

    render = () => {
      this.leftBorder.render();
      this.topBorder.render();
      this.rightBorder.render();
      this.bottomBorder.render();
    }

    update = () => {
      this.leftBorder.update();
      this.topBorder.update();
      this.rightBorder.update();
      this.bottomBorder.update();
    }
  }

  export default Borders;